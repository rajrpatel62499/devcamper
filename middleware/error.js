const ErrorResponse = require('../utils/errorResponse');
const errorHandler = (err,req,res, next) => {
    let error = { ...err };
    error.message = err.message;
    // Log to console for dev 
    // console.log(err);

    // Mongoose bad ObjectId
    if (err.name === 'CastError'){
        const message = `Resource not found with id of ${err.value}`;
        error = new ErrorResponse(message, 400);
    }
    
    // Mongoose duplicate key
    if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        error = new ErrorResponse(message, 400);
    }
    
    // Mongoose Validator errors
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        console.log("bingo ",message);
        error = new ErrorResponse(message, 400);
    }



    res.status(error.statusCode || 500).json({
        statusCode: error.statusCode || 500,  
        // message: error.message || 'Server error',
        error: error.message || 'Server error'
    });
    // next();
}

module.exports = errorHandler;