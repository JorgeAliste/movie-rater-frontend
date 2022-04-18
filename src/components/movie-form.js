import React, {Fragment, useState} from 'react'

function MovieForm(props) {
    const movie = props.movie
    const [title, setTitle] = useState(movie.title);
    const [description, setDescription] = useState(movie.description);
    
    const updateClicked = () => {
        console.log("UPDATE")
    }

    return (
        <Fragment>
            {
                movie ? <div>
                    <label htmlFor="title">Title</label><br/>
                    <input id="title" type="text" placeholder="Movie title" value={title.toString()}
                           onChange={evt => setTitle(evt.target.value)}/><br/>
                    <label htmlFor="description">Description</label><br/>
                    <textarea id="description" type="text" placeholder="Movie description" value={description.toString()}
                              onChange={evt => setTitle(evt.target.value)}/><br/>
                    <button onClick={updateClicked}>Update movie</button>
                </div> : null
            }
        </Fragment>

    )
}

export default MovieForm;