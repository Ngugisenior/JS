const express = require('express');
const path = require('path');


/**
 * create express app
 */
const app = express();
/**
 * Set view engine
 */

/**
 * Set middleware
 */
 app.use(express.static(path.join(__dirname, '..', 'build'))); /** Serves React buil folder */
 app.use(express.static(path.join(__dirname, 'public'))); /** Serves the react public folder */

 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})


module.exports = app;