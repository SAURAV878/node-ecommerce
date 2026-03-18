import User from "../models/user.js";
import bcrypt from 'bcrypt';
import AppError from "../utils/appError.js";

export const singup = async (req, res, next) => {
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


