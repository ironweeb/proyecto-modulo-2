const axios = require("axios");
class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: "https://api.jikan.moe/v4/",
    });
  }
  getAllCharacters() {
    return this.api.get("/characters");
  }
}

module.exports = ApiService;
