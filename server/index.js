const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')



mongoose.connect(uriDB);

const connection = mongoose.connection

connection
    .on('connected', () => {
        logger.info('Connected Database')
    })
    .on('disconnected', () => {
        logger.warn('Disconnect Database');
        
    })
    .on('error', (error) => {
        logger.error(error)
    })

const server = express();

server.use(cors())

server.use(router);


server.listen(port, () => {
    logger.info(`Server running at http://${hostname}:${port}`);
})
