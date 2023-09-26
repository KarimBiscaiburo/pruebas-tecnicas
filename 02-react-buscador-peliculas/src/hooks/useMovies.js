import { useRef, useState, useMemo, useCallback } from 'react'
import { searchMovies } from '../service/movies';

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const previousSearch = useRef(search);

  const getMovies = useCallback( async ({ search }) => {
    if (search === previousSearch.current) return;
    try {
      setError(null);
      setLoading(true);
      previousSearch.current = search;
      const newMovies = await searchMovies({ search });
      setMovies(newMovies);
    } catch (error) {
      setError(error);
    } finally {
      // aca cae tanto en el try como en el catch
      setLoading(false);
    }
  }, [])
  
  const sortedMovies = useMemo(() => {
    return sort 
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [sort, movies]);

  return { movies: sortedMovies, loading, getMovies }
}