const Clarifai = require('clarifai');
const handleApiCall = (req, res) => {
  const app = new Clarifai.App({
    apiKey: process.env.CLARIFAI_KEY,
  });
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json('Unable to work with api'));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json('unable to get entries'));
};

module.exports = {
  handleApiCall,
  handleImage,
};
