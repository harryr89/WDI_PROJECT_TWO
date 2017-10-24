const mongoose = require('mongoose');

const landSchema = new mongoose.Schema({
  name: String,
  location:  String,
  description: String,
  image: String
});

module.exports = mongoose.model('Landscape', landSchema);
