const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const authoConfig = require('../../config/auth');


module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const parts = authHeader.split(' ');

  if (parts !== 2) {
    return res.status(401).json({ error: 'Token error' });
  }

  const [schema, token] = parts;

  if (schema !== 'Bearer') {
    return res.status(401).json({ error: 'Token malFormated' });
  }

  try {
    const decoded = await promisify(jwt.verify)(token, authoConfig);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Erro token invalid' });
  }
};
