const express = require("express");
const router = express.Router();
const { isLoggedIn, checkRole } = require("../middleware/route.guard");
const Anime = require("../models/Anime.model");
const User = require("../models/User.model");

const ApiAnime = require("../services/anime.service");
const apiAnime = new ApiAnime();

//GET ANIMES
router.get("/insertar", (req, res) => {
  apiAnime.getFullAnimebyID().then(({ data }) => {
    data.data.forEach((element) => {
      Anime.create(element);
    });
    return;
  });
});

router.get("/results", (req, res) => {
  apiAnime.searchAnime().then(({ data }) => {
    res.render("pages/results", data);
  });
});

//GET ANIME LIST
router.get("/list", (req, res) => {
  Anime.find()
    .then((animes) => {
      res.render("pages/animes-list", { animes });
    })
    .catch((err) => console.log(err));
});

//GET ANIME DETAILS
router.get("/:id", isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.params;
    const anime = await Anime.findById(id);
    res.render("pages/anime-details", {
      anime,
      canEdit:
        (req.session.currentUser &&
          ["ADMIN", "DEV"].includes(req.session.currentUser.role)) ||
        req.session.currentUser._id === anime,
      canDelete:
        req.session.currentUser &&
        ["ADMIN"].includes(req.session.currentUser.role),
    });
  } catch (err) {
    console.log(err);
  }
});

//GET ANIME EDIT
router.get(
  "/:id/edit",
  [isLoggedIn, checkRole(["ADMIN"])],
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const anime = await Anime.findById(id, req.body);
      res.render("pages/anime-edit", {
        anime,
        canEdit: ["ADMIN"].includes(req.session.currentUser.role),
      });
    } catch (err) {
      console.log(err);
    }
  }
);

////POST ANIMES
router.post(
  "/:animeId/edit",
  [isLoggedIn, checkRole(["DEV", "ADMIN"])],
  async (req, res) => {
    try {
      const { animeId } = req.params;
      const { title, url, image, rank, episodes, status, favorite } = req.body;
      await Anime.findByIdAndUpdate(animeId, {
        title,
        url,
        image,
        rank,
        episodes,
        status,
        favorite,
      });
    } catch (error) {
      console.log(error);
    }
  }
);

router.post(
  "/:id/delete",
  [isLoggedIn, checkRole(["ADMIN"])],
  async (req, res, next) => {
    const { id } = req.params;
    await Anime.findByIdAndDelete(id);
    res.redirect("/animes/list");
  }
);


module.exports = router;



