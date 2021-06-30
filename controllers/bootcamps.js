const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');
const Bootcamp = require('../models/Bootcamp');
const util  = require('../utils/utils');

// @desc        Get all bootcamps
// @route       GET /api/v1/bootcamps 
// @access      Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
    let finalQuery; 
    let reqQuery = { ...req.query}; /* Copy req.query */

    /* Fields to exclude  */
    const removeFields = ['select', 'sort', 'page', 'limit'];
    /* Loop over remove fields and delete from reqQuery */
    removeFields.forEach(param => delete reqQuery[param]);

    /* Give Support of operators */
    let queryStr = JSON.stringify(reqQuery); /* create query string */
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`); /* replace operators */
    finalQuery = Bootcamp.find(JSON.parse(queryStr)); /* Finding resources */

    /* Add Select Fields */
    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        finalQuery = finalQuery.select(fields);
    }

    /* Add Sorting */
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        finalQuery = finalQuery.sort(sortBy);
    } else {
        finalQuery = finalQuery.sort('-createdAt');
    }

    /* Add Pagination */
    const page = parseInt(req.query.page,10) || 1;
    const limit = parseInt(req.query.limit,10) || 100;
    const startIndex = (page - 1) * limit;    
    const endIndex = page * limit;
    const total = await Bootcamp.countDocuments();

    finalQuery = finalQuery.skip(startIndex).limit(limit);

    console.log(reqQuery);
    console.log(req.query);

    const bootcamps = await finalQuery; /* Executing Query */
    
    /* Pagination Result */
    let pagination = {};
    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit
        }
    }
    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        }
    }
    
    
    const length = bootcamps.length;
    response = util.createResponse(200, 'Success', {total,length,pagination, data:bootcamps});
    res.status(response.statusCode).json(response);
});

// @desc        Get single bootcamps
// @route       GET /api/v1/bootcamps/:id 
// @access      Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);
    response = util.createResponse(200, 'Success', bootcamp);
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
    response = util.createResponse(200, 'Success', bootcamp);
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
    response = util.createResponse(200, 'Success', bootcamp);
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
    response = util.createResponse(200, 'Success', bootcamp);
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
    console.log(req.query);
    console.log(req.params);

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

    let response = util.createResponse(200,'Success', {count:bootcamps.length , data: bootcamps});
    
    res.status(response.statusCode).send(response);

});
