const mongoose = require("mongoose");
const BookmarkModel = require("./bookmark");

const GroupSchema = new mongoose.Schema({
  userId: String,
  name: String,
  index: Number,
  bookmarks: [BookmarkModel.schema],
});

module.exports = mongoose.model("group", GroupSchema);
