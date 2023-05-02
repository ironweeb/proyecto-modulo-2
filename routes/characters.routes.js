const express = require("express");
const router = express.Router();
const ApiService = require("../services/api.service");
const apiService = new ApiService();

router.get("/", (req, res) => {
  apiService.getAllCharacters().then((response) => {
    const characters = response.data;
    console.log(res.data);
    res.render("pages/characters-list", { characters });
  });
});

module.exports = router;
