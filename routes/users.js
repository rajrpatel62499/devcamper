const fs = require('fs');
const express = require('express');
const users = JSON.parse(fs.readFileSync('./devcamper_project_resources/_data/users.json'));


const router = express.Router();


router.get('/',(req, res,next)=>{
    res.status(200).json(users);
})

router.get("/:id", (req,res, next)=>{
    const f = users.find(x => x._id == req.params.id);
    
})

module.exports = router; 
