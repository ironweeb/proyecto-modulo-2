const express = require("express");
const router = express.Router();
const Anime = require("../models/Anime.model");

const ApiAnime = require("../services/anime.service");
const apiAnime = new ApiAnime();

router.get("/insertar", (req, res) => {
  apiAnime.getFullAnimebyID().then(({ data }) => {
    data.data.forEach((element) => {
      Anime.create(element);
    });
  });
});

router.get("/list", (req, res) => {
  Anime.find()
    .then((animes) => res.render("pages/animes-list", { animes }))
    .catch((err) => console.log(err));
});


module.exports = router;



