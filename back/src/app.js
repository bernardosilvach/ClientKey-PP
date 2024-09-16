const express = require('express');

const dotenv = require('dotenv').config();

const clientesRouter = require('./routes/clienteRouter');
const userRouter = require('./routes/usersRouter')
const cors = require('cors');
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(cors());

app.use('/api', clientesRouter);
app.use('/api', userRouter);

module.exports = app;