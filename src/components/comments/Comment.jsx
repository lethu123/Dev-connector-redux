import React, { useEffect, useState } from 'react';
import { loadComments, replyComment } from "../../actions/postsAction";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Loader from 'react-loader-spinner';
import TextAreaGroup from "../common/TextAreaGroup";
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Comments from '../comments/Comments';
import { isLoading } from '../../actions/loadingAction';

const Comment = (props) => {
    const isAuth = useSelector(state => state.authReducer.isAuthenticated);
    const _isLoading = useSelector(state => state.loadingReducer.isLoading);
    const [text, setText] = useState('');
    const [errorCMT, setErrorCMT] = useState('');
    const errors = useSelector(state => state.errorsReducer);
    const post = useSelector(state => state.postsReducer.post);
    const user = useSelector(state => state.authReducer.currentUser);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(isLoading(true))
        dispatch(loadComments(props.match.params.id));
        return () => {
            // cleanup
        };
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
            dispatch(replyComment(commentData, props.match.params.id));
            setText('');
        } else {
            setErrorCMT("Post must be between 10 and 300 characters!");
        }
    }
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
                            {post !== null ?
                                <div className="container py-4">
                                    <button onClick={Back} className="btn btn-light my-2"> Back To Feeds</button>
                                    <div className="card my-3" >
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-sm-2 avatar">
                                                    <img className="card-img-top" src={post.avatar} alt="Card image" style={{ width: "100%" }} />
                                                    <p className="card-title text-center mt-2">{post.name}</p>
                                                </div>
                                                <div className="col-sm-10">
                                                    <p className="lead">{post.text}</p>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-header bg-info text-white">Make a comment...</div>
                                        <div className="card-body">
                                            <form action="" onSubmit={handleSubmit}>
                                                <TextAreaGroup error={errorCMT ? errorCMT : errors.text} name="text" value={text} onChange={handleChange} rows="3" placeholder="Reply to post" />

                                                <div className="form-group">
                                                    <button className="btn btn-dark">Submit</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <Comments comments={post.comments} user={user.name} idPost={props.match.params.id} />
                                    <ToastContainer />

                                </div>
                                : ''
                            }
                        </>
                    }
                </>

            }



        </>

    )
}

export default withRouter(Comment)
