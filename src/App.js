import {useEffect, useState} from "react";
import './App.css';
import MovieCard from "./MovieCard";
import SearchLogo from "./search.png"

const API_URL = 'http://www.omdbapi.com?apikey=1b95b0fc'

const App = () => {

  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search)
  }

  useEffect(() => {
    searchMovies('Spiderman')
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input 
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => {setSearchTerm(e.target.value)}}
        />
        <img 
          src={SearchLogo}
          alt="Search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      { movies?.length > 0
        ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard movie={movie}/>
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>Nenhum filme encontrado</h2>
          </div>
        )
      }

    </div>
  );
}

export default App;