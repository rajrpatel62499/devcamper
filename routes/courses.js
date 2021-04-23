const fs = require('fs');
const courses = JSON.parse(fs.readFileSync('./devcamper_project_resources/_data/courses.json'));

app.get('/api/v1/courses',(req, res)=>{
    res.status(200).json(courses);
})