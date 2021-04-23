const fs = require('fs');
const bootcamps = JSON.parse(fs.readFileSync('./devcamper_project_resources/_data/bootcamps.json'));

const express = require('express');
const router = express.Router();

const response = {
    statusCode: 400,
    message: 'Not Found',
    data: null
}

router.get('',(req, res)=>{
    response.statusCode = 200;
    response.message = 'Success';
    response.data = bootcamps;
    res.status(200).json(response);
});

router.get('/:id',(req, res)=>{
    response.statusCode = 200;
    response.message = 'Success';
    response.data = bootcamps.find(x => x._id === req.params.id);
    res.status(200).json(response);
});

router.post('',(req, res)=>{
    response.statusCode = 201;
    response.message = 'Success';
    response.data = `Created bootcamp`;
    res.status(200).json(response);
})

router.put('/:id',(req, res)=>{
    response.statusCode = 200;
    response.message = 'Success';
    response.data = `Updated bootcamp ${req.params.id}`;
    res.status(200).json(response);
})

router.delete('/:id',(req, res)=>{
    response.statusCode = 200;
    response.message = 'Success';
    response.data = `Deleted bootcamp ${req.params.id}`;
    res.status(200).json(response);
})

module.exports = router;