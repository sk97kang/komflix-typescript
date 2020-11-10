import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  timeout: 1000,
});

api.interceptors.request.use((config) => {
  config.params = config.params || {};
  config.params["api_key"] = "10923b261ba94d897ac6b81148314a3f";
  config.params["language"] = "ko-KR";
  return config;
});

export const moviesApi = {
  nowPlaying: (page: number) =>
    api.get("movie/now_playing", { params: { page } }),
  upcoming: (page: number) => api.get("movie/upcoming", { params: { page } }),
  popular: (page: number) => api.get("movie/popular", { params: { page } }),
  movieDetail: (id: number) =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: `videos,similar,recommendations,credits`,
      },
    }),
  search: (term: string) =>
    api.get("search/movie", {
      params: {
        query: term,
      },
    }),
};

export const tvApi = {
  topRated: (page: number) => api.get("tv/top_rated", { params: { page } }),
  popular: (page: number) => api.get("tv/popular", { params: { page } }),
  airingToday: (page: number) =>
    api.get("tv/airing_today", { params: { page } }),
  showDetail: (id: number) =>
    api.get(`tv/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  search: (term: string) =>
    api.get("search/tv", {
      params: {
        query: term,
      },
    }),
};
