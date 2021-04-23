const fs = require('fs');

const reviews = JSON.parse(fs.readFileSync('./devcamper_project_resources/_data/reviews.json'));

app.get('/api/v1/reviews',(req, res)=>{
    res.status(200).json(reviews);
})