import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
// import 'moment/locale/es';dias en español
import 'react-big-calendar/lib/css/react-big-calendar.css';

// import { messages } from '../helpers/calendar-message-español'; si quieres "traducir el calendario es con esto"

import { Navbar } from '../ui/Navbar';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';


// moment.locale('es');para cambiar el nombre de las fechas a español
const localizer = momentLocalizer(moment); //or globalizerlocalizer

const events =[
    {
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
];

export const CalendarScreen = () => {

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month' )

    const onDoubleClick = (e) => {
        console.log(e)
    }

    const onSelectEvent = (e) => {
        console.log(e)
    }

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView', e);
        //guardo info en el storage en este  caso dice guardame la ultima vista para cuando cargue la pag siempre este en lo ultimo que vi.
    }

    const eventStyleGetter = ( event, start, end, isSelected ) =>{
        // console.log(event, start, end, isSelected);

        const style = {
            backgroundColor: '#2b3c4c',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }

        return {
            style
        }
    };

    return (
        <div className="calendar-screen">
            <Navbar />

            <Calendar
                localizer={ localizer }
                events={ events }
                startAccessor="start"
                endAccessor="end"
                // messages={ messages }
                eventPropGetter={ eventStyleGetter }
                onDoubleClickEvent= { onDoubleClick }
                onSelectEvent= { onSelectEvent }
                onView= { onViewChange }
                view= { lastView }
                components={{
                    event: CalendarEvent
                }}
                />

                <CalendarModal />
        </div>
    )
}
