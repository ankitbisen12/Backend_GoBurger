const express = require('express');
const app = express();


app.all('*', (req, res,next) => {
    console.log(`Can't find ${req.originalUrl} on this server`, 404)
})

module.exports = app;