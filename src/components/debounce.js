import React, { useState, useEffect } from 'react';
import { searchMovies, getPopularMovies } from './api'; // Importamos las funciones API
import '../App.css'; // Importaremos estilos personalizados

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; // URL base para imágenes

const DebounceSearch = () => {
  const [query, setQuery] = useState(''); // Término ingresado por el usuario
  const [debouncedQuery, setDebouncedQuery] = useState(query); // Valor con debounce
  const [movies, setMovies] = useState([]); // Lista de películas (populares o buscadas)
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [totalPages, setTotalPages] = useState(0); // Total de páginas

  // Lógica de debounce para el término de búsqueda
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); // Espera 500ms antes de actualizar

    return () => {
      clearTimeout(handler); // Limpia el temporizador si el usuario sigue escribiendo
    };
  }, [query]);

  // Llama a la API cada vez que `debouncedQuery` o `currentPage` cambien
  useEffect(() => {
    const fetchMovies = async () => {
      if (debouncedQuery) {
        // Realiza búsqueda si hay un término ingresado
        const data = await searchMovies(debouncedQuery, currentPage);
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 0);
      } else {
        // Si no hay término de búsqueda, carga películas populares
        const data = await getPopularMovies(currentPage);
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 0);
      }
    };

    fetchMovies();
  }, [debouncedQuery, currentPage]);

  // Cambiar página
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="search-container">
      <h1>Búsqueda de Películas (TMDB)</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Escribe el nombre de una película..."
        className="search-input"
      />
      <div className="movies-grid">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <img
              src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'}
              alt={movie.title}
              className="movie-poster"
            />
            <div className="movie-details">
              <h3 className="movie-title">{movie.title}</h3>
              <p className="movie-date">{movie.release_date || 'Sin fecha'}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Controles de paginación */}
      <div className="pagination-controls">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Anterior
        </button>
        <span className="pagination-info">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default DebounceSearch;
