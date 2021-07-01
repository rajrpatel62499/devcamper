const express = require('express');
const dotenv = require('dotenv'); // managing enviornment variables.
const morgan = require('morgan'); // logging middleware
const colors = require('colors'); // color in console.
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// Load env vars
dotenv.config({ path: `./config/config.env`});
// connect to database 
connectDB();

const app = express();
// Body Parser 
app.use(express.json())

// Route Files 
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const users = require('./routes/users');


// Dev logging middleware 
if (process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'));
}

// Mount Routers 
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/users',users);
app.use('/api/v1/courses', courses);
app.use(errorHandler);



const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, ()=> console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold ));


// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    // close server & exit process
    server.close(() => process.exit(1));
})