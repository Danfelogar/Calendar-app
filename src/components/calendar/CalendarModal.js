import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

import { uiCloseModal } from '../../actions/ui';
import { eventClearActiveEvent, eventStartAddNew, eventStartUpdated } from '../../actions/events';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
Modal.setAppElement('#root');

const now= moment().minutes(0).second(0).add(1,'hours');//11:33

const nowPlus1 = now.clone().add(1, 'hours');


const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowPlus1.toDate()
}

export const CalendarModal = () => {

    const { modalOpen } = useSelector(state => state.ui);
    const { activeEvent } = useSelector(state => state.calendar);

    const dispatch = useDispatch();

    const [dateStart, setDateStart] = useState(  now.toDate() );

    const [dateEnd, setDateEnd] = useState(  nowPlus1.toDate()  );

    const [titleValid, setTitleValid] = useState(true);

    const [formValues, setFormValues] = useState( initEvent );//ponemos initEvent por fuera como constant para que no se este dibujando constantemente

    const { notes, title, start, end } = formValues;

    useEffect(() => {
        if ( activeEvent ) {
            setFormValues( activeEvent );
        }else{
            setFormValues( initEvent );
        }//con esto me quito la nota borrada del activeEvent en caso sea borrada al undir solo un click
    }, [activeEvent])

    const handleInputChange = ({ target }) =>{

        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const handleStartDateChange = ( e ) =>{
        setDateStart( e );
        setFormValues({
            ...formValues,
            start: e
        })
    }

    const handleEndDateChange = ( e ) =>{
        setDateEnd( e );
        setFormValues({
            ...formValues,
            end: e
        })
    }

    const  handleSubmitForm = (e) =>{
        e.preventDefault();

        const momentStart = moment( start );
        const momentEnd = moment( end );
        //validacion para que no coincidan horas
        if ( momentStart.isSameOrAfter( momentEnd ) ){
            return Swal.fire('Error','The end date must be greater than the start date', 'error');
        }//validacion para tener un titulo
        if(title.trim().length < 2){
            return setTitleValid(false);

        }

        if( activeEvent ) {
            dispatch( eventStartUpdated(formValues) );
            //si selecciono una carta  con activeEvent retorname de nuevo el formulario para cambiarlo
        }else{
            dispatch(eventStartAddNew( formValues ));
            // de lo contrario creame una accion nueva
        }


        setTitleValid(true);
        closeModal();
    }

    const closeModal = () =>{
        // console.log('cerrar modal');
        dispatch( uiCloseModal() );
        setFormValues( initEvent );
        dispatch( eventClearActiveEvent() );
    }

    return (
        <Modal
        isOpen={ modalOpen }
        // onAfterOpen={ afterOpenModal }
        onRequestClose={ closeModal }
        style={ customStyles }
        closeTimeoutMS={ 200 }
        className="modal"
        overlayClassName="modal-fondo"
        >
            <h1>{ (activeEvent) ? 'Edit event' : 'New event' }</h1>
            <hr />
            <form
            className="container"
            onSubmit={ handleSubmitForm }
            >

                <div className="form-group">
                    <label>Start date and time</label>
                    <DateTimePicker
                    onChange={ handleStartDateChange }
                    value={ dateStart }
                    className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>End date and time</label>
                    <DateTimePicker
                    onChange={ handleEndDateChange }
                    value={ dateEnd }
                    minDate={ dateStart }
                    className="form-control"
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Title and notes</label>
                    <input
                        type="text"
                        className={`form-control  ${ !titleValid && 'is-invalid' }`}
                        placeholder="Event title"
                        name="title"
                        autoComplete="off"
                        value={ title }
                        onChange={ handleInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">A short description</small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notes"
                        rows="5"
                        name="notes"
                        value={ notes }
                        onChange={ handleInputChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Additional Information</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Save </span>
                </button>

            </form>
        </Modal>
    )
}
