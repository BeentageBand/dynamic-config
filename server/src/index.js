const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const dynamicConf = require('./api/dynamicconf');
const authorizer = require('./authorizer')
const app = express();

const corsOrigin = process.env.CORS_ORIGIN || 'https://localhost:3000';
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: corsOrigin,
}));
app.use(express.json());

app.use(authorizer);

app.get('/', (req, res) => {
    res.json({
        message: 'Route',
    })
});

app.use('/conf', dynamicConf);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 1337;
const server = app.listen(port, () => console.log(`Listening to port https://localhost:${port}`));

module.exports = server;