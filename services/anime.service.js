const axios = require("axios");
class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: `https://api.jikan.moe/v4/`,
    });
  }

  getFullAnimebyID() {
    const page = 1;
    return this.api.get(`/anime?page=${page}`);
  }
  searchAnime = async (keyword) => {
    const response = await axios.get(
      `https://api.jikan.moe/v4/search/anime?q=${keyword}&sfw`
    );
    const results = response.data.results;
    return results;
  };
  // goNextPage() {
  //   const totalPage = 40;
  //   const page = 1;
  //   if (page < totalPage) {
  //     return this.getFullAnimebyID(`/anime?page=${page + 1}`);
  //   }
  // }
  // goPreviusPage() {
  //   const totalPage = 40;
  //   const page = 1;
  //   if (totalPage > page) {
  //     return this.getFullAnimebyID(`/anime?page=${page + 1}`);
  //   }
  // }
  // getSearch(results) {
  //   const resultsDiv = document.getElementById("consulta-busqueda");
  //   resultsDiv.innerHTML = "";
  //   results.forEach((result) => {
  //     const resultDiv = document.createElement("div");
  //     resultDiv.innerHTML = `
  // <h2>${result.title}</h2>
  // <img src="${result.image_url}">
  // <p>${result.synopsis}</p>
  // `;
  //     return resultsDiv.appendChild(resultDiv);
  //   });
  // }
}

module.exports = ApiService;
