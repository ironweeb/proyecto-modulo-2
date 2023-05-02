const axios = require("axios");
class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: "https://api.jikan.moe/v4/",
    });
  }

  getFullAnimebyID() {
    return this.api.get("/anime");
  }
}

module.exports = ApiService;