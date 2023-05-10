const { Schema, model } = require("mongoose");

const characterSchema = new Schema({
  mal_id: {
    type: Number,
  },
  url: {
    type: String,
  },
  images: {
    jpg: {
      image_url: {
        type: String,
      },
      small_image_url: {
        type: String,
      },
    },
    webp: {
      image_url: {
        type: String,
      },
      small_image_url: {
        type: String,
      },
    },
  },
  name: {
    type: String,
  },
  name_kanji: {
    type: String,
  },
  nicknames: {
    type: [String],
  },
  favorites: {
    type: Number,
  },
  about: {
    type: String,
  },
});

module.exports = model("Character", characterSchema);
