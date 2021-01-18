const mongoose = require("mongoose");
const BookmarkModel = require("./bookmark");

const GroupSchema = new mongoose.Schema({
    userId: String,
    name: String,
    customRow: Number,
    customCol: Number,
    index: Number,
    bookmarks: [ BookmarkModel.schema ],
});

module.exports = mongoose.model("group", GroupSchema);
