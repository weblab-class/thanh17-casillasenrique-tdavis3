const mongoose = require("mongoose");

const BookmarkSchema = new mongoose.Schema({
    parent: String,
    dest: String,
    name: String,
    image: Image,  
});

module.exports = mongoose.model("bookmark", BookmarkSchema);