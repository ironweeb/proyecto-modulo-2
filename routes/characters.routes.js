const express = require("express");
const router = express.Router();
const ApiService = require("../services/api.service");
const apiService = new ApiService();

router.get("/", (req, res) => {
  apiService.getAllCharacters().then((response) => {
    console.log(res.data);
    const characters = response.data;
    res.render("pages/characters-list", { characters });
  });
});

module.exports = router;
