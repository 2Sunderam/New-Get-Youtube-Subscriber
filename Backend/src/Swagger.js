const express = require('express');
const app = express();
// Defining options for generating Swagger documentation
const options = {
    definition: {
        openapi: '3.0.0',//version of OpenAPI 
        info: {
            title: 'Get Youtube Subscribers API Documentation',
            version: '1.0.0',//version of API 
            description: 'API documentation for my application',
        },
    },
    apis: ['./app.js'], // Path to routes and JSDoc comments
};


module.exports ={options};