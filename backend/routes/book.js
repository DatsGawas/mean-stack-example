const express = require("express");
const router = express.Router();
const Books = require("../models/book");
const BookReviews = require("../models/book-review");
const checkAuth = require("../middleware/check_auth");
const multer = require("multer");
const bodyParser = require("body-parser");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Datta");
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLocaleLowerCase().split(" ").join("-");

    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "_" + Date.now() + "." + ext);
  },
});

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

router.post("/add-book", (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  console.log(req.body, url);
  const book = new Books({
    title: req.body.title,
    subtitle: req.body.subtitle,
    author: req.body.author,
    published: req.body.published,
    publisher: req.body.publisher,
    description: req.body.description,
    pages: req.body.pages,
    website: req.body.website,
  });
  book.save();
  console.log("DDDDD-----" + JSON.stringify(req.file));
  res.status(201).json({ message: "book added successfully", data: null });
});

module.exports = router;
