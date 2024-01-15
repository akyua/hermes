import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

export default function Login() {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUserInfo} = useContext(UserContext);

    async function login(ev){
        ev.preventDefault();
        const response = await fetch(`${apiUrl}/login`, {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });
        if(response.ok){
            response.json().then(userInfo => {
                setUserInfo(userInfo);
                setRedirect(true);
            })
        }else {
            alert("Wrong Credentials")
        }
    }

    if(redirect){
        return <Navigate to={'/'}/>
    }
    return(
        <form className="login" onSubmit={login}>
            <h1>Login</h1>
            <input type="text" placeholder="username" 
            value={username} 
            onChange={ev => setUsername(ev.target.value)}></input>
            <input type="password" placeholder="password" 
            value={password} 
            onChange={ev => setPassword(ev.target.value)}></input>
            <button>Login</button>
        </form>

    );
}