const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const ExpressPinoLogger = require("express-pino-logger");
const swaggerUI = require("swagger-ui-express");
const { init } = require("./src/modules");
const loggerPino = require('./src/core/logger');

const logger = ExpressPinoLogger({
    logger: loggerPino,
    customLogLevel(res, err) {
        if (res.statusCode >= 400 && res.statusCode < 500) {
        return "warn";
        }
        if (res.statusCode >= 500 || err) {
        return "error";
        }
        if (res.statusCode >= 300 && res.statusCode < 400) {
        return "silent";
        }
        return "info";
    },
    serializers: {
        req: (req) => ({
        method: req.method,
        url: req.url,
        query: req.query,
        params: req.params,
        headers: {
            "user-agent": req.headers["user-agent"],
            "session-id": req.headers["session-id"] ?? "",
            host: req.headers.host,
        },
        remoteAddress: req.remoteAddress,
        }),
        res: (res) => ({
        statusCode: res.statusCode,
        header: {
            date: res.headers.date,
            "x-correlation-id": res.headers["x-correlation-id"],
        },
        }),
    },
});

dotenv.config();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs
});
// Set UP server
const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

app.use(express.json());
app.use(cookieParser())
app.use(limiter);
app.use(helmet());
app.use(logger);

const swaggerDocument = require("./swagger.json");

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}))

app.get('/test', (req, res) => {
    res.send('It works')
});

// Connect to mongoDB
mongoose.connect(process.env.MDB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if(err) return console.error(err);
    console.log("Connected to MongoDb")
});

// Set UP Routes
init(app);
