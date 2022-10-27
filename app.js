const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const authRouter = require('./app/auth/router');
const userRouter = require('./app/user/router');
const categoryRouter = require('./app/category/router');
const drinkRouter = require('./app/drink/router');
const foodRouter = require('./app/food/router');
const cartRouter = require('./app/cart/router');
const transactionRouter = require('./app/transaction/router');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/category', categoryRouter);
app.use('/drink', drinkRouter);
app.use('/food', foodRouter);
app.use('/cart', cartRouter);
app.use('/transaction', transactionRouter);

module.exports = app;
