const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const bookReviewSchema = new Schema({
  bookId: { type: String, required: true },
  like: { type: Number, required: false },
  comment: { type: String, required: false },
  userId: { type: String, required: false },
});

module.exports = mongoose.model("book-reviews", bookReviewSchema);
