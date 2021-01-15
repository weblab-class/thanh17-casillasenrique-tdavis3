const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
    userId: String,
    name: String,
    bookmarks: [String]
});

module.exports = mongoose.model("group", GroupSchema);
