import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaGroup from "../common/TextAreaGroup";
import { addExperience } from "../../actions/userActions";

const ExperienceForm = (props) => {
    const [formData, setFormData] = useState({
        company: "",
        title: "",
        location: "",
        from: "",
        to: "",
        current: false,
        description: ""
    });
    // const [errors, setErrors] = useState({
    //     company: "",
    //     title: "",
    //     from: "",
    //     to: "",
    // });
    const [invalidCompany, setInvalidCompany] = useState('');
    const [invalidTitle, setInvalidTitle] = useState('');
    const [invalidFrom, setInvalidFrom] = useState('');
    const [invalidTo, setInvalidTo] = useState('');


    const isAuth = useSelector(state => state.authReducer.isAuthenticated);
    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
            // cleanup
        };
    }, [])

    const Back = () => {
        props.history.goBack();
    }
    const resetForm = () => {
        setFormData({
            company: "",
            title: "",
            location: "",
            from: "",
            to: "",
            current: false,
            description: ""
        })

    }
    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleCheck = e => {
        setFormData({ ...formData, current: e.target.checked })
    }
    const handleSubmit = e => {
        e.preventDefault();
        if (formData.company && formData.title && formData.from && formData.to) {
            dispatch(addExperience(formData));
            resetForm();
            props.history.push("/dashboard")
        } else {
            if (!formData.company) {
                setInvalidCompany("Company field is required");
            } else {
                setInvalidCompany("");
            }
            if (!formData.title) {
                setInvalidTitle("Title field is required")
            } else {
                setInvalidTitle("")
            }
            if (!formData.from) {
                setInvalidFrom("From date field is required")
            } else {
                setInvalidFrom("")
            }
            if (!formData.to) {
                setInvalidTo("To date field is required")
            } else {
                setInvalidTo("")
            }
        }

    }
    return (
        <>
            {!isAuth ? <Redirect to="/login" />
                :
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8 m-auto">
                            <button onClick={Back} className="btn btn-light my-3">Go Back </button>
                            <h1 className="display-4 text-center">Add Experience</h1>
                            <p className="lead text-center">Add any job or position that you have had in the past or current</p>
                            <form className="form" onSubmit={handleSubmit}>
                                <TextFieldGroup error={!invalidCompany ? '' : invalidCompany} info="(*) Company" value={formData.company} placeholder="* Company" onChange={handleChange} name="company" />
                                <TextFieldGroup error={!invalidTitle ? '' : invalidTitle} value={formData.title} info="(*) Job title" placeholder="* Job title" onChange={handleChange} name="title" />
                                <TextFieldGroup value={formData.location} info="City or city & state suggested (eg. Boston, MA)" placeholder="Location" onChange={handleChange} name="location" />
                                <TextFieldGroup error={!invalidFrom ? '' : invalidFrom} type="date" info="(*) date start" value={formData.from} onChange={handleChange} label="From Date" name="from" />
                                <TextFieldGroup error={!invalidTo ? '' : invalidTo} type="date" info="(*) date end game" value={formData.to} onChange={handleChange} name="to" label="From To" />
                                <div className="form-group">
                                    <input type="checkbox" id="current" name="current" onChange={handleCheck} className="mr-2" value={formData.current} />
                                    <label htmlFor="current">Current Job </label>
                                </div>
                                <TextAreaGroup name="description" value={formData.description} onChange={handleChange} rows="3" info="Tell us about the the position" placeholder="Job description" />
                                <div className="form-group">
                                    <button className="btn btn-info btn-block "  >Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </>
    )


}

export default ExperienceForm
