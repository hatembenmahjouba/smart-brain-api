const { redisClient } = require('./signin');

const signout = (req, res) => {
  const { authorization } = req.headers;
  return redisClient.del(authorization, (err, reply) => {
    if (err) {
      return res.status(400).json('Not found');
    }
    res.status(200).json('success');
  });
};

module.exports = {
  signout,
};
