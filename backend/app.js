const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const userRoutes = require("./routes/user");
const bookRoutes = require("./routes/book");

const app = express();

// connect to database

mongoose
  .connect("mongodb://localhost:27017/smart-library")
  .then(() => {
    console.log("connected to database");
  })
  .catch(() => {
    console.log("connection failed");
  });

app.use(bodyParser.json());

app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,DELETE,PATCH,PUT,OPTIONS"
  );
  next();
});

// redirect user related api
app.use("/api/user", userRoutes);

// redirect to book API
app.use("/api/book", bookRoutes);

module.exports = app;
