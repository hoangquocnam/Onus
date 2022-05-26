const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const server = express();

server.use(cors());

const port = 8000;
mongoose.connect(process.env.DATABASE);
const connection = mongoose.connection;

connection
  .on("connected", () => {
    console.log("Connected Database");
    server.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .on("disconnected", () => {
    console.log("Disconnect Database");
  })
  .on("error", (error) => {
    console.log(error);
  });
