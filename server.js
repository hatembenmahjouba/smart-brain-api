const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const morgan = require('morgan');
const knex = require('knex');
const { signinAuthentication } = require('./controllers/signin');
const { handleRegister } = require('./controllers/register');
const {
  handleProfileGet,
  handleProfileUpdate,
} = require('./controllers/profile');
const { handleImage, handleApiCall } = require('./controllers/image');
const { requireAuth } = require('./controllers/authorization');
const { signout } = require('./controllers/signout');

dotenv.config();
const db = knex({
  client: 'pg',
  connection: process.env.POSTGRES_URI,
});
const app = express();
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(cors());
app.get('/', (req, res) => {
  res.send('it is working');
});
app.post('/signin', signinAuthentication(db, bcrypt));
app.post('/register', (req, res) => {
  handleRegister(req, res, db, bcrypt);
});
app.delete('/signout', (req, res) => {
  signout(req, res);
});

app.get('/profile/:id', requireAuth, (req, res) => {
  handleProfileGet(req, res, db);
});
app.post('/profile/:id', requireAuth, (req, res) => {
  handleProfileUpdate(req, res, db);
});
app.put('/image', requireAuth, (req, res) => {
  handleImage(req, res, db);
});
app.post('/imageurl', requireAuth, (req, res) => {
  handleApiCall(req, res);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
