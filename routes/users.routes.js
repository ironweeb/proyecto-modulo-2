const express = require("express");
const router = express.Router();
const { isLoggedIn, checkRole } = require("../middleware/route.guard");
const User = require("../models/User.model");
const Anime = require("../models/Anime.model");

//GET ROUTES

router.get("/", async (req, res, next) => {
  const users = await User.find();
  res.render("users/users", { users });
});

//GET MY ANIME LIST
router.get("/my-anime-list", isLoggedIn, async (req, res) => {
  const animes = await User.findById(req.session.currentUser._id).populate({
    path: "animes",
    model: Anime,
  });

  res.render("users/myanime", { animes });
});

router.get("/:id", isLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  const profile = await User.findById(id);
  res.render("users/profile", {
    profile,
    canEdit:
      (req.session.currentUser &&
        ["ADMIN"].includes(req.session.currentUser.role)) ||
      req.session.currentUser._id === id,
    canDelete:
      req.session.currentUser &&
      ["ADMIN"].includes(req.session.currentUser.role),
  });
});

router.get(
  "/:id/edit",
  [isLoggedIn, checkRole(["ADMIN"])],
  async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.render("users/edit-form", {
      user,
      canEdit: ["ADMIN"].includes(req.session.currentUser.role),
    });
  }
);

/////POST ROUTES/////
//POST CREATE MY ANIME LIST
router.post("/my-anime-list/:id", async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndUpdate(req.session.currentUser._id, {
    $push: { animes: id },
  });
  console.log(id);
  res.redirect("/users/my-anime-list");
});

//POST EDIT USER
router.post("/:id/edit", checkRole(["ADMIN"]), async (req, res, next) => {
  const { id } = req.params;
  await User.findByIdAndUpdate(id, req.body);
  // res.redirect("/users/" + id);
  res.redirect(`/users/${id}`);
});

//POST DELETE USER
router.post(
  "/:id/delete",
  [isLoggedIn, checkRole(["ADMIN"])],
  async (req, res, next) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.redirect("/users");
  }
);

module.exports = router;
