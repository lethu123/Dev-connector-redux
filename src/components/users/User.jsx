import React, { useEffect } from 'react'
import './User.scss'
import { useSelector, useDispatch } from 'react-redux';
import { loadUsers } from '../../actions/userActions';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner'
const User = () => {
    const isLoading = useSelector(state => state.loadingReducer.isLoading);
    const listUser = useSelector(state => state.userReducer.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUsers());
        return () => {
            // cleanup
        };
    }, [])

    return (
        <>
            {isLoading ?
                <div className="isLoading">
                    <Loader
                        type="BallTriangle"
                        color="#00BFFF"
                        height={80}
                        width={80}
                    />
                </div>

                :
                <div className="container py-5">
                    <h1 className="display-4 text-center">Developer Profiles</h1>
                    <p className="lead text-center">Browse and connect with developers</p>
                    <div >
                        {listUser && listUser.map((user, index) => (
                            <div key={index} className="card my-3" >
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-2 avatar">
                                            <img className="card-img-top" src={user.user.avatar} alt="Card image" style={{ width: "100%" }} />
                                        </div>
                                        <div className="col-sm-6">
                                            <h3 className="card-title">{user.user.name}</h3>
                                            <p>{user.status} at {user.company}</p>
                                            <p>{user.location}</p>
                                            <Link className="btn btn-info" to={`/profile/${user.handle}`}>View Profile</Link>
                                        </div>
                                        <div className="col-sm-4 info">
                                            <h4 className="card-text">Skill Set</h4>
                                            {user.skills.map((skill, index) => (
                                                <ul key={index}>
                                                    <li><span><i className="fa fa-check"></i></span> {skill}</li>
                                                </ul>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            }

        </>

    )
}

export default User
