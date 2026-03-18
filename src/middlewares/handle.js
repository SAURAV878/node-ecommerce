import logger from "../utils/logger.js";

const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    logger.error ({
        message: err.message,
        statusCode: err.statusCode,
        stack: err.stack,
        method: req.method,
        url: req.originalUrl
    })

    if(process.env.NODE_ENV === 'development') {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            stack: err.stack
        });
    } else {
        if(err.isOperational) {
            return res.status(err.statusCode).json({
                status: err.status,
                message: err.message
            });
        } else {
            return res.status(500).json ({
                status: 'error',
                message: 'Something went wrong'
            })
        }
    }
};

export default errorHandler;