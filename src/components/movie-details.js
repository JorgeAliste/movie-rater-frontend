import React, {Fragment} from 'react';

function MovieDetails(props) {

    const movie = props.movie

    return (
        <div>
            {movie ?
                <Fragment>
                    <h1>{movie.title}</h1>
                    <h2>{movie.description}</h2>
                </Fragment>
                : <h1> Select a movie to see the details</h1>
            }
        </div>
    )
}

export default MovieDetails