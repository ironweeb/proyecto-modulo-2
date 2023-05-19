const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const saltRounds = 10;

// Register
router.get("/registro", (req, res, next) => res.render("auth/register"));
router.post("/registro", (req, res, next) => {
  const { userPwd } = req.body;

  bcrypt
    .genSalt(saltRounds)
    .then((salt) => bcrypt.hash(userPwd, salt))
    .then((hashedPassword) =>
      User.create({ ...req.body, password: hashedPassword })
    )
    .then((createdUser) => res.redirect("/"))
    .catch((error) => next(error));
});

// Login
router.get("/login", (req, res, next) => res.render("auth/login"));
router.post("/login", (req, res, next) => {
  const { email, userPwd } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        res.render("auth/login", {
          errorMessage: "Email no registrado en la Base de Datos",
        });
        return;
      } else if (bcrypt.compareSync(userPwd, user.password) === false) {
        res.render("auth/login", {
          errorMessage: "La contraseña es incorrecta",
        });
        return;
      } else {
        req.session.currentUser = user;
        req.app.locals.currentUser = user;
        res.redirect("/userprofile");
      }
    })
    .catch((error) => next(error));
});

//User profile
router.get("/userProfile", (req, res) => {
  res.render("auth/user-profile", { userInSession: req.session.currentUser });
});

// Logout
router.get("/logout", (req, res) => {
  req.app.locals.isLogged = false;
  req.session.destroy(() => res.redirect("/"));
});

module.exports = router;
