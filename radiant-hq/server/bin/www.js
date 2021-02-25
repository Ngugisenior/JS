#!/usr/bin/env node

/**
 * Import Module Dependencies
 */

 const app = require('../app');

 const http = require('http');

 const debug = require('debug')('radiant:server');

 /**
  * Define Server Port
  */

  const port = process.env.PORT || 3000;


  /**
   * Set the server port
   */

   app.set('port', port);

   /**
    * create http server
    */

    const server = http.createServer(app);


    /**
     * Start listening
     */

     server.listen(port);

/**
 * TODO: Handle the errors
 */