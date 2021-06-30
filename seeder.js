const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');


// load env vars 
dotenv.config({ path: './config/config.env'});

// Load Models
const Bootcamp = require('./models/Bootcamp');   

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

// Read JSON files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/devcamper_project_resources/_data/bootcamps.json`));
// const courses = JSON.parse(fs.readFileSync(`${__dirname}/devcamper_project_resources/_data/courses.json`));
// const reviews = JSON.parse(fs.readFileSync(`${__dirname}/devcamper_project_resources/_data/reviews.json`));
// const users = JSON.parse(fs.readFileSync(`${__dirname}/devcamper_project_resources/_data/users.json`));

// Import into DB 
const importData = async () => {
    try {
        await Bootcamp.create(bootcamps);
        console.log('Data Imported...'.green.inverse);
        process.exit();
    } catch (error) {
        console.log(error);
    }
}

/* 
Database - Database
Collection - Tabel
Documents  - tuples
Fields (key)- Fields (column)
*/
// database have mulitple colleciton or table and each table or collection have multiple tuples or documents.

// Delete Data 
const deleteData = async () => {
    try {
        await Bootcamp.deleteMany();
        console.log('Data Destroyed...'.red.inverse);
        process.exit();
    } catch (error) {
        console.log(error);
    }
}


if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}

console.log(process.argv);