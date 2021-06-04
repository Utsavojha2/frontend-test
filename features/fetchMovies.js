const key = '04c35731a5ee918f014970082a0088b1';
const baseURL = 'https://api.themoviedb.org/3';

const fetchMovies = {
  trendingMovies: `${baseURL}/trending/all/week?api_key=${key}&langauge=en-US`,
  fetchMoviesByGenre: (genreId) => `${baseURL}/discover/movie?api_key=${key}&with_genres=${genreId}`,
  searchedMovies: (term) => `${baseURL}/search/movie?api_key=${key}&language=en-US&query=${term}`,
};

export const fetchMovieGenre = (movieId) => `${baseURL}/movie/${movieId}?api_key=${key}&language=en-US`;

export const fetchMovieMakers = (movieId) => `${baseURL}/movie/${movieId}/credits?api_key=${key}&language=en-US`;

export const fetchDirectorInfo = (personId) => `${baseURL}/person/${personId}?api_key=${key}&language=en-US`;

export default fetchMovies;
