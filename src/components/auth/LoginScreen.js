import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { startLogin } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

import  './LoginScreen.css';

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [ formLoginValues, handleLoginInputChange ] = useForm({
        lEmail: 'daniel@gmail.com',
        lPassword: '123456'
    });

    const { lEmail,  lPassword } = formLoginValues;

    const handleLogin = ( e ) => {
        e.preventDefault();

        dispatch(startLogin( lEmail, lPassword ));
    }

    return (
        <div id="login">
            <form onSubmit={ handleLogin } >
                <h1>Sign In</h1>
                <input
                type="text"
                placeholder="Username"
                name="lEmail"
                value={ lEmail }
                onChange={ handleLoginInputChange }
                />
                <input
                type="password"
                placeholder="Password"
                name="lPassword"
                value={ lPassword }
                onChange={ handleLoginInputChange }
                />
                <button type="submit">Sign in</button>
                <h2>If you don't have an account please <Link className="login-link" to="/register">register here</Link></h2>
            </form>
        </div>
    )
}
