const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = {
  async update(req, res, next) {
    try {
      const id = req.userId;

      const { name, username, password, confirmPassword } = req.body;

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
