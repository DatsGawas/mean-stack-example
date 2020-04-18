const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("./../models/user");

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      role: 2,
    });

    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User Created!",
          data: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });
});

router.post("/login", (req, res, next) => {
  let fetchUser = null;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res.status(401).json({
          messaage: " Auth Failed",
        });
      }
      fetchUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        res.status(401).json({
          messaage: " Auth Failed",
        });
      }

      const token = jwt.sign(
        { email: fetchUser.email, userId: fetchUser._id },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );

      res.status(200).json({
        message: "Login Successful",
        data: {
          token: token,
          user: {
            name: fetchUser.name,
            email: fetchUser.email,
            role: fetchUser.role,
          },
        },
      });
    })
    .catch(() => {
      res.status(401).json({
        messaage: " Auth Failed",
      });
    });
});

module.exports = router;
