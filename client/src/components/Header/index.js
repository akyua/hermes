import { useEffect, useState } from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';

function Header(){
    const [username, setUsername] = useState(null);

    useEffect(() => {
        fetch('http://localhost:4000/profile',{
            credentials: 'include'
        }).then(response => {
            response.json().then(userInfo => {
                setUsername(userInfo.username);
            })
        })
    }, []);
    return(
        <header>
            <a href="/" className="logo">Hermes</a>
            <nav>
                {username && (
                    <>
                    <Link to='/create'>Create new post</Link>
                    <a>Logout</a>
                    </>
                )}
                {!username && (
                    <>
                        <a href="/login">Login</a>
                        <a href="/register">Register</a>
                    </>
                )}
                
            </nav>
        </header>
    )
}

export default Header;