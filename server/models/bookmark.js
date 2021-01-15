const mongoose = require("mongoose");

const BookmarkSchema = new mongoose.Schema({
    userId: String,
    url: String,
    name: String,
    image: String,
    group: String
});

module.exports = mongoose.model("bookmark", BookmarkSchema);