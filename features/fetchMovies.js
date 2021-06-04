const key = '04c35731a5ee918f014970082a0088b1';

const fetchMovies = {
  trendingMovies: `/trending/all/week?api_key=${key}&langauge=en-US`,
  fetchMoviesByGenre: (genreId) => `/discover/movie?api_key=${key}&with_genres=${genreId}`,
  searchedMovies: (term) => `/search/movie?api_key=${key}&language=en-US&query=${term}`,
};

export const fetchMovieGenre = (movieId) => `/movie/${movieId}?api_key=${key}&language=en-US`;

export const fetchMovieMakers = (movieId) => `/movie/${movieId}/credits?api_key=${key}&language=en-US`;

export const fetchDirectorInfo = (personId) => `https://api.themoviedb.org/3/person/${personId}?api_key=${key}&language=en-US`;

export default fetchMovies;
