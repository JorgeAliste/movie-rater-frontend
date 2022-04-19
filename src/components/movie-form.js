import React, {Fragment, useState, useEffect} from 'react';
import {API} from '../api-service';

function MovieForm(props) {
    const movie = props.movie
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();

    useEffect(() => {
        setTitle(movie.title)
        setDescription(movie.description)

    }, [movie])

    const updateClicked = () => {
        API.updateMovie(movie.id, {title, description})
            .then(resp => props.updatedMovie(resp))
            .catch(error => console.log(error));
    }

    const createClicked = () => {
        API.createMovie({title, description})
            .then(resp => props.movieCreated(resp))
            .catch(error => console.log(error));
    }

    return (
        <Fragment>
            {
                movie ? <div>
                    <label htmlFor="title">Title</label><br/>
                    <input id="title" type="text" placeholder="Movie title" value={title}
                           onChange={evt => setTitle(evt.target.value)}/><br/>
                    <label htmlFor="description">Description</label><br/>
                    <textarea id="description" type="text" placeholder="Movie description"
                              value={description}
                              onChange={evt => setDescription(evt.target.value)}/><br/>
                    {movie.id ? <button onClick={updateClicked}>Update movie</button> :
                        <button onClick={createClicked}>Create movie</button>}

                </div> : null
            }
        </Fragment>

    )
}

export default MovieForm;