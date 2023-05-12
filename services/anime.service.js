const axios = require("axios");
class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: `https://api.jikan.moe/v4/`,
    });
  }
  getAnimeData() {
    const animeName = document.getElementById("anime-name").value;
    fetch(`${API_URL}/anime?q=${animeName}`)
      .then((res) => res.json())
      .then((data) => {
        data.data.forEach((item) => {
          const anime = item;
          console.log(item);
          const imageUrl = item.images;
          const animeDataDiv = document.createElement("div");
          animeDataDiv.innerHTML = `
        <p></p>
          <img src ="${imageUrl.jpg.image_url}">
          <p><b>Title:</b> ${anime.title}</p>
          <p><b>Local Name:</b> ${anime.title_japanese} <p>
          <p><b>Synopsis:</b> ${anime.synopsis}</p>
          <p><b>Type:</b> ${anime.type}</p>
          <p><b>Total Episodes:</b> ${anime.episodes}</p>
        `;

          document.getElementById("anime-data").appendChild(animeDataDiv);
        });
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
