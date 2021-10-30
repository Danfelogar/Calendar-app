import React from 'react';
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom';

export const PublicRouter = ({
    isAuthenticated,
    component: Component,
    ...rest//con esto digo que el resto de componentes retornen aqui comoel path exact etc etc... con rest
}) => {


    return (
        <Route { ...rest }
            component={ (props) =>(
                (isAuthenticated)
                ?(<Redirect to="/" />)//mandalo a la app de anoticones
                :(<Component {...props} />)
            )}


        />
    )
}
//para condicionar
PublicRouter.prototype = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}