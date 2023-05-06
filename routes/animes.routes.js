const express = require("express");
const router = express.Router();
const Anime = require("../models/Anime.model");

const ApiAnime = require("../services/anime.service");
const apiAnime = new ApiAnime();

router.get("/", (req, res) => {
  apiAnime.getFullAnimebyID().then((response) => {
    const animes = response.data;
    console.log(res.data);
    res.render("pages/animes-list", { animes });
  });
});

router.get("/insertar", (req, res) => {
  apiAnime.getFullAnimebyID().then(({ data }) => {
    data.data.forEach((element) => {
      Anime.create(element);
    });
  });
});

module.exports = router;
