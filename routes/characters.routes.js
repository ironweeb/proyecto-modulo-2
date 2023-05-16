const express = require("express");
const router = express.Router();
const { isLoggedIn, checkRole } = require("../middleware/route.guard");
const Character = require("../models/Character.model");
const User = require("../models/User.model");

const ApiService = require("../services/api.service");
const apiService = new ApiService();

// GET CHARACTER LIST
router.get("/list", (req, res) => {
  Character.find()
    .then((characters) => {
      res.render("pages/characters-list", {
        characters,
      });
    })
    .catch((err) => console.log(err));
});

// GET CHARACTER DETAILS
router.get("/:id", isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.params;
    const character = await Character.findById(id);
    res.render("pages/character-details", {
      character,
      canEdit:
        (req.session.currentUser &&
          ["ADMIN", "DEV"].includes(req.session.currentUser.role)) ||
        req.session.currentUser._id === character,
      canDelete:
        req.session.currentUser &&
        ["ADMIN"].includes(req.session.currentUser.role),
    });
  } catch (err) {
    console.log(err);
  }
});

// GET CHARACTER EDIT
router.get(
  "/:id/edit",
  [isLoggedIn, checkRole(["ADMIN"])],
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const character = await Character.findById(id, req.body);
      res.render("pages/character-edit", {
        character,
        canEdit: ["ADMIN"].includes(req.session.currentUser.role),
      });
    } catch (err) {
      console.log(err);
    }
  }
);

// POST CHARACTER EDIT
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
    };
    await Character.findByIdAndUpdate(id, data);
    res.redirect(`/characters/${id}`);
  }
);

// POST CHARACTER DELETE
router.post(
  "/:id/delete",
  [isLoggedIn, checkRole(["ADMIN"])],
  async (req, res, next) => {
    const { id } = req.params;
    await Character.findByIdAndDelete(id);
    res.redirect("/characters/list");
  }
);

module.exports = router;
