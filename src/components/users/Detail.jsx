import React, { useEffect } from 'react';
import './User.scss';
import { getDetailUser } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { Redirect } from 'react-router-dom';
import Moment from 'react-moment';

import { withRouter } from 'react-router-dom';
import isEmpty from "../common/is-empty";

const Detail = (props) => {
    const isAuth = useSelector(state => state.authReducer.isAuthenticated);
    const _isLoading = useSelector(state => state.loadingReducer.isLoading);
    const dataUser = useSelector(state => state.userReducer.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetailUser(props.match.params.handle));
        return () => {
            // cleanup
        };
    }, [])

    const Back = () => {
        props.history.goBack();
    }

    return (

        <>
            {_isLoading ?
                <div className="isLoading">
                    <Loader
                        type="BallTriangle"
                        color="#00BFFF"
                        height={80}
                        width={80}
                    />
                </div>
                :
                <>
                    {!isAuth ? <Redirect to="/login" /> :
                        <>
                            {dataUser !== null ?
                                <div className="container">
                                    <button onClick={Back} className="btn btn-light my-3"> Back To Profiles</button>
                                    <div className="card bg-info">
                                        <div className="row">
                                            <div className="col-sm-3  mx-auto py-3">
                                                <img src={dataUser.user.avatar} alt="" style={{ borderRadius: "50%", width: "100%", height: "100%" }} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12 text-center text-white">
                                                <h1 className="display-4">{dataUser.handle}</h1>
                                                <p className="lead">{dataUser.status} at {isEmpty(dataUser.company) ? null : dataUser.company}</p>
                                                <p>{dataUser.location}</p>
                                                <p style={{ fontSize: "2.5rem" }}>
                                                    <span>
                                                        {isEmpty(dataUser.website) ? null :
                                                            <a className="text-white " href={dataUser.website} target="_blank" rel="noopener noreferrer"><i className="fa fa-globe"></i></a>
                                                        }
                                                        {/* <Link className="text-white " to={dataUser.website} ><i className="fa fa-globe"></i></Link>} */}
                                                    </span>
                                                    {dataUser.social &&
                                                        <>

                                                            <span className="ml-3">
                                                                {isEmpty(dataUser.social.twitter) ? null :
                                                                    <a className="text-white " href={dataUser.social.twitter} target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter"></i></a>
                                                                }
                                                            </span>
                                                            <span className="ml-3">
                                                                {isEmpty(dataUser.social.facebook) ? null :
                                                                    <a className="text-white " href={dataUser.social.facebook} target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook-square"></i></a>
                                                                }
                                                            </span>
                                                            <span className="ml-3">

                                                                {isEmpty(dataUser.social.linkedin) ? null :
                                                                    <a className="text-white " href={dataUser.social.linkedin} target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin"></i></a>
                                                                }
                                                            </span>
                                                            <span className="ml-3">
                                                                {isEmpty(dataUser.social.youtube) ? null :
                                                                    <a className="text-white " href={dataUser.social.youtube} target="_blank" rel="noopener noreferrer"><i className="fa fa-youtube"></i></a>
                                                                }
                                                            </span>
                                                            <span className="ml-3">
                                                                {isEmpty(dataUser.social.instagram) ? null :
                                                                    <a className="text-white " href={dataUser.social.instagram} target="_blank" rel="noopener noreferrer"><i className="fa fa-instagram"></i></a>
                                                                }
                                                            </span>


                                                        </>
                                                    }

                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card mt-4 p-4 bg-light">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <h4 className="text-center text-info ">{!isEmpty(dataUser.bio) ? dataUser.bio : dataUser.handle}'s BIO</h4>
                                                {!isEmpty(dataUser.bio) ?
                                                    <p className="lead">{dataUser.bio}</p>
                                                    :
                                                    <p className="lead">{dataUser.handle} does not have a bio</p>
                                                }
                                            </div>
                                            <hr className="m-auto" width="97%" />
                                            <div className="col-sm-12 ">
                                                <h4 className="text-center text-info ">Skill Set</h4>
                                                <ul className="pl-0 lead">
                                                    {dataUser.skills.map((skill, index) => (
                                                        <li key={index} className="d-inline mr-3"><span><i className="fa fa-check"></i></span> {skill}</li>
                                                    ))}
                                                </ul>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="row my-3">
                                        <div className="col-sm-12 col-md-6">
                                            <h3 className="text-center text-info">Experience</h3>
                                            {dataUser.experience.length !== 0 ?
                                                <ul className="list-group ">
                                                    {dataUser.experience.map((exp, index) => (
                                                        <li className="list-group-item " key={index}>
                                                            <h4>{exp.company}</h4>
                                                            <p>
                                                                <Moment format="YYYY/MM/DD">
                                                                    {exp.from}
                                                                </Moment> -
                                                                        <Moment format="YYYY/MM/DD">
                                                                    {exp.to}
                                                                </Moment>
                                                            </p>
                                                            <p> <strong>Position:</strong>  {exp.title}</p>
                                                            <p> <strong>Location:</strong>  {exp.location}</p>
                                                            <p> <strong>Description:</strong> {exp.description}</p>
                                                        </li>
                                                    ))}

                                                </ul>

                                                : <p className="text-center">No Experience Listed</p>
                                            }
                                        </div>
                                        <div className="col-sm-12 col-md-6">
                                            <h3 className="text-center text-info">Education</h3>
                                            {dataUser.education.length !== 0 ?
                                                <ul className="list-group">
                                                    {dataUser.education.map((edu, index) => (
                                                        <li className="list-group-item" key={index}>
                                                            <h4>{edu.school}</h4>
                                                            <p>
                                                                <Moment format="YYYY/MM/DD">
                                                                    {edu.from}
                                                                </Moment> -
                                                                        <Moment format="YYYY/MM/DD">
                                                                    {edu.to}
                                                                </Moment>
                                                            </p>
                                                            <p> <strong>Degree:</strong>  {edu.degree}</p>
                                                            <p> <strong>Field Study:</strong>  {edu.fieldofstudy}</p>
                                                            <p> <strong>Description:</strong> {edu.description}</p>
                                                        </li>
                                                    ))}

                                                </ul>

                                                : <p className="text-center">No Education Listed</p>
                                            }
                                        </div>
                                    </div>
                                    <hr className="m-auto" width="100%" />
                                    <div className="row mt-2">
                                        <div className="col-sm-12">
                                            <h3 className="mb-4">Latest Github Repos</h3>
                                        </div>
                                    </div>
                                </div>
                                : ''}

                        </>
                    }


                </>
            }

        </>

    )
}

export default withRouter(Detail)
