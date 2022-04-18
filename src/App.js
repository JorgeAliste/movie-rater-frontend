import {useState, useEffect} from 'react';
import './App.css';
import MovieList from "./components/movie-list";
import MovieDetails from "./components/movie-details";
import MovieForm from "./components/movie-form";

function App() {

    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [editedMovie, setEditedMovie] = useState(null);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/movierater/movies", {
            method: 'GET', headers: {
                'Content-Type': 'application/json', 'Authorization': 'Token fb4da56aa72ef3190594b82d365287a53774f59f'
            }
        }).then(resp => resp.json())
            .then(resp => setMovies(resp))
            .catch(error => console.log(error))
    }, [])

    const loadMovie = movie => {
        const newMovies = movies.map(mov => {
            if (mov.id === movie.id) {
                return movie;
            }
            return mov;
        });
        setMovies(newMovies);
        setSelectedMovie(movie);
        setEditedMovie(null);
    }

    const editClicked = movie => {
        setEditedMovie(movie);
        setSelectedMovie(null);
    }

    return (<div className="App">
        <header className="App-header">
            The Movie Rater APP!
        </header>

        <div className="layout">
            <div>
                Movie List
                <MovieList movies={movies} movieClicked={loadMovie} editClicked={editClicked}/>
            </div>
            <div>
                Movie Details
                <MovieDetails movie={selectedMovie} updateMovie={loadMovie} editedMovie={editedMovie}/>
                {editedMovie ? <MovieForm movie={editedMovie}/> : null}

            </div>

        </div>
    </div>);
}

export default App;
