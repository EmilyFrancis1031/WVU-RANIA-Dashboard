var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var TinyDB = require("tinydb");
test_db = new TinyDB("./test.db");

// Routes
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var welcomeRouter = require("./routes/welcome");
var dashboardRouter = require("./routes/dashboard");
var agendaRouter = require("./routes/agenda");
var settingsRouter = require("./routes/settings");
var receiveData = require("./routes/receive_data");
var personalRouter = require("./routes/editpersonal");
var medicalRouter = require("./routes/editmedical");
var medicationRouter = require("./routes/editmedication");
var contactRouter = require("./routes/editcontact");
var deviceRouter = require("./routes/devices");

var app = express();

const dotenv = require("dotenv").config();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes to use
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/welcome", welcomeRouter);
app.use("/dashboard", dashboardRouter);
app.use("/agenda", agendaRouter);
app.use("/settings", settingsRouter);
app.use("/data", receiveData);
app.use("/contacts", contactRouter);
app.use("/medical", medicalRouter);
app.use("/devices", deviceRouter);
app.use("/medications", medicationRouter);
app.use("/personal", personalRouter);

app.use(
  "/public/stylesheets",
  express.static(path.join(__dirname, "public", "stylesheets"))
);
app.use(
  "/public/scripts",
  express.static(path.join(__dirname, "public", "scripts"))
);
app.use(
  "/public/images",
  express.static(path.join(__dirname, "public", "images"))
);
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
