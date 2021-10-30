import moment from "moment";


export const prepareEvents = ( events = [] ) =>{
    //para pasar las fechas de string objetos tipo date
    return events.map(
        (e) =>({
            ...e,
            end: moment( e.end ).toDate(),
            start: moment( e.start ).toDate(),
        })
    );
}