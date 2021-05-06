const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.URI_DB;

const db = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

mongoose.connection.on("connected", () => {
  console.log(`Mongoose connected`);
});

mongoose.connection.on("error", (error) => {
  console.log(`Mongoose connection error: ${error.message}`);
});

mongoose.connection.on("disconnected", () => {
  console.log(`Mongoose disconnected`);
});

process.on("SIGNIN", () => {
  mongoose.connection.close(() => {
    console.log("Mongoose disconnected");
    process.exit(1);
  });
});

module.exports = db;
