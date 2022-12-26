const express = require('express');
const cors = require('cors');
const mongoose = require('./config/database');

const storeku = require('./routes/storekuRouter');
const user = require('./routes/userRouter');

const PORT = process.env.PORT || 3000;
const baseURL = '/api';
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(`${baseURL}/storeku`, storeku);
app.use(`${baseURL}/user`, user);
app.listen(PORT, () => {
  console.log(`Server Started at PORT ${PORT}`);
});
