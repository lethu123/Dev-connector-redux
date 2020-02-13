import React from 'react'
import { Link, withRouter, Redirect } from 'react-router-dom';
import './Home.scss';
import { useSelector } from 'react-redux';

const Home = (props) => {
    const isAuth = useSelector(state => state.authReducer.isAuthenticated);
    return (
        <>
            {isAuth ? <Redirect push={true} to={{ pathname: "/dashboard", state: { from: props.location } }} /> :
                <section>
                    <div className="content">
                        <h1>Developer Connector</h1>
                        <p>Create a developer profile/portfolio, share posts and get help from other developers</p>
                        <div className="">
                            <button className="btn btn-lg btn-info mr-2"><Link to="/signup" className="text-white"> Sign Up</Link></button>
                            <button className="btn btn-lg btn-light"><Link to="/login" className="text-dark"> Login</Link></button>
                        </div>
                    </div>
                </section>
            }
        </>


    )
}

export default withRouter(Home)
