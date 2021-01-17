const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
    userId: String,
    name: String,
    bookmarks: [String],
    customRow: Number,
    customCol: Number
});

module.exports = mongoose.model("group", GroupSchema);
