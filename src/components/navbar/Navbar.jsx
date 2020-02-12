import React from 'react';
import './Navbar.scss'
import { NavLink, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/loginAction';
const Navbar = (props) => {
    const user = useSelector(state => state.authReducer.currentUser)
    const isAuth = useSelector(state => state.authReducer.isAuthenticated);
    const dispatch = useDispatch();
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    }
    return (
        <header>

            <div className="container flex">
                <div className="home">
                    <NavLink to="/" exact> DevConnector</NavLink>
                    <NavLink to="/profiles" className="url-profile"> Developers</NavLink>
                </div>

                {!isAuth ?
                    <ul className="flex">
                        <li style={{ marginRight: "20px" }}>
                            <NavLink to="/signup"> Sign Up</NavLink>
                        </li>
                        <li>
                            {/* <a href="" onClick={redirectLogin}> Login</a> */}
                            <NavLink to="/login"> Login</NavLink>
                        </li>
                    </ul>
                    :
                    <ul className="flex">
                        <li style={{ marginRight: "20px" }}>
                            <NavLink to="/feeds"> Post Feed</NavLink>
                        </li>
                        <li style={{ marginRight: "20px" }}>
                            <NavLink to="/dashboard"> Dashboard</NavLink>
                        </li>
                        {user &&
                            <li>
                                <img src={user.avatar} />
                                <a href="" onClick={handleLogout}> Logout</a>
                            </li>
                        }

                    </ul>
                }

            </div>
        </header>

    )
}

export default withRouter(Navbar)
