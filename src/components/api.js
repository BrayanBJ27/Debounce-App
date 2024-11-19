import axios from 'axios';

// TMDB URL base
const BASE_URL = 'https://api.themoviedb.org/3';

// Movie search function
export const searchMovies = async (query, page = 1, language = 'es-ES') => {
  const apiKey = process.env.REACT_APP_TMDB_API_KEY;

  if (!query) {
    return []; // If there is no search term, it returns an empty array.
  }

  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: apiKey,
        query,
        page,
        language,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error al buscar películas:', error);
    return { results: [], total_pages: 0 };
  }
};

// Function to obtain popular movies
export const getPopularMovies = async (page = 1, language = 'es-ES') => {
  const apiKey = process.env.REACT_APP_TMDB_API_KEY;

  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: apiKey,
        page,
        language,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error al obtener películas populares:', error);
    return { results: [], total_pages: 0 };
  }
};
