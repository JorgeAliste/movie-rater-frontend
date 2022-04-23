import React, {Fragment, useState, useEffect} from 'react';
import {API} from '../api-service';
import {useCookies} from "react-cookie";

function MovieForm(props) {
    const movie = props.movie
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [token] = useCookies(['mr-token'])

    const isDisabled = title.length === 0 || description.length === 0

    useEffect(() => {
        setTitle(movie.title)
        setDescription(movie.description)

    }, [movie])

    const updateClicked = () => {
        API.updateMovie(movie.id, {title, description}, token['mr-token'])
            .then(resp => props.updatedMovie(resp))
            .catch(error => console.log(error));
    }

    const createClicked = () => {
        API.createMovie({title, description}, token['mr-token'])
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
                    {movie.id ? <button onClick={updateClicked} disabled={isDisabled}>Update movie</button> :
                        <button onClick={createClicked} disabled={isDisabled}>Create movie</button>}

                </div> : null
            }
        </Fragment>

    )
}

export default MovieForm;