const express = require("express");
const router = express.Router();
const Books = require("../models/book");
const BookReviews = require("../models/book-review");
const checkAuth = require("../middleware/check_auth");

router.get("/getBooks", (req, res, next) => {
  Books.find().then((documents) => {
    return res.status(200).json({
      message: "data fetch successfully",
      data: documents,
    });
  });
});

router.post("/update-review", checkAuth, (req, res, next) => {
  const review = new BookReviews({
    bookId: req.body.bookId,
    userId: req.userData.userId,
    like: req.body.like,
  });
  review
    .save()
    .then((result) => {
      res.status(201).json({
        message: "review added",
        data: null,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
