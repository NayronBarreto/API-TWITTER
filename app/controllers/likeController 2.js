const mongoose = require('mongoose');

const Tweet = mongoose.model('Tweet');

module.exports = {
  async toogle(req, res, next) {
    try {
      const tweet = await Tweet.findById(req.params.id);

      if (!tweet) {
        return res.status(400).json({ error: 'Tweet does not exist' });
      }

      const liked = tweet.likes.indexOf(req.userId);

      if (liked === -1) {
        tweet.like.push(req.userId);
      } else {

      };

    } catch (err) {
      return next();
    }
  },


};
