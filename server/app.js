/* PACKAGES */
const express = require('express');

const app = express();
require('dotenv').config();
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const bodyParser = require('body-parser');
const morgan = require('morgan');


/* CUSTOM */
const userRoutes = require('./api/routes/user');



app.use(helmet());

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);
app.use(hpp());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('api/uploads', express.static('uploads'));
app.use(morgan('dev'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});



/* ROOT ROUTES THAT FORWARD REQUESTS */
app.use('/api/user', userRoutes);



/* ERROR HANDLING */
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});



app.use((error, req, res) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});



module.exports = app;
