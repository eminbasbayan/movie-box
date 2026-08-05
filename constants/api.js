const API_BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY || '';

const ENDPOINTS = {
  TRENDING_MOVIES: '/trending/movie/week',
  TOP_RATED_MOVIES: '/movie/top_rated',
  UPCOMING_MOVIES: '/movies/upcomig',
  POPULAR_TV: '/tv/popular',

  MOVIE_DETAIL: (id) => `/movie/${id}`,
  MOVIE_CREDITS: (id) => `/movie/${id}/credits`,
  MOVIE_SIMILAR: (id) => `/movie/${id}/similar`,

  TV_DETAIL: (id) => `/tv/${id}`,
  TV_CREDITS: (id) => `/tv/${id}/credits`,
  TV_SIMILAR: (id) => `/tv/${id}/similar`,
};

const IMAGE_SIZES = {
  poster: {
    medium: `${IMAGE_BASE_URL}/w342`,
    large: `${IMAGE_BASE_URL}/w500`,
  },
  backdrop: {
    large: `${IMAGE_BASE_URL}/w1280`,
  },
  profile: {
    medium: `${IMAGE_BASE_URL}/w185`,
  },
};

const buildUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}?api_key=${API_KEY}&language=tr-TR`;
};

export { buildUrl, ENDPOINTS, IMAGE_SIZES };
