const express = require("express");
const AuthService = require("../services/auth");
const jwt = require("jsonwebtoken");
const db = require("../repositories/index");
const { ObjectID } = require("bson");

const data = express.Router();

data.get("/listuser", async (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  try {
    jwt.verify(token, "my_secret_key");
  } catch (err) {
    return res.json(err.message);
  }

  let x = await db.user.find({}).toArray();
  if (x) {
    return res.json(x);
  }
  return res.json("Failed");
});

data.post("/createjob", async (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  try {
    jwt.verify(token, "my_secret_key");
  } catch (err) {
    return res.json(err.message);
  }

  let x = await db.job.insertOne(req.body).catch((err) => {
    if (err) {
      return res.json(err.message);
    }
  });
  return res.json("Created");
});

data.get("/alljob", async (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  try {
    jwt.verify(token, "my_secret_key");
  } catch (err) {
    return res.json(err.message);
  }

  let x = await db.job.find({}).toArray();
  if (x) {
    return res.json(x);
  }

  return res.json(false);
});

data.post("/updatejob/:id", async (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  try {
    jwt.verify(token, "my_secret_key");
  } catch (err) {
    return res.json(err.message);
  }

  let id = req.params.id;
  await db.job
    .findOneAndUpdate(
      { _id: ObjectID(id) },
      { $set: { ...req.body } },
      { upsert: true, returnNewDocument: false }
    )
    .catch((err) => {
      return res.json(err.message);
    });

  return res.json("OK");
});

data.get("/deletejob/:id", async (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  try {
    jwt.verify(token, "my_secret_key");
  } catch (err) {
    return res.json(err.message);
  }

  let id = req.params.id;
  await db.job.deleteOne({ _id: ObjectID(id) }).catch((err) => {
    return res.json(err.message);
  });

  return res.json("OK");
});

module.exports = data;
