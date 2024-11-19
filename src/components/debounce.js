import React, { useState, useEffect } from 'react';
import { searchMovies, getPopularMovies } from './api'; // Import API functions
import '../App.css'; // We will import custom styles

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; // Base URL for images

const DebounceSearch = () => {
  const [query, setQuery] = useState(''); // User entered term
  const [debouncedQuery, setDebouncedQuery] = useState(query); // Value with debounce
  const [movies, setMovies] = useState([]); // List of movies (popular or wanted)
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(0); // Total pages

  // Debounce logic for the search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); // Wait 500ms before updating

    return () => {
      clearTimeout(handler); // Clears the timer if the user continues typing
    };
  }, [query]);

  // Call the API each time `debouncedQuery` or `currentPage` changes.
  useEffect(() => {
    const fetchMovies = async () => {
      if (debouncedQuery) {
        // Performs a search if there is a term entered
        const data = await searchMovies(debouncedQuery, currentPage);
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 0);
      } else {
        // If there is no search term, load popular movies
        const data = await getPopularMovies(currentPage);
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 0);
      }
    };

    fetchMovies();
  }, [debouncedQuery, currentPage]);

  // Change page
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

      {/* Paging controls */}
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
