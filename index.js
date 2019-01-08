const express = require('express');
const app = express();
const cors = require('cors');

const { mongoose } = require('./config/db');

const port = 3000;

app.use(cors());

const { routes } = require('./config/routes');

app.use(express.json());

//middlewares
app.use('/', routes);    

app.listen(port, () => {
    console.log('listening on port', port);
});

