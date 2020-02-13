import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../actions/loginAction';
import TextFieldGroup from '../common/TextFieldGroup';
import './Login.scss';
const Login = (props) => {
    const isAuth = useSelector(state => state.authReducer.isAuthenticated);
    const error = useSelector(state => state.errorsReducer);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [isDisabled, setIsDisabled] = useState(true);
    useEffect(() => {
        checkDisable();

        return () => { };
    }, [formData.email, formData.password])

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(formData, props.history));
    }

    const checkDisable = () => {
        if (formData.email && formData.password) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }

    return (
        <>
            {isAuth ? <Redirect to="/dashboard" /> :
                <div className="d-container">
                    <h1>Log In</h1>
                    <p>Sign in to your DevConnector account</p>
                    <form onSubmit={handleSubmit}>
                        <TextFieldGroup error={error.email} value={formData.email} type="email" placeholder="email address" onChange={handleChange} name="email" />
                        <TextFieldGroup error={error.password} value={formData.password} type="password" placeholder="password" onChange={handleChange} name="password" />
                        <div className="form-group">
                            <button className="btn btn-info btn-block flexbox" type="password" disabled={isDisabled}><div style={{ display: "inline" }} className="mr-4">Submit</div> </button>
                        </div>
                    </form>
                </div>
            }

        </>
    )
}

export default Login
