const express = require("express");
const router = express.Router();
const { isLoggedIn, checkRole } = require("../middleware/route.guard");
const Anime = require("../models/Anime.model");
const User = require("../models/User.model");

const ApiAnime = require("../services/anime.service");
const apiAnime = new ApiAnime();

//ORDENACIONES
router.get("/list/order=end", (req, res) => {
  Anime.find()
    .sort({ mal_id: -1 })
    .limit(12)
    .then((animes) => {
      res.render("pages/animes-list", { animes });
    })
    .catch((err) => console.log(err));
});

router.get("/list/order=score", (req, res) => {
  Anime.find()
    .sort({ score: -1 })
    .limit(12)
    .then((animes) => {
      res.render("pages/animes-list", { animes });
    })
    .catch((err) => console.log(err));
});

router.get("/list/order=episodes", (req, res) => {
  Anime.find()
    .sort({ episodes: -1 })
    .limit(12)
    .then((animes) => {
      res.render("pages/animes-list", { animes });
    })
    .catch((err) => console.log(err));
});

//GET ANIMES
router.get("/insertar", (req, res) => {
  apiAnime.getFullAnimebyID().then(({ data }) => {
    data.data.forEach((element) => {
      Anime.create(element);
    });
    return;
  });
});

//GET ANIME LIST
router.get("/list/:page", (req, res) => {
  const page = parseInt(req.params.page) || 1;
  const limit = 12;
  const skip = (page - 1) * limit;

  Anime.find()
    .sort({ mal_id: 1 })
    .skip(skip)
    .limit(limit)
    .then((animes) => {
      console.log("THIS IS MY PAGE", req.params.page);
      res.render("pages/animes-list", {
        animes,
        prevPage: page - 1,
        nextPage: page + 1,
        hasPrevPage: page > 1,
        hasNextPage: animes.length === limit,
        currentPage: page,
        firstPage: 1,
      });
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
  "/:id/edit",
  [isLoggedIn, checkRole(["ADMIN"])],
  async (req, res, next) => {
    const { id } = req.params;
    const data = {
      ...req.body,
      images: {
        jpg: {
          image_url: req.body.images,
        },
      },
      genres: [{ name: req.body.genres }],
    };
    await Anime.findByIdAndUpdate(id, data);
    res.redirect(`/animes/${id}`);
  }
);

//POST ANIME SEARCH AND CREATE
router.post("/results", (req, res) => {
  const { data } = req.body;
  apiAnime.getSearchAnime(data).then(({ data }) => {
    const malIds = data.data.map((element) => element.mal_id);
    Anime.find({ mal_id: { $in: malIds } }).then((existingAnimeList) => {
      const existingMalIds = existingAnimeList.map((anime) => anime.mal_id);
      const newAnimeList = data.data.filter(
        (element) => !existingMalIds.includes(element.mal_id)
      );
      if (newAnimeList.length > 0) {
        //crea nuevos animes
        Anime.bulkWrite(
          newAnimeList.map((element) => ({
            updateOne: {
              //busca por mal_id
              filter: { mal_id: element.mal_id },
              update: { $set: element },
              //permite crear nuevos animes si no existen
              upsert: true,
            },
          }))
        )
          .then(() => {
            console.log("Nuevos animes creados:", newAnimeList);
            Anime.find({ mal_id: { $in: malIds } }).then((createdAnimeList) => {
              res.render("pages/results", { animes: createdAnimeList });
            });
          })
          .catch((err) => {
            console.error("Error al crear nuevos animes:", err);
            res.render("pages/results", { animes: data.data });
          });
      } else {
        Anime.find({ mal_id: { $in: malIds } }).then((createdAnimeList) => {
          res.render("pages/results", { animes: createdAnimeList });
        });
      }
    });
  });
});

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
