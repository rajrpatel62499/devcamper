const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');
const Bootcamp = require('../models/Bootcamp');
const { createResponse }  = require('../utils/utils');

// @desc        Get all bootcamps
// @route       GET /api/v1/bootcamps 
// @access      Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
    const bootcamps = await Bootcamp.find();
    response = createResponse(200, 'Success', bootcamps);
    res.status(response.statusCode).json(response);
});

// @desc        Get single bootcamps
// @route       GET /api/v1/bootcamps/:id 
// @access      Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);
    response = createResponse(200, 'Success', bootcamp);
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
    response = createResponse(200, 'Success', bootcamp);
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
    response = createResponse(200, 'Success', bootcamp);
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
    response = createResponse(200, 'Success', bootcamp);
    if (!bootcamp) {
        return next(new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404));
    }
    res.status(response.statusCode).json(response);
});

// @desc        GET bootcamp
// @route       GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access      Private
exports.getBootcampInRadius = asyncHandler(async (req, res, next) => {
    const { zipcode, distance } = req.params;

    // Get lat/lng from geocoder;
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    // Calc radius using radians 
    // Divide dist by radius of earth
    // Earth Radius = 3,963 mi | 6,378 km 
    const radius = distance / 3963;

    const bootcamps = await Bootcamp.find({
        location : { $geoWithin : { $centerSphere: [[lng, lat], radius] } }
    });

    let response = createResponse(200,'Success', {count:bootcamps.length , data: bootcamps});
    
    res.status(response.statusCode).send(response);

});
