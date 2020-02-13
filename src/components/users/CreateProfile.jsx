import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { regexpName, status } from '../../actions/types';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectFieldGroup from '../common/SelectFeildGroup';
import InputGroup from '../common/InputGroup';
import { createProfile } from '../../actions/userActions';
import isEmpty from "../common/is-empty";
import { Redirect } from 'react-router-dom';


const CreateProfile = (props) => {
    const isAuth = useSelector(state => state.authReducer.isAuthenticated);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        handle: '',
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: ''
    })

    const [validHandle, setValidHandle] = useState('');
    const [validStatus, setValidStatus] = useState('');
    const [validSkills, setValidSkills] = useState('');
    const [active, setActive] = useState(false);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        var validHandle = regexpName.test(formData.handle);
        if (validHandle && formData.handle && formData.status !== "" && formData.skills) {
            dispatch(createProfile(formData));
            props.history.push("/dashboard");
        } else {
            if (!validHandle) {
                setValidHandle("The handle does not include spaces and special characters!")
            } else {
                setValidHandle('');
            }
            if (!formData.handle) {
                setValidHandle("The handle is require");
            } else {
                setValidHandle('')
            }
            if (!formData.status) {
                setValidStatus("Professional is require");
            } else {
                setValidStatus('')
            }
            if (!formData.skills) {
                setValidSkills("skill is require");
            } else {
                setValidSkills('')
            }

        }

    }

    const Back = () => {
        props.history.goBack();
    }

    const displaySocial = () => {
        setActive(!active);
    }

    return (
        <>
            {!isAuth ? <Redirect to="/login" /> :
                <div className="d-container">
                    <button onClick={Back} className="btn btn-light"> go back</button>
                    <h1 className="my-3">Create Profile</h1>

                    <form onSubmit={handleSubmit}>
                        <TextFieldGroup error={validHandle} info="(*) A unique handle for your profile URL. Your full name, company name, nickname" type="text" value={isEmpty(formData.handle) ? '' : formData.handle} placeholder="Profile Handle" onChange={handleChange} name="handle" />
                        <SelectFieldGroup error={validStatus} value={!formData.status ? '' : formData.status} info="(*) Give us an idea of where you are at in your career" option={status} name="status" onChange={handleChange} />
                        <TextFieldGroup type="text" value={!formData.company ? '' : formData.company} info="Could be your own company or one you work for" placeholder="Company" onChange={handleChange} name="company" />
                        <TextFieldGroup type="text" value={formData.website} info="Could be your own website or a company one" placeholder="Website" onChange={handleChange} name="website" />
                        <TextFieldGroup type="text" value={formData.location} info="City or city & state suggested (eg. Boston, MA)" placeholder="Location" onChange={handleChange} name="location" />
                        <TextFieldGroup error={validSkills} info="(*) Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)" value={formData.skills} type="text" placeholder="Skill" onChange={handleChange} name="skills" />
                        <TextFieldGroup type="text" value={formData.githubusername} info="If you want your latest repos and a Github link, include your username" placeholder="Github Username" onChange={handleChange} name="githubusername" />
                        <TextFieldGroup type="text" value={formData.bio} info="Tell us a little about yourself" placeholder="Short Bio" onChange={handleChange} name="bio" />
                        <div className="mb-3">
                            <button type="button" className="btn btn-light" onClick={displaySocial}>Add Social Network Links</button>
                            <span className="text-muted">Optional</span>
                        </div>
                        {active &&
                            <div  >
                                <InputGroup styleinput="input-group-prepend" icon="fa fa-twitter" value={formData.twitter} placeholder="Twitter Profile URL" onChange={handleChange} name="twitter" />
                                <InputGroup styleinput="input-group-prepend" icon="fa fa-facebook-square" value={formData.facebook} placeholder="Facebook Profile URL" onChange={handleChange} name="facebook" />
                                <InputGroup styleinput="input-group-prepend" icon="ffa fa-linkedin" value={formData.linkedin} placeholder="Linkedin Profile URL" onChange={handleChange} name="linkedin" />
                                <InputGroup styleinput="input-group-prepend" icon="fa fa-youtube" value={formData.youtube} placeholder="Youtube Profile URL" onChange={handleChange} name="youtube" />
                                <InputGroup styleinput="input-group-prepend" icon="fa fa-instagram" value={formData.instagram} placeholder="Instagram Profile URL" onChange={handleChange} name="instagram" />

                            </div>
                        }
                        <div className="form-group">
                            <button className="btn btn-info btn-block " >Submit</button>
                        </div>
                    </form>


                </div >
            }
        </>

    )
}

export default CreateProfile
