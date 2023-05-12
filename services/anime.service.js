const axios = require("axios");
class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: `https://api.jikan.moe/v4/`,
    });
  }

  getFullAnimebyID() {
    const page = 3;
    return this.api.get(`/anime?page=${page}`);
  }

  // getSearchAnime() {
  //   const animeName = "";
  //   console.log(animeName);
  //   return this.api.get(`/anime?q=${animeName}`);
  // }
}

module.exports = ApiService;
