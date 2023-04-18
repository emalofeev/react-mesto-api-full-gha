const express = require('express');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/router');
const errorsMiddlewares = require('./middlewares/errorsMiddlewares');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, DB_ADDRESS } = require('./config');

const app = express();

mongoose.connect(DB_ADDRESS);

app.use(bodyParser.json());
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorsMiddlewares);

app.listen(PORT, () => {});
