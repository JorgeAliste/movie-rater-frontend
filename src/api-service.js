const TOKEN = "fb4da56aa72ef3190594b82d365287a53774f59f"

export class API {
    static updateMovie(movie_id, body) {
        return fetch(`http://127.0.0.1:8000/movierater/movies/${movie_id}/`, {
                method: 'PUT', headers: {
                    'Content-Type': 'application/json', 'Authorization': `Token ${TOKEN}`
                }, body: JSON.stringify(body)
            }
        ).then(resp => resp.json())
    }
}