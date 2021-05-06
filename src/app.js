const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { HttpCode } = require("./helpers/constants");
const { apiLimiter, jsonLimit } = require("./config/reteLimit.json");
const { ErrorHandler } = require("./helpers/errorHandler");

const routesCats = require("./routes/cats");
const routesUsers = require("./routes/users");

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: jsonLimit }));
app.use(express.urlencoded({ extended: false }));

app.use(
  "/api/",
  rateLimit({
    windowMs: apiLimiter.windowMs,
    max: apiLimiter.max,
    handler: (req, res, next) => {
      next(
        new ErrorHandler(
          HttpCode.BAD_REQUEST,
          "A lot of requests for 15 minutes"
        )
      );
    },
  })
);
app.use("/api/cats", routesCats);
app.use("/api/users", routesUsers);

app.use((req, res, next) => {
  res.status(HttpCode.NOT_FOUND).json({
    status: "error",
    code: HttpCode.NOT_FOUND,
    message: `Use api ${req.baseUrl}/api/cats`,
    data: "Not Found",
  });
});

app.use((err, req, res, next) => {
  err.status = err.status ? err.status : HttpCode.INTERNAL_SERVER_ERROR;
  res.status(err.status).json({
    status: err.status === 500 ? "fail" : "error",
    code: err.status,
    message: err.message,
    data: err.status === 500 ? "Internal Server Error" : err.data,
  });
});

module.exports = app;
