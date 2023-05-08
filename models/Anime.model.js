const { Schema, model } = require("mongoose");

const animeSchema = new Schema({
  mal_id: Number,
  url: String,
  title: String,
  images: {
    jpg: {
      image_url: { type: String },
      small_image_url: { type: String },
      large_image_url: { type: String },
    },
  },
  episodes: { type: Number },
  status: { type: String },
  trailer: {
    youtube_id: { type: String },
    url: { type: String },
    embed_url: { type: String },
  },
  synopsis: String,
  score: Number,
  themes: [{ type: Object }],
  genres: [{ type: Object }],
  // approved: { type: Boolean, required: true },
  // titles: [
  //   {
  //     type: { type: String, required: true },
  //     title: { type: String, required: true },
  //   },
  // ],
  // // // title_english: { type: String, required: true },
  // // // title_japanese: { type: String, required: true },
  // // // title_synonyms: [{ type: String, required: true }],
  // // type: { type: String, required: true },
  // // source: { type: String, required: true },
});

module.exports = model("Anime", animeSchema);
