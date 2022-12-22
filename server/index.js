const express = require("express");
const cors = require("cors");
const errorHandler = require("./src/middlewares/errorHandler");
const config = require("./src/configs");
const xss = require("xss-clean");
const compression = require("compression");
const helmet = require("helmet");

const mainRouter = require("./src/routers");

const app = express();

const PORT = config.server.port || 4000;

app.enable("trust proxy");

// Set security HTTP headers
app.use(helmet());

// Set body parser --> read data from body into req.body
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

// Implement CORS
app.use(cors());

// Sanitize data against XSS
app.use(xss());

app.use(compression());

app.use('/api/v1', mainRouter);

// Handle if occur error
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`);
});
