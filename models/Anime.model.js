const { Schema, model } = require("mongoose");

const animeSchema = new Schema({
  mal_id: Number,
  url: String,
  title: String,
  // images: {
  //   jpg: {
  // image_url: { type: String, required: true },
  // small_image_url: { type: String, required: true },
  // large_image_url: { type: String, required: true },
  // },
  // webp: {
  //   image_url: { type: String, required: true },
  //   small_image_url: { type: String, required: true },
  //   large_image_url: { type: String, required: true },
  // },
  // },
  // // trailer: {
  // //   youtube_id: { type: String, required: true },
  // //   url: { type: String, required: true },
  // //   embed_url: { type: String, required: true },
  // // },
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
  // episodes: { type: Number, required: true },
  // status: { type: String, required: true },
});

module.exports = model("Anime", animeSchema);
