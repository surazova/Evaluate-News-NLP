// .env config
const dotenv = require("dotenv");
dotenv.config();

var path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
// const fetch = import('node-fetch').then(...);
const mockAPIResponse = require("./mockAPI.js");

const app = express();

const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("dist"));

// Meaningcloud API
const baseURL = "https://api.meaningcloud.com/sentiment-2.1?";
const apiKey = process.env.API_KEY;
let userInput = [];

// Get Routes
app.get("/", function (req, res) {
  // res.sendFile("dist/index.html");
  res.sendFile(path.resolve("src/client/views/index.html"));
});

// Mock API Response
app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});

// POST Routes
app.post("/api", async function (req, res) {
  userInput = req.body.url;
  console.log(`${userInput}`);
  const apiURL = `${baseURL}key=${apiKey}&url=${userInput}&lang=en`;

  const response = await fetch(apiURL);
  const mcData = await response.json();
  res.send(mcData);
});

// Port
app.listen(8081, function () {
  console.log("Sentiment Reader Listening on PORT 8081");
});
