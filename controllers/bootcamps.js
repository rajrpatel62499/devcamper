const ErrorResponse = require('../utils/errorResponse');
const Bootcamp = require('../models/Bootcamp');
const asyncHandler = require('../middleware/async');

let response = {
    statusCode: 404,
    message: 'Not Found',
    data: null
}


// @desc        Get all bootcamps
// @route       GET /api/v1/bootcamps 
// @access      Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
    const bootcamps = await Bootcamp.find();
    response = {
        statusCode: 200,
        message: 'Success',
        data: bootcamps
    }
    res.status(response.statusCode).json(response);
});

// @desc        Get single bootcamps
// @route       GET /api/v1/bootcamps/:id 
// @access      Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);
    response = {
        statusCode: 200,
        message: 'Success',
        data: bootcamp
    }
    if (!bootcamp) {
        return next(new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404));
    }
    res.status(response.statusCode).json(response);

});

// @desc        Create new bootcamp
// @route       POST /api/v1/bootcamps 
// @access      Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamp.create(req.body);
    response = {
        statusCode: 200,
        message: 'Success',
        data: bootcamp
    }
    res.status(response.statusCode).json(response);

});


// @desc        Update bootcamp
// @route       PUT /api/v1/bootcamps/:id 
// @access      Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    response = {
        statusCode: 200,
        message: 'Success',
        data: bootcamp
    }
    if (!bootcamp) {
        return next(new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404));
    }
    res.status(response.statusCode).json(response);

});

// @desc        Delete bootcamp
// @route       DELETE /api/v1/bootcamps/:id 
// @access      Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    response = {
        statusCode: 200,
        message: 'Success',
        data: bootcamp
    }
    if (!bootcamp) {
        return next(new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404));
    }
    res.status(response.statusCode).json(response);
});
