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

router.get("/list/?order=score", (req, res) => {
  Anime.find()
    .sort({ score: -1 })
    .limit(12)
    .then((animes) => {
      res.render("pages/animes-list", { animes });
    })
    .catch((err) => console.log(err));
});

router.get("/list/?order=episodes", (req, res) => {
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
router.get("/list", (req, res) => {
  Anime.find()
    .sort({ mal_id: 1 })
    .limit(12)
    .then((animes) => {
      res.render("pages/animes-list", { animes });
    })
    .catch((err) => console.log(err));
});
router.get("/list/2", (req, res) => {
  Anime.find({ mal_id: { $gte: 30 } })
    .sort({ mal_id: 1 })
    .limit(12)
    .then((animes) => {
      res.render("pages/animes-list", { animes });
    })
    .catch((err) => console.log(err));
});
router.get("/list/3", (req, res) => {
  Anime.find({ mal_id: { $gte: 52 } })
    .sort({ mal_id: 1 })
    .limit(12)
    .then((animes) => {
      res.render("pages/animes-list", { animes });
    })
    .catch((err) => console.log(err));
});
router.get("/list/4", (req, res) => {
  Anime.find({ mal_id: { $gte: 64 } })
    .sort({ mal_id: 1 })
    .limit(12)
    .then((animes) => {
      res.render("pages/animes-list", { animes });
    })
    .catch((err) => console.log(err));
});
router.get("/list/5", (req, res) => {
  Anime.find({ mal_id: { $gte: 76 } })
    .sort({ mal_id: 1 })
    .limit(12)
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

router.post("/results", (req, res) => {
  const { data } = req.body;
  apiAnime.getSearchAnime(data).then(({ data }) => {
    res.render("pages/animes-list", { animes: data.data });
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
