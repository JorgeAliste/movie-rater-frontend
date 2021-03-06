import {useState, useEffect} from 'react';
import './App.css';
import MovieList from "./components/movie-list";
import MovieDetails from "./components/movie-details";
import MovieForm from "./components/movie-form";
import {useCookies} from "react-cookie";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {useFetch} from "./hooks/useFetch";

function App() {

    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [editedMovie, setEditedMovie] = useState(null);
    const [token, , deleteToken] = useCookies(['mr-token'])
    const [data, loading, error] = useFetch();

    // OLD GET MOVIES
    // useEffect(() => {
    //     fetch("http://127.0.0.1:8000/movierater/movies", {
    //         method: 'GET', headers: {
    //             'Content-Type': 'application/json', 'Authorization': `Token ${token['mr-token']}`
    //         }
    //     }).then(resp => resp.json())
    //         .then(resp => setMovies(resp))
    //         .catch(error => console.log(error))
    // }, [token])

    useEffect(() => {
        setMovies(data);
    }, [data])

    useEffect(() => {
        if (!token['mr-token']) window.location.href = '/';
    }, [token])

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

    const newMovie = () => {
        setEditedMovie({title: '', description: ''});
        setSelectedMovie(null);
    }

    const movieCreated = movie => {
        const newMovies = [...movies, movie];
        setMovies(newMovies)
    }

    const removeClicked = movie => {
        const newMovies = movies.filter(mov => {
            return mov.id !== movie.id;
        })
        setMovies(newMovies)
    }

    const logoutUser = () => {
        deleteToken('mr-token');
    }

    if (loading) return <h1>Loading...</h1>
    if(error) return <h1>There was an error loading the page</h1>

    return (<div className="App">
        <header className="App-header">
            <h1>
                <FontAwesomeIcon icon={solid('film')}/>
                <span>The Movie Rater APP!</span>

            </h1>
            <FontAwesomeIcon icon={solid('sign-out-alt')} onClick={logoutUser}/>
        </header>

        <div className="layout">
            <div>
                Movie List
                <MovieList
                    movies={movies}
                    movieClicked={loadMovie}
                    editClicked={editClicked}
                    removeClicked={removeClicked}
                />
                <button onClick={newMovie}>New Movie</button>
            </div>
            <div>
                Movie Details
                <MovieDetails movie={selectedMovie} updateMovie={loadMovie} editedMovie={editedMovie}/>
                {editedMovie ?
                    <MovieForm movie={editedMovie} updatedMovie={loadMovie} movieCreated={movieCreated}/> : null}

            </div>

        </div>
    </div>);
}

export default App;
