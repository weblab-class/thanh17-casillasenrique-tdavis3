const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
    user: String,
    bookmarks: [String]
});

module.exports = mongoose.model("group", GroupSchema);
