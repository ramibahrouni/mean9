var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
//var indexRouter = require('./routes/index');
var clientsRouter = require('./routes/preferences');
var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://rami:20254641+Rami@pfe-jbn2g.mongodb.net/test?retryWrites=true&w=majority', {
    promiseLibrary: require('bluebird'),
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => console.log('Successful connection'))
  .catch((err) => console.error(err));




var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', clientsRouter);

module.exports = app;
