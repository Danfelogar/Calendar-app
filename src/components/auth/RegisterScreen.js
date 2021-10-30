import React from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { useForm } from '../../hooks/useForm';

import  './RegisterScreen.css';
import { startRegister } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();

    const [ formRegisterValues, handleRegisterInputChange ] = useForm({
        rName: 'Felipe',
        rEmail: 'Felipe@gmail.com',
        rPassword1: '123456',
        rPassword2: '123456'
    });

    const { rName ,rEmail, rPassword1, rPassword2 } = formRegisterValues;

    const handleRegister = ( e ) => {
        e.preventDefault();

        if ( rPassword1 !== rPassword2 ){
            return Swal.fire('Error', 'Passwords must be the same', 'error')
        }

        dispatch(startRegister( rEmail, rPassword1, rName ));
    }

    return (
        <div>
            <div id="register">
            <form onSubmit={ handleRegister }>
                <h1>Register</h1>
                <input
                type="text"
                placeholder="Username"
                name="rName"
                value={ rName }
                onChange={ handleRegisterInputChange }
                />
                <input
                type="email"
                placeholder="Email"
                name="rEmail"
                value={ rEmail }
                onChange={ handleRegisterInputChange }
                />
                <input
                type="password"
                placeholder="Password"
                name="rPassword1"
                value={ rPassword1 }
                onChange={ handleRegisterInputChange }
                />
                <input
                type="password"
                placeholder="Repeat password"
                name="rPassword2"
                value={ rPassword2 }
                onChange={ handleRegisterInputChange }
                />
                <button type="submit">Register</button>
                <h2>If you have already registered, go to <Link className="login-link" to="/login">sign in </Link></h2>
            </form>
        </div>
        </div>
    )
}
