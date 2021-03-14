const express = require('express');
const path = require('path');
const logger = require('morgan');
const {pagination} = require('./middlewares/pagination');
const indexRouter = require('./routes/products');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(pagination(25,100))
app.use('/', indexRouter);


module.exports = app;
