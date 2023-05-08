const axios = require("axios");
class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: "https://api.jikan.moe/v4/",
    });
  }
  getAllCharacters() {
    const page = 1;
    return this.api.get(`/characters?page=${page}`);
  }
}

module.exports = ApiService;
