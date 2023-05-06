const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  const { q } = req.query;
});

module.exports = router;
