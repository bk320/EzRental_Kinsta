const express = require('express');
const morgan = require('morgan');
const cors = require("cors");

const taskRoutes = require('./routes/resid.routes');

const app = express();
const whitelist = [
    "http://localhost:8080",
    "https://ez-rental-kinsta-front.vercel.app",
  ];

app.use(cors());
app.use(morgan('dev'));

// Agrega el middleware express.json() aquí antes de las rutas
app.use(express.json());

app.use(taskRoutes);

app.listen(8080);
console.log('Server on port 8080');