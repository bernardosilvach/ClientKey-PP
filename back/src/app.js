const express = require('express');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv').config();

const clientesRouter = require('./routes/clienteRouter');
const userRouter = require('./routes/usersRouter')
const cors = require('cors');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(cors());
app.use(fileUpload()); // Middleware para manipulação de upload de arquivos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', clientesRouter);
app.use('/api', userRouter);

module.exports = app;