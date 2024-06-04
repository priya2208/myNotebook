const mongoose = require("mongoose");

const { Schema } = mongoose;

const NoteSchema = new Schema({
  // it is like a foreign key
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "General",
  },
  date: {
    type: Date,
    default: Date.new,
  },
});

module.exports = mongoose.model("note", NoteSchema);
