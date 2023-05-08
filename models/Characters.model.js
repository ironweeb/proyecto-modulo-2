const { Schema, model } = require("mongoose");

const characterSchema = new Schema({
  mal_id: {
    type: Number,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  images: {
    jpg: {
      image_url: {
        type: String,
        required: true
      },
      small_image_url: {
        type: String,
        required: true
      }
    },
    webp: {
      image_url: {
        type: String,
        required: true
      },
      small_image_url: {
        type: String,
        required: true
      }
    }
  },
  name: {
    type: String,
    required: true
  },
  name_kanji: {
    type: String,
    required: true
  },
  nicknames: {
    type: [String]
  },
  favorites: {
    type: Number,
    required: true
  },
  about: {
    type: String,
    required: true
  }
});

module.exports = model('Character', characterSchema);
