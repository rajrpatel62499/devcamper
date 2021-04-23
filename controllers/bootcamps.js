const fs = require('fs');
const bootcamps = JSON.parse(fs.readFileSync('./devcamper_project_resources/_data/bootcamps.json'));

const response = {
    statusCode: 400,
    message: 'Not Found',
    data: null
}


// @desc        Get all bootcamps
// @route       GET /api/v1/bootcamps 
// @access      Public
exports.getBootcamps = (req,res,next) => {
    response.statusCode = 200;
    response.message = 'Success';
    response.data = bootcamps;
    res.status(200).json(response);
}

// @desc        Get single bootcamps
// @route       GET /api/v1/bootcamps/:id 
// @access      Public
exports.getBootcamp = (req,res,next) => {
    response.statusCode = 200;
    response.message = 'Success';
    response.data = bootcamps.find(x => x._id === req.params.id);
    res.status(200).json(response);
}

// @desc        Create new bootcamp
// @route       POST /api/v1/bootcamps 
// @access      Private
exports.createBootcamp = (req,res,next) => {
    response.statusCode = 201;
    response.message = 'Success';
    response.data = `Created bootcamp`;
    res.status(200).json(response);
}


// @desc        Update bootcamp
// @route       PUT /api/v1/bootcamps/:id 
// @access      Private
exports.updateBootcamp = (req,res,next) => {
    response.statusCode = 200;
    response.message = 'Success';
    response.data = `Updated bootcamp ${req.params.id}`;
    res.status(200).json(response);
}

// @desc        Delete bootcamp
// @route       DELETE /api/v1/bootcamps/:id 
// @access      Private
exports.deleteBootcamp = (req,res,next) => {
    response.statusCode = 200;
    response.message = 'Success';
    response.data = `Deleted bootcamp ${req.params.id}`;
    res.status(200).json(response);
}