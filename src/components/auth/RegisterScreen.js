import React from 'react';
import { Link } from "react-router-dom";

import  './RegisterScreen.css';

export const RegisterScreen = () => {
    return (
        <div>
            <div id="register">
            <form>
                <h1>Register</h1>
                <input type="text" placeholder="Username"/>
                <input type="email" placeholder="Email"/>
                <input type="password" placeholder="Password"/>
                <input type="password" placeholder="Repeat password"/>
                <button>Register</button>
                <h2>If you have already registered, go to <Link className="login-link" to="/login">sign in </Link></h2>
            </form>
        </div>
        </div>
    )
}
