const mongoose = require("mongoose");

// Mongoose schema
const recordSchema = new mongoose.Schema({
  key: String,
  createdAt: Date,
  counts: Array,
  value: String,
});

module.exports = mongoose.model("Record", recordSchema);
