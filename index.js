const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const router = require("./api");
const db = require("./repositories/index");


require("./repositories");

const { MongoClient } = require("mongodb");

const client = new MongoClient("mongodb://localhost:27017");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(router);


app.listen(1991, () => {
  console.log("App is running on 1991");
});

