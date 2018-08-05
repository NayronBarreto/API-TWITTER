const express = require('express');

const routes = express.Router();

const requireDir = require('require-dir');

const authMiddlewares = require('./middlewares/auth');

const controllers = requireDir('./controllers');

/**
 * Auth
 */

routes.post('/signup', controllers.authController.signup);
routes.post('/signin', controllers.authController.signin);

/**
 * ====================
 * Auth routes
 */
routes.use(authMiddlewares);

/**
 * Tweets
 */

routes.post('/tweets', controllers.tweetController.create);
routes.delete('/tweets/:id', controllers.tweetController.destroy);

module.exports = routes;
