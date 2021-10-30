import Swal from "sweetalert2";
import { fetchNotToken, fetchWithToken } from "../components/helpers/fetch";
import { types } from "../types/types";
import { eventLogout } from "./events";

export const startLogin = (email, password) =>{

    return async( dispatch ) =>{
        const resp = await fetchNotToken('auth', { email,password }, 'POST');

        const body = await resp.json();

        if( body.ok ){
            //grabamos en el localstorage
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        } else{
            Swal.fire('Error',  body.msg, 'error' );
        }
    }
}



export const startRegister = (email, password, name) =>{
    //recuerda si tiene dispatch como parametro es porque la accion a ejecutar es asincrona y nos ayudamos del thunk para llamarla
    return async ( dispatch ) =>{
        const resp = await fetchNotToken('auth/new', { email,password, name }, 'POST');

        const body = await resp.json();

        if( body.ok ){
            //grabamos en el localstorage
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        } else{
            Swal.fire('Error',  body.msg, 'error' );
        }
    }
}

export const startChecking = () =>{
    return async(dispatch)=>{
        const resp = await fetchWithToken('auth/renew');

        const body = await resp.json();

        if( body.ok ){
            //grabamos en el localstorage
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        } else{
            dispatch(checkingFinish());
        }

    }
}

const checkingFinish = () =>({type: types.authCheckingFinish});

const login = (user) => ({
    type: types.authLogin,
    payload: user
});

export const startLogout = () => {
    return ( dispatch ) => {
        localStorage.clear();
        // para borrar todo del localStorage
        dispatch(eventLogout());
        //para des seleccionar una nota a la hora de desloguearme
        dispatch( logout() );
    }
}

const logout = () => ({ type: types.authLogout })