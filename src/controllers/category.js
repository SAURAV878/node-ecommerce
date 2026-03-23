import { Category, Product } from "../models/index.js";
import AppError from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";

export const getCategory = catchAsync (async (req, res, next) => {
    const category = await Category.findByPk(req.params.id, {
        include: [{
            model: Product,
            as: 'products'
        }]
    });

    if(!category) {
        return next (new AppError('Category not found',404))
    }

    res.status(200).json({
        status: 'sucess',
        data: {
            category
        }
    })
})

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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page -1) * limit;

    const {count, rows} = await Category.findAndCountAll({
        limit,
        offset
    });

    res.status(200).json({
        status: 'sucess',
        results: rows.length,
        totalItems: count,
        data: {
            categories: rows
        }

    });
});

export const updateCategory = catchAsync(async (req, res, next) => {
    const category = await Category.findByPk(req.params.id)

    if(!category) {
        return next(new AppError(`Category not found with this id ${req.params.id}`, 404 ))
    }

    await category.update(req.body);

    res.status(200).json({
        status: 'sucess',
        data: {
            category
        }
    });
});

export const deleteCategory = catchAsync(async (req, res, next) => {
    const category = await Category.findByPk(req.params.id);

    if(!category) {
        return next(new AppError('Categry not found', 404));
    }

    const productCount = await Product.count({
        where: {
            categoryId: category.id
        }
    });
    if(productCount > 0) {
        return next(new AppError('Cannot delete: This category still has prdoucts.',400 ));
    }

    await category.destroy();

    res.status(200).json({
        status: 'sucess',
        message: `Id ${req.params.id} is deleted sucessfully`
    });
});