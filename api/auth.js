const express = require("express");
const AuthService = require("../services/auth");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", async (req, res) => {
  console.log("?");
  const { username, password } = req.body;
  let check = await AuthService.login(username, password);
  if (check) {
    const token = jwt.sign({ username: username }, "my_secret_key", {
      expiresIn: 60000,
    });
    res.json({ token: token });
  } else {
    res.json("Sai password");
  }
});

router.post("/register", async (req, res) => {
  const newUser = await AuthService.register(
    req.body.username,
    req.body.password
  ).catch((err) => {
    if (err) {
      return err.message;
    }
    return newUser;
  });
  res.json(newUser);
});

router.get("/login", async (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  try {
    jwt.verify(token, "my_secret_key");
  } catch (err) {
    return res.json(false);
  }

  let username = jwt.verify(token, "my_secret_key").username;
  const newtoken = jwt.sign({ username: username }, "my_secret_key", {
    expiresIn: 6000,
  });
  return res.json({ token: newtoken, username: username });
});

module.exports = router;
