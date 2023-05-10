const express = require("express");
const router = express.Router();
const { isLoggedIn, checkRole } = require("../middleware/route.guard");
const Character = require("../models/Characters.model");
const User = require("../models/User.model");

const ApiService = require("../services/api.service");
const apiService = new ApiService();

// GET CHARACTER LIST
router.get("/list", (req, res) => {
  apiService
    .getAllCharacters()
    .then(({ data }) => {
      res.render("pages/characters-list", { characters: data.data });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/");
    });
});

// GET CHARACTER DETAILS
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await apiService.api.get(`/characters/${id}`);
    const character = response.data.data;
    res.render("pages/character-details", {
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
    res.redirect("/characters/list");
  }
});

// GET CHARACTER EDIT
router.get(
  "/:id/edit",
  [isLoggedIn, checkRole(["ADMIN"])],
  async (req, res) => {
    try {
      const { id } = req.params;
      const character = await Character.findById(id, req.body);
      res.render("pages/character-edit", {
        anime,
        canEdit: ["ADMIN"].includes(req.session.currentUser.role),
      });
    } catch (err) {
      console.log(err);
      res.redirect("/characters/list");
    }
  }
);

// POST CHARACTER EDIT
router.post(
  "/:id/edit",
  [isLoggedIn, checkRole(["ADMIN"])],
  async (req, res) => {
    const { id } = req.params;
    await Character.findByIdAndUpdate(id, req.body);
    res.redirect("/characters/list");
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
