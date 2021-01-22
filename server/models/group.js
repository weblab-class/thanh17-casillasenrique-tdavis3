const mongoose = require("mongoose");
const BookmarkModel = require("./bookmark");

const GroupSchema = new mongoose.Schema({
  userId: String,
  name: String,
  index: Number,
  bookmarks: [BookmarkModel.schema],
  pageIndex: Number,
});

module.exports = mongoose.model("group", GroupSchema);
