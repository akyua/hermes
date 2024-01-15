import {useState} from 'react';

export default function RegisterComponent(){
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
   async function register(ev){
        ev.preventDefault();
        const response = await fetch(`${apiUrl}/register`, {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type':'application/json'},
        })
        if(response.status === 200){
            alert("Registration Successful")
        } else{
            alert("Register Failed")
        }
    }
    return(
        <form className="register" onSubmit={register}>
            <h1>Register</h1>
            <input type="text" placeholder="username" value={username} onChange={ev => setUsername(ev.target.value)}/>
            <input type="password" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)}/>
            <button>Register</button>
        </form>
    )
}