import React, {useState, useEffect} from 'react'
import {API} from '../api-service'
import {useCookies} from "react-cookie";

function Auth() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [token, setToken] = useCookies(['mr-token'])

    useEffect(() => {
            if (token['mr-token']) window.location.href = '/movies'
        },
        [token])

    const loginClicked = () => {
        API.loginUser({username, password})
            .then(resp => setToken('mr-token', resp.token))
            .catch(error => console.log(error))
    }

    return (
        <div>
            {/*<form>*/}
                <label htmlFor="username">username</label><br/>
                <input id="username" type="text" placeholder="username" value={username}
                       onChange={evt => setUsername(evt.target.value)}/><br/>
                <label htmlFor="password">Password</label><br/>
                <input id="password" type="password" placeholder="Password"
                       value={password}
                       onChange={evt => setPassword(evt.target.value)} autoComplete="on"/><br/>
                <button onClick={loginClicked}>Login</button>
            {/*</form>*/}
        </div>
    )
}

export default Auth;