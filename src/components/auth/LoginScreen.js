import React from 'react';
import { Link } from "react-router-dom";

import  './LoginScreen.css';

export const LoginScreen = () => {
    return (
        <div id="login">
            <form>
                <h1>Sign In</h1>
                <input type="text" placeholder="Username"/>
                <input type="password" placeholder="Password"/>
                <button>Sign in</button>
                <h2>If you don't have an account please <Link className="login-link" to="/register">register here</Link></h2>
            </form>
        </div>
    )
}
