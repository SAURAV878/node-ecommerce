import { Category } from "../models/index.js";
import { catchAsync } from "../utils/catchAsync.js";



export const createCategory = catchAsync(async (req , res , next) => {
    const  {name, slug, description} = req.body;


    const newCategory = await Category.create( {
        name,
        slug,
        description
    });

    res.status(200).json({
        status: 'sucess',
        data: {
            category: newCategory
        }
    });
});

export const getAllCategories = catchAsync(async (req, res, next) => {
    const categories = await Category.findAll();

    res.status(200).json({
        status: 'sucess',
        results: categories.length,
        data: {
            categories
        }

    });
});