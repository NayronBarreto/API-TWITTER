const mongoose = require('mongoose');

const User = mongoose.model('User');
const Tweet = mongoose.model('Tweet');

module.exports = {
  async me(req, res, next) {
    try {
      const user = await User.findById(req.userId);
      const tweetCount = await Tweet.find({ user: user.id }).count();

      return res.json({
        user,
        tweetCount,
        followersCount: user.followers.length,
        following: user.following.length,
      });
    } catch (err) {
      return next(err);
    }
  },
  async feed(req, res, next) {
    try {
      const user = await User.findById(req.userId);
      const { following } = user;

      const tweets = await Tweet
        .find(
          {
            user: { $in: [user.id, ...following] },
          },
        )
        .limit(50)
        .sort('-createdAt');
      return res.json(tweets);
    } catch (err) {
      return next(err);
    }
  },
  async update(req, res, next) {
    try {
      const id = req.userId;

      const {
        name,
        username,
        password,
        confirmPassword,
      } = req.body;

      if (password && password !== confirmPassword) {
        return res.state(400).json({ error: 'Password do not match' });
      }

      const user = User.findByIdAndUpdate(id, { name, username }, { new: true });

      if (password) {
        user.password = password;
        await user.save();
      }

      return res.json(user);
    } catch (err) {
      return next(err);
    }
  },
};
