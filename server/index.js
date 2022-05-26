const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();


const port = 8000;
mongoose.connect(process.env.DATABASE);

const connection = mongoose.connection

connection
    .on('connected', () => {
        console.log('Connected Database')
    })
    .on('disconnected', () => {
        console.log('Disconnect Database');
    })
    .on('error', (error) => {
        console.log(error)
    })

const server = express();

server.use(cors())


server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})
