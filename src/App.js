import {useState, useEffect} from 'react';
import './App.css';
import MovieList from "./components/movie-list";
import MovieDetails from "./components/movie-details";

function App() {

    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/movierater/movies", {
            method: 'GET', headers: {
                'Content-Type': 'application/json', 'Authorization': 'Token '
            }
        }).then(resp => resp.json())
            .then(resp => setMovies(resp))
            .catch(error => console.log(error))
    }, [])

    const movieClicked = movie => {
        setSelectedMovie(movie);
    }

    return (<div className="App">
        <header className="App-header">
            The Movie Rater APP!
        </header>

        <div className="layout">
            <div>
                Movie List
                <MovieList movies={movies} movieClicked={movieClicked}/>
            </div>
            <div>
                Movie Details
                <MovieDetails movie={selectedMovie}/>
            </div>

        </div>
    </div>);
}

export default App;
