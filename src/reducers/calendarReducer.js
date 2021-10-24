import moment from "moment";
import { types } from "../types/types";

const initialState = {
    events:[{
        id: new Date().getTime(),
        title: 'Cumpleaños de mi amorcito',
        start: moment().toDate(), //newDate
        end: moment().add(2, 'hours').toDate(),
        bgcolor: '#fafafa',
        notes: 'debo de darle una sorpresa',
        user:{
            _id: '123',
            name:'Daniel'
        }
    },
    ],
    activeEvent: null
};

export const calendarReducer = ( state = initialState, action) => {
    switch (action.type) {
        case types.eventSetActive:
            return{
                ...state,
                activeEvent: action.payload
            }
        case types.eventAddNew:
            return{
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]
            }
        case types.eventClearActiveEvent:
            return{
                ...state,
                activeEvent: null
            }
        case types.eventUpdated:
            return{
                ...state,
                events: state.events.map(
                    e => ( e.id === action.payload.id ) ? action.payload : e
                )
                //adentro tenemos un evento y si es igual al evento que quiero modificar me regresara el acti.pay y sino no existe el evento
            }
        default:
            return state;
    }
}