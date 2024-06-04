const mongoose = require("mongoose");

const connectToMongo = () =>
  mongoose.connect("mongodb://localhost:27017/mynotebook");

module.exports = connectToMongo;
