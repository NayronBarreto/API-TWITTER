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

/**
 * Likes
 */

routes.post('/like/:id', controllers.likeController.toogle);


/**
 * Use
 */
routes.get('/users/me', controllers.userController.me);
routes.get('/feeds', controllers.userController.feed);

/**
 * Follows
 */

routes.post('/follow/:id', controllers.followController.create);
routes.delete('/unfollow/:id', controllers.followController.destroy);

module.exports = routes;
