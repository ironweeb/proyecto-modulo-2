const express = require("express");
const router = express.Router();

const ApiAnime = require("../services/anime.service")
const apiAnime = new ApiAnime()

router.get("/", (req, res) => {
    apiAnime.getFullAnimebyID().then((response) => {
    const animes = response.data;
    console.log(res.data);
    res.render("pages/animes-list", { animes });
  });
});

router.get("/search/anime",(req, res)=>{
  apiAnime.getSearch().then((res)=>{

    res.render("/")
  })

})



module.exports = router;