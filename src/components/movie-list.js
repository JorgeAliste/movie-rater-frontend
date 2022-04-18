import React from 'react';
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function MovieList(props) {

    const movieClicked = movie => evt => {
        props.movieClicked(movie)
    }

    const editClicked = movie => {
      props.editClicked(movie);
    }

    return (<div>
        {props.movies && props.movies.map(movie => {
            return (
                <div key={movie.id} className={"movie-item"}>
                    <h2 onClick={movieClicked(movie)}>{movie.title}</h2>
                    <FontAwesomeIcon icon={solid('edit')} onClick={() => editClicked(movie)}/>
                    <FontAwesomeIcon icon={solid('trash')}/>
                </div>
            )
        })}
    </div>)
}

export default MovieList