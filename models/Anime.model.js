const { Schema, model } = require("mongoose");

const animeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  synopsis: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  episodes: {
    type: Number,
    required: true,
  },
  rank: {
    type: Number,
    required: true,
  },
  favorites: {
    type: Number,
    required: true,
  },

  timestamps: true,
});

module.exports = model("User", animeSchema);
