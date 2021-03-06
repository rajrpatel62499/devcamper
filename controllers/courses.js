const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Course = require('../models/Course');
const util  = require('../utils/utils');

// @desc        Get all courses
// @route       GET /api/v1/courses 
// @route       GET /api/v1/bootcamps/:bootcampId/courses 
// @access      Public
exports.getCourses = asyncHandler(async (req,res,next) => {
    let query;
    if (req.params.bootcampId) {
        query = Course.find({ bootcamp: req.params.bootcampId});
    } else {
        query = Course.find().populate({
            path: 'bootcamp',
            select: 'name description'
        });
    }

    const courses = await query;
    const response = util.createResponse(200, courses);
    res.status(200).json(response);
});
