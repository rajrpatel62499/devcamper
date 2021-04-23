const fs = require('fs');

const users = JSON.parse(fs.readFileSync('./devcamper_project_resources/_data/users.json'));

app.get('/api/v1/users',(req, res)=>{
    res.status(200).json(users);
})

