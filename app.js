const createError = require("http-errors");
const express = require("express");
const swaggerUI = require('swagger-ui-express');
const swaggerDocoument = require('./swagger.json');
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const options = require('./knexfile.js');
const knex = require('knex')(options)

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use((req,res, next) => {
  req.db = knex
  next()
});

// Swagger setup
app.use("/docs",swaggerUI.serve, swaggerUI.setup(swaggerDocoument));

//Routes
app.use("/", indexRouter);
app.use("/user", usersRouter);

// /Me Endpoint 
app.get('/me', (req, res) => {
  res.json({
      name: "Danny Feng",
      student_number: "n11609273"
  })
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
