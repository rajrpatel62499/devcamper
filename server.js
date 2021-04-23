
const express = require('express');
const dotenv = require('dotenv');


// Load env vars
const result = dotenv.config({ path: `./config/config.env`});
// console.log(result);

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}` ))