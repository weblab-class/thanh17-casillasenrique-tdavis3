const mongoose = require("mongoose");

const BookmarkSchema = new mongoose.Schema({
  userId: String,
  url: String,
  name: String,
  icon: String,
  customIcon: 'Buffer',
  index: Number,
});

module.exports = mongoose.model("bookmark", BookmarkSchema);
