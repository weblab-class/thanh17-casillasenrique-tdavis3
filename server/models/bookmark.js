const mongoose = require("mongoose");

const BookmarkSchema = new mongoose.Schema({
    user: String,
    url: String,
    name: String,
    image: String,
});

module.exports = mongoose.model("bookmark", BookmarkSchema);
