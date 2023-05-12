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
  function getAnimeData() {
    const animeName = document.getElementById("anime-name").value;
    fetch(`${API_URL}/anime?q=${animeName}`)
      .then((res) => res.json())
      .then((data) => {
        data.data.forEach((item) => {
          const anime = item;
          console.log(item);
          const imageUrl = item.images;
          const animeDataDiv = document.createElement("div");
          animeDataDiv.innerHTML = `
        <p></p>
          <img src ="${imageUrl.jpg.image_url}">
          <p><b>Title:</b> ${anime.title}</p>
          <p><b>Local Name:</b> ${anime.title_japanese} <p>
          <p><b>Synopsis:</b> ${anime.synopsis}</p>
          <p><b>Type:</b> ${anime.type}</p>
          <p><b>Total Episodes:</b> ${anime.episodes}</p>
        `;

          document.getElementById("anime-data").appendChild(animeDataDiv);
        });
      });
  }
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
