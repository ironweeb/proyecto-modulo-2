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

  // searchAnime() {
  //   const animeURL = "https://api.jikan.moe/v4/anime";
  //   const { animeName } = req.body;
  //   const { data } = this.api.get(`${animeURL}?q=${animeName}&limit=6`);
  //   return res.status(200).json({
  //     success: true,
  //     data: data.data,
  //   });
  // }
  getSearchAnime(animeName) {
    return this.api.get(`/anime?q=${animeName}&limit=6`);
  }
}

module.exports = ApiService;
