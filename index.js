const express = require('express');
const {urlencoded, json} = require('express');
const cors = require('cors');
require('dotenv').config();
const login = require('./routes/userRoutes.routes');
const port = process.env.PORT;
const app = express();

app.use(urlencoded({extended: true}))
app.use(json())
app.use(cors());


app.use('/user', login);
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});
app.get('/user/login', (req, res) => {
    res.send('¡Hola, login!');
  });

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
