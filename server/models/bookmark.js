const mongoose = require("mongoose");

const BookmarkSchema = new mongoose.Schema({
  userId: String,
  url: String,
  name: String,
  icon: String,
  customIcon: 'Buffer',
  group: String,
  customRow: Number,
  customCol: Number,
  index: Number,
});

module.exports = mongoose.model("bookmark", BookmarkSchema);
