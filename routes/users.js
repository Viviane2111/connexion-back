var express = require('express');
var router = express.Router();

const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");


//INSCRIPTION
router.post("/signup", (req, res) => {
  if (!checkBody(req.body, ["username", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }
  User.findOne({ username: req.body.username }).then((data) => {
    if (data === null) {
      const newUser = new User({
        username: req.body.username,
        password: req.body.password,
      });
      newUser.save().then(() => {
        res.json({ result: true });
      });
    } else {
      res.json({ result: false, error: "User already exists!" });
    }
  });
});

// CONNEXION
router.post("/signin", (req, res) => {
  if (!checkBody(req.body, ["username", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  User.findOne({
    username: req.body.username,
    password: req.body.password,
  }).then((data) => {
    if (data) {
      res.json({ result: true });
    } else {
      res.json({ result: false, error: "User not found" });
    }
  });
});


module.exports = router;
