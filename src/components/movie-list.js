import React from 'react';
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {API} from '../api-service';
import {useCookies} from "react-cookie";

function MovieList(props) {

    const [token] = useCookies(['mr-token'])

    const movieClicked = movie => evt => {
        props.movieClicked(movie)
    }

    const editClicked = movie => {
        props.editClicked(movie);
    }

    const removeClicked = movie => {
        API.deleteMovie(movie.id, token['mr-token'])
            .then(() => props.removeClicked(movie))
            .catch(error => console.log(error))
    }

    return (<div>
        {props.movies && props.movies.map(movie => {
            return (
                <div key={movie.id} className={"movie-item"}>
                    <h2 onClick={movieClicked(movie)}>{movie.title}</h2>
                    <FontAwesomeIcon icon={solid('edit')} onClick={() => editClicked(movie)}/>
                    <FontAwesomeIcon icon={solid('trash')} onClick={() => removeClicked(movie)}/>
                </div>
            )
        })}
    </div>)
}

export default MovieList