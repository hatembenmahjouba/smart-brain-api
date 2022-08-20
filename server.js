const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');
const { handleSignin } = require('./controllers/signin');
const { handleRegister } = require('./controllers/register');
const { handleProfileGet } = require('./controllers/profile');
const { handleImage, handleApiCall } = require('./controllers/image');

dotenv.config();
const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
  },
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('it is working');
});

app.post('/signin', handleSignin(db, bcrypt));

app.post('/register', (req, res) => {
  handleRegister(req, res, db, bcrypt);
});

app.get('/profile/:id', (req, res) => {
  handleProfileGet(req, res, db);
});

app.put('/image', (req, res) => {
  handleImage(req, res, db);
});
app.post('/imageurl', (req, res) => {
  handleApiCall(req, res);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
