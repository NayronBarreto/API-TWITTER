const express = require('express');

const routes = express.Router();

const requireDir = require('require-dir');

const controllers = requireDir('./controllers');

/**
 * Auth
 */

routes.post('/signup', controllers.authController.signup);


module.exports = routes;
