import axios from 'axios';

// Base URL de TMDB
const BASE_URL = 'https://api.themoviedb.org/3';

// Función para buscar películas
export const searchMovies = async (query, page = 1, language = 'es-ES') => {
  const apiKey = process.env.REACT_APP_TMDB_API_KEY;

  if (!query) {
    return []; // Si no hay término de búsqueda, devuelve un array vacío
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

// Función para obtener películas populares
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
