const mongoose = require("mongoose");

const SettingsSchema = new mongoose.Schema({
  userId: String,
  isDarkMode: Boolean,
  backgroundImage: String,
  firstLogin: Boolean,
});

// compile model from schema
module.exports = mongoose.model("settings", SettingsSchema);
