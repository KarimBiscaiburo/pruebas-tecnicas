import { useEffect, useState, useRef, useCallback } from 'react';
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies';
import debounce from "just-debounce-it";

function useSearch() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }

    if (search === "") {
      setError("No se puede buscar una película vacía");
      return;
    }

    if (search.match(/^\d+$/)) {
      setError("No se puede buscar una película con un número");
      return;
    }

    setError(null)

  }, [search])

  return { search, setSearch, error }
} 

function App() {
  const [sort, setSort] = useState(false);
  const { search, setSearch, error } = useSearch() 
  const { movies, loading, getMovies } = useMovies({ search, sort });
  
  const handleSubmit = (e) => {
    e.preventDefault()
    getMovies(search)
  }
  const handleChange = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    debouncedGetMovies(newSearch);
  }
  const handleSort = () => {
    setSort(!sort);
  }
  const debouncedGetMovies = useCallback(
    debounce( search => {
      getMovies({ search })
    }, 300) 
  , [])
  
  

  return (
    <div className='page'> 
      <h1>Buscador de peliculas</h1>
      <header>
        <form onSubmit={handleSubmit} className='form'>
          <input 
            onChange={handleChange} 
            value={search} 
            type='text' 
            placeholder='Avenger, Star Wars, Thor...'
          />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{color: "red"}}>{error}</p>}
      </header>

      <main>
        {
          loading ? <p>Cargando ... </p> : <Movies movies={movies}/>
        }
      </main>
    </div>
  )
}

export default App
