import React, {Fragment, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro'

function MovieDetails(props) {

    const movie = props.movie

    const [highlighted, setHighlighted] = useState(0);

    const highlightRate = high => evt => {
        setHighlighted(high)
    }

    const rateOnClick = rate => evt => {
        fetch(`http://127.0.0.1:8000/movierater/movies/${movie.id}/rate_movie/`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json', 'Authorization': 'Token '
            }, body: JSON.stringify({score: rate})
        }).then(() => getDetails())
            .catch(error => console.log(error))


    }

    const getDetails = () => {
        fetch(`http://127.0.0.1:8000/movierater/movies/${movie.id}/`, {
            method: 'GET', headers: {
                'Content-Type': 'application/json', 'Authorization': 'Token fb4da56aa72ef3190594b82d365287a53774f59f'
            }
        }).then(resp => resp.json())
            .then(resp => props.updateMovie(resp))
            .catch(error => console.log(error))
    }

    return (
        <div>
            {movie ?
                <Fragment>
                    <h1>{movie.title}</h1>
                    <h2>{movie.description}</h2>
                    <FontAwesomeIcon icon={solid('star')} className={movie.avg_rating > 0 ? "orange-star" : ''}/>
                    <FontAwesomeIcon icon={solid('star')} className={movie.avg_rating > 1 ? "orange-star" : ''}/>
                    <FontAwesomeIcon icon={solid('star')} className={movie.avg_rating > 2 ? "orange-star" : ''}/>
                    <FontAwesomeIcon icon={solid('star')} className={movie.avg_rating > 3 ? "orange-star" : ''}/>
                    <FontAwesomeIcon icon={solid('star')} className={movie.avg_rating > 4 ? "orange-star" : ''}/>
                    ({movie.number_of_ratings})

                    <div className="rate-container">
                        <h3>Rate it</h3>
                        {[...Array(5)].map((e, i) => {
                            return <FontAwesomeIcon key={"star_" + i} icon={solid('star')}
                                                    className={highlighted > i ? "purple-star" : ''}
                                                    onMouseEnter={highlightRate(i + 1)} onMouseLeave={highlightRate(0)}
                                                    onClick={rateOnClick(i + 1)}/>
                        })

                        }
                    </div>
                </Fragment>
                : <h1> Select a movie to see the details</h1>
            }
        </div>
    )
}

export default MovieDetails