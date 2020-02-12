import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from "prop-types";
import { useSelector } from 'react-redux';
const PrivateRoute = ({ component: Component, ...rest }) => {


    const auth = useSelector(state => state.authReducer.isAuthenticated)
    return (
        <Route {...rest} render={props => auth ? <Component {...props} /> :
            <Redirect to={
                {
                    pathname: "/",
                    state: {
                        from: props.location
                    }
                }
            } />} />
    )
}

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

export default PrivateRoute
