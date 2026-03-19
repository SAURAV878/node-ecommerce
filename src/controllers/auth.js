import User from "../models/user.js";
import bcrypt from 'bcrypt';
import AppError from "../utils/appError.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    try {
        const {firstName, lastName, email, password, role} = req.body;

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json({
            status: 'Sucess',
            user: {
                id: newUser.id,
                firstName: newUser.firstName,
                email: newUser.email,
                role: newUser.role
            }
        });

    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return next(new AppError('Email already exits', 400));
        }
        next (error);
    }

};

const signToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
};

export const login = async (req, res, next) => {
    const {email, password} =  req.body;

    if (!email || !password) {
        return next(new AppError ('Please provide email and password', 400));
    }

    const user = await User.findOne({ where : {email} });

    if(!user || !(await bcrypt.compare(password, user.password))) {
        return next(new AppError("Incorrect email or password", 401));
    }

    const token = signToken(user.id);

    res.status(200).json({
        status: 'sucess',
        token
    })


}


