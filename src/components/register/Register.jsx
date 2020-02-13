import React, { useState, useEffect } from 'react';
import { regexpName, regexpPass } from '../../actions/types';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../../actions/registerAction';
import TextFieldGroup from '../common/TextFieldGroup';

import './Register.scss';
const Register = (props) => {

    const error = useSelector(state => state.errorsReducer);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    })
    const [validName, setValidName] = useState('');
    const [validEmail, setValidEmail] = useState('');
    const [validPass, setValidPass] = useState('');
    const [validpassword2, setValidrpassword2] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);



    useEffect(() => {
        checkDisable();
        return () => {
            console.log("cleanup");
        };
    }, [formData.name, formData.email, formData.password, formData.password2])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const checkDisable = () => {
        if (formData.email && formData.name && formData.password && formData.password2) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        var validName = regexpName.test(formData.name);
        var validPass = regexpPass.test(formData.password);
        if (validName && validPass && formData.password === formData.password2) {
            dispatch(register(formData, props.history));
        } else {
            if (!validName) {
                setValidName("The name does not include spaces and special characters!")
            } else {
                setValidName('');
            }
            if (!validPass) {
                setValidPass("Password must be at least 6 characters");
            } else {
                setValidPass('')
            }
            if (formData.password !== formData.password2) {
                setValidrpassword2("Passwords must match")
            } else {
                setValidrpassword2('');
            }
        }

    }
    return (
        <div className="d-container">
            <h1>Sign Up</h1>
            <p>Create your DevConnector account</p>
            <form onSubmit={handleSubmit}>
                <TextFieldGroup error={validName} type="text" value={formData.name} placeholder="name" onChange={handleChange} name="name" />
                <TextFieldGroup error={error.email ? error.email : validEmail} info="This site uses Gravatar so if you want a profile image, use a Gravatar email" value={formData.email} type="email" placeholder="email" onChange={handleChange} name="email" />
                <TextFieldGroup error={validPass} type="password" value={formData.password} placeholder="password" onChange={handleChange} name="password" />
                <TextFieldGroup error={validpassword2} type="password" value={formData.password2} placeholder="confirm password" onChange={handleChange} name="password2" />
                <div className="form-group">
                    <button className="btn btn-info btn-block  " disabled={isDisabled}>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Register
