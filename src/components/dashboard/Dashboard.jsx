import React, { useEffect } from 'react';

import { withRouter, Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { ToastContainer } from 'react-toastify';
import { getProfileUser, deleteAccount, clearProfile } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Experience from '../experiences/Experience';
import Education from '../educations/Education';
import { isLoading } from "../../actions/loadingAction";

const Dashboard = (props) => {

    const currentUser = useSelector(state => state.authReducer.currentUser);
    const isAuth = useSelector(state => state.authReducer.isAuthenticated);
    const _isLoading = useSelector(state => state.loadingReducer.isLoading);
    const profile = useSelector(state => state.userReducer.profile);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(isLoading(true))
        dispatch(getProfileUser());
        return () => { };
    }, [])

    const handleDeleteACC = () => {
        dispatch(deleteAccount());
    }
    const handleCreate = () => {
        dispatch(clearProfile());
        props.history.push("/create-profile");
    }
    return (
        <div className="py-5">
            {!isAuth ? <Redirect to="/login" /> :
                <>
                    {_isLoading ?
                        <div className="isLoading">
                            <Loader
                                type="BallTriangle"
                                color="#00BFFF"
                                height={100}
                                width={100}
                            />
                        </div>
                        :
                        <div className="container">
                            <h1>Dashboard</h1>
                            {profile ?
                                <>
                                    {currentUser && <p className="lead text-muted">Wellcome <Link to={`/profile/${profile.handle}`}>{currentUser.name}</Link> </p>}
                                    <div>

                                        <div className="btn-group mb-4" role="group">
                                            <Link className="btn btn-light" to="/edit-profile"><i className="fa fa-user-circle text-info mr-1"></i>  Edit Profile</Link>
                                            <Link className="btn btn-light" to="/add-experience"><i className="fa fa-user-tie text-info mr-1"></i> Add Experience</Link>
                                            <Link className="btn btn-light" to="/add-education"><i className="fa fa-graduation-cap text-info mr-1"></i>Add Education</Link>
                                        </div>
                                    </div>
                                    <div>
                                        <Experience experience={profile.experience} />
                                        <Education education={profile.education} />
                                    </div>

                                    <button className="btn btn-danger mt-3" onClick={handleDeleteACC}>Delete Your Account</button>
                                </>
                                :
                                <>
                                    {currentUser && <p className="lead text-muted">Wellcome {currentUser.name} </p>}
                                    <p>You have not yet setup a profile, please add some info</p>
                                    <button className="btn btn-info" onClick={handleCreate}>Create Profile</button>

                                </>
                            }
                        </div>
                    }
                </>
            }
            <ToastContainer />
        </div>
    )
}

export default withRouter(Dashboard)
