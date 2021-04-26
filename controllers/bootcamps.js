// const fs = require('fs');
// const bootcamps = JSON.parse(fs.readFileSync('./devcamper_project_resources/_data/bootcamps.json'));
const ErrorResponse = require('../utils/errorResponse');
const Bootcamp = require('../models/Bootcamp'); 


let response = {
    statusCode: 400,
    message: 'Not Found',
    data: null
}


// @desc        Get all bootcamps
// @route       GET /api/v1/bootcamps 
// @access      Public
exports.getBootcamps = async (req,res,next) => {
    try {
        const bootcamps = await Bootcamp.find();
        response = {
            statusCode: 200, 
            message: 'Success',
            data: bootcamps
        }
        res.status(response.statusCode).json(response);

    } catch (err) {
        sendBadRequest(res,err);
    }
}

// @desc        Get single bootcamps
// @route       GET /api/v1/bootcamps/:id 
// @access      Public
exports.getBootcamp = async (req,res,next) => {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id);
        response = {
            statusCode: 200, 
            message: 'Success',
            data: bootcamp
        }
        if (!bootcamp) {
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));  
        }
        res.status(response.statusCode).json(response);
    } catch (err) {
        // sendBadRequest(res, err);      
        next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));  
    }
}

// @desc        Create new bootcamp
// @route       POST /api/v1/bootcamps 
// @access      Private
exports.createBootcamp = async (req,res,next) => {
    
    try {
        const bootcamp = await Bootcamp.create(req.body);
        response = {
            statusCode: 200, 
            message: 'Success',
            data: bootcamp
        }
        res.status(response.statusCode).json(response);
    } catch (err) {
        sendBadRequest(res,err);
    }


}


// @desc        Update bootcamp
// @route       PUT /api/v1/bootcamps/:id 
// @access      Private
exports.updateBootcamp = async (req,res,next) => {

    try {
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
            response.statusCode = 400; 
            response.message = 'Not Found';
        }
        res.status(response.statusCode).json(response);
    } catch (err) {
        sendBadRequest(res,err);
    }
}

// @desc        Delete bootcamp
// @route       DELETE /api/v1/bootcamps/:id 
// @access      Private
exports.deleteBootcamp = async (req,res,next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
        response = {
            statusCode: 200, 
            message: 'Success',
            data: bootcamp
        }
        if (!bootcamp) {
            response.statusCode = 400; 
            response.message = 'Not Found';
        }
        res.status(response.statusCode).json(response);
    } catch (err) {
        sendBadRequest(res,err);
    }
}

function sendBadRequest(res,err) {
    response = {
        statusCode: 400, 
        message: 'Bad Request',
        data: err
    }
    res.status(response.statusCode).json(response);
}