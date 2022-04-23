import {useState, useEffect} from "react";
import {API} from "../api-service";
import {useCookies} from "react-cookie";

function useFetch() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [token] = useCookies(['mr-token'])

    useEffect(
        () => {
            async function fetchData() {
                setLoading(true);
                setError(null);
                const data = await API.getMovies(token['mr-token'])
                    .catch(error => setError(error))
                setData(data);
                setLoading(false)
            }

            if ('mr-token' in token) {
                fetchData().catch(error => console.log(error));
            }

        }, [token]
    )

    return [data, loading, error]
}

export {useFetch}