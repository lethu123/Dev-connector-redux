import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loadPosts, postFeed } from '../../actions/postsAction';
import { isLoading } from '../../actions/loadingAction';
import { ToastContainer } from 'react-toastify';

import TextAreaGroup from "../common/TextAreaGroup";
import Feeds from './Feeds';

const Feed = () => {
    const [text, setText] = useState('');
    const [errorCMT, setErrorCMT] = useState('');
    const isAuth = useSelector(state => state.authReducer.isAuthenticated);
    const _isLoading = useSelector(state => state.loadingReducer.isLoading);
    const listPost = useSelector(state => state.postsReducer.data);
    const errors = useSelector(state => state.errorsReducer);
    const user = useSelector(state => state.authReducer.currentUser);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(isLoading(true))
        dispatch(loadPosts());
        return () => { };
    }, [])



    const handleChange = (e) => {
        setText(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        if (text.length > 10 && text.length < 300) {
            setErrorCMT("");
            let commentData = {
                text: text,
                name: user.name,
                avatar: user.avatar
            }
            dispatch(postFeed(commentData));
            setText('');
        } else {
            setErrorCMT("Post must be between 10 and 300 characters!");

        }
    }



    return (
        <>
            {!isAuth ? <Redirect to="/login" /> :
                <>

                    <div className="container py-5">
                        <div className="card">
                            <div className="card-header bg-info text-white">Say Something...</div>
                            <div className="card-body">
                                <form action="" onSubmit={handleSubmit}>
                                    <TextAreaGroup error={errorCMT ? errorCMT : errors.text} name="text" value={text} onChange={handleChange} rows="3" placeholder="Create a post" />

                                    <div className="form-group">
                                        <button className="btn btn-dark">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
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
                            <Feeds listPost={listPost} user={user.name} />

                        }
                        <ToastContainer />
                    </div>
                </>
            }

        </>
    )
}

export default withRouter(Feed)
