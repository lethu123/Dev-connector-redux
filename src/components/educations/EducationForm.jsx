import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaGroup from "../common/TextAreaGroup";
import { addEducation } from "../../actions/userActions";

const EducationForm = (props) => {
    const [formData, setFormData] = useState({
        school: "",
        degree: "",
        fieldofstudy: "",
        from: "",
        to: "",
        current: false,
        description: ""

    });
    const [invalidSchool, setInvalidSchool] = useState('');
    const [invalidDegree, setInvalidDegree] = useState('');
    const [invalidStudy, setInvalidStudy] = useState('');
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
            school: "",
            degree: "",
            fieldofstudy: "",
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
        if (formData.school && formData.degree && formData.fieldofstudy && formData.from && formData.to) {
            dispatch(addEducation(formData));
            resetForm();
            props.history.push("/dashboard")
        } else {
            if (!formData.school) {
                setInvalidSchool("School field is required");
            } else {
                setInvalidSchool("");
            }
            if (!formData.degree) {
                setInvalidDegree("Degree field is required")
            } else {
                setInvalidDegree("")
            }
            if (!formData.fieldofstudy) {
                setInvalidStudy("Feil of study is required")
            } else {
                setInvalidStudy("")
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
                            <h1 className="display-4 text-center">Add Education</h1>
                            <p className="lead text-center">Add any school, bootcamp, etc that you have attended</p>
                            <form className="form" onSubmit={handleSubmit}>
                                <TextFieldGroup error={!invalidSchool ? '' : invalidSchool} info="(*) School" value={formData.school} placeholder="* School" onChange={handleChange} name="school" />
                                <TextFieldGroup error={!invalidDegree ? '' : invalidDegree} value={formData.degree} info="(*) Degree or Certification" placeholder="* Degree or Certification" onChange={handleChange} name="degree" />
                                <TextFieldGroup error={!invalidStudy ? '' : invalidStudy} value={formData.fieldofstudy} info="(*) Field of Study" placeholder="* Field of Study" onChange={handleChange} name="fieldofstudy" />
                                <TextFieldGroup error={!invalidFrom ? '' : invalidFrom} type="date" info="(*) date start" value={formData.from} onChange={handleChange} label="From Date" name="from" />
                                <TextFieldGroup error={!invalidTo ? '' : invalidTo} type="date" info="(*) date end game" value={formData.to} onChange={handleChange} name="to" label="From To" />
                                <div className="form-group">
                                    <input type="checkbox" id="current" name="current" onChange={handleCheck} className="mr-2" value={formData.current} />
                                    <label htmlFor="current">Current Job </label>
                                </div>
                                <TextAreaGroup name="description" value={formData.description} onChange={handleChange} rows="3" info="Tell us about the the program" placeholder="Program Description" />
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

export default EducationForm
