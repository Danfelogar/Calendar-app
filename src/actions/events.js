import Swal from "sweetalert2";
import { fetchWithToken } from "../components/helpers/fetch";
import { prepareEvents } from "../components/helpers/prepareEvents";
import { types } from "../types/types";

export const eventStartAddNew = (event) => {
    return async(dispatch, getState) => {

        const { uid, name } = getState().auth;//otra forma de optener el state

        try {
            const resp = await fetchWithToken('events', event, 'POST');
            //primero va la direccion de ruta o el path, luego el payload y de ultimo el tipo de accion a realizar
            const body = await resp.json();

            if(body.ok) {
                event.id = body.event.id;
                event.user = {
                    _id: uid,
                    name: name
                }
                console.log(event)
                dispatch(eventAddNew( event ));
            }
        }catch(error){
            console.log(error)
        }
    }
}


const eventAddNew = (event) =>({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = (event) =>({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActiveEvent = () =>({ type: types.eventClearActiveEvent });

export const eventStartUpdated = (event) =>{
    return async(dispatch) =>{
        try {
            const resp = await fetchWithToken( `events/${ event.id }`, event, 'PUT' );
            const body  = await resp.json();

            if( body.ok ) {
                dispatch( eventUpdated( event ) );
            }else{
                Swal.fire('Error', body.msg, 'error');
            }
        } catch (error) {
            console.log(error)
        }
    }
}

const eventUpdated = (event) =>({
    type: types.eventUpdated,
    payload: event
})

export const eventStartDeleted = () =>{
    //el event no se puede tomar de las variables porque el boton propiamente del evento no la necesita para foncionar necesita es la caja o  nota a la que apunta en ese momento
    return async ( dispatch, getState ) => {

        const { id } = getState().calendar.activeEvent;

        try {
            const resp = await fetchWithToken( `events/${ id }`, {}, 'DELETE' );
            const body  = await resp.json();

            if( body.ok ) {
                dispatch( eventDeleted() );
            }else{
                Swal.fire('Error', body.msg, 'error');
            }
        } catch (error) {
            console.log(error)
        }
    }
}

const eventDeleted = () =>({ type: types.eventDeleted })

export const eventStartLoading = () =>{
    return async(dispatch) =>{

        try {
            const resp = await fetchWithToken('events');
            const body = await resp.json();

            const events = prepareEvents(body.events);

            dispatch( eventLoaded( events ) );

        } catch (error) {
            console.log(error);
        }

    }
}

const eventLoaded = (events) =>({
    type: types.eventLoaded,
    payload: events
})

export const eventLogout = () =>({type: types.eventLogout});