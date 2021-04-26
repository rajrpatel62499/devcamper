const errorHandler = (err,req,res, next) => {
    // Log to console for dev 
    console.log(err.stack.red);
    res.status(err.statusCode || 500).json({
        statusCode: err.statusCode || 500,  
        message: err.message || 'Server error',
        error: err.message || 'Server error'
    });
    // next();
}

module.exports = errorHandler;