import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { startChecking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { LoadingScreen } from '../components/loading/LoadingScreen';
import { PrivateRouter } from './PrivateRouter';
import { PublicRouter } from './PublicRoute';


export const AppRouter = () => {

    const dispatch = useDispatch();

    const { checking, uid } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch]);

    if(checking) {
        return <LoadingScreen />
    }
    return (
        <div>
            <Router>
                <Switch>
                    <PublicRouter exact path="/login" component={ LoginScreen  }
                    isAuthenticated={ !!uid }
                    //con el doble admiracion significa pasar de string a buleano
                    />
                    <Route exact path="/register" component={ RegisterScreen } />
                    <PrivateRouter exact path="/" component={ CalendarScreen }
                    isAuthenticated={ !!uid }
                    //con el doble admiracion significa pasar de string a buleano
                    />
                    <Redirect to="/" />
                </Switch>
            </Router>
        </div>
    )

}
