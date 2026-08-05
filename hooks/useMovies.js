import { useEffect, useState } from 'react';
import { buildUrl } from '../constants/api';

const useMovies = (endpoint) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = buildUrl(endpoint);
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP hata: ${response.status}`);
        }

        const data = await response.json();
        setMovies(data.results || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [endpoint]);

  return {
    movies,
    loading,
    error,
  };
};

export default useMovies;
