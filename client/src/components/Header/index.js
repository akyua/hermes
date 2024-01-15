import { useContext, useEffect, useState } from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import { UserContext } from '../../UserContext';

function Header(){
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';
    const {setUserInfo, userInfo} = useContext(UserContext);
    useEffect(() => {
        fetch(`${apiUrl}/profile`,{
            credentials: 'include'
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
            })
        })
    }, []);

    function logout(){
        fetch(`${apiUrl}/logout`,{
            credentials: 'include',
            method: 'POST',
        });
        setUserInfo(null);
    }    

    const username = userInfo?.username;
    return(
        <header>
            <a href="/" className="logo">Hermes</a>
            <nav>
                {username && (
                    <>
                        <Link to='/create'>Create new post</Link>
                        <a onClick={logout}>Logout</a>
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