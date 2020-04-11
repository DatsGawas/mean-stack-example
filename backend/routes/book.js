const express = require("express");
const router = express.Router();
const Books = require("../models/book");
const checkAuth = require("../middleware/check_auth");

router.get("/getBooks", (req, res, next) => {
  Books.find().then((documents) => {
    return res.status(200).json({
      message: "data fetch successfully",
      data: documents,
    });
  });
});

module.exports = router;
