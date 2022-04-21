export class API {

    static loginUser(body) {
        return fetch(`http://127.0.0.1:8000/auth/`, {
                method: 'POST', headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify(body)
            }
        ).then(resp => resp.json())
    }

    static updateMovie(movie_id, body, token) {
        return fetch(`http://127.0.0.1:8000/movierater/movies/${movie_id}/`, {
                method: 'PUT', headers: {
                    'Content-Type': 'application/json', 'Authorization': `Token ${token}`
                }, body: JSON.stringify(body)
            }
        ).then(resp => resp.json())
    }

    static createMovie(body, token) {
        return fetch(`http://127.0.0.1:8000/movierater/movies/`, {
                method: 'POST', headers: {
                    'Content-Type': 'application/json', 'Authorization': `Token ${token}`
                }, body: JSON.stringify(body)
            }
        ).then(resp => resp.json())
    }

    static deleteMovie(movie_id, token) {
        return fetch(`http://127.0.0.1:8000/movierater/movies/${movie_id}/`, {
                method: 'DELETE', headers: {
                    'Content-Type': 'application/json', 'Authorization': `Token ${token}`
                }
            }
        )
    }

    static registerUser(body) {
        return fetch(`http://127.0.0.1:8000/movierater/users/`, {
                method: 'POST', headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify(body)
            }
        ).then(resp => resp.json())
    }
}