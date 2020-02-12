import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteFeed, likeFeed, unlikeFeed } from '../../actions/postsAction';


const FeedItem = (props) => {
    const dispatch = useDispatch();

    const handleDelete = id => {
        dispatch(deleteFeed(id));
    }

    const handleLike = id => {
        dispatch(likeFeed(id))
    }

    const handleUnlike = id => {
        dispatch(unlikeFeed(id));

    }

    return (
        <div className="card my-3" >
            {props.user.name}
            <div className="card-body">
                <div className="row">
                    <div className="col-sm-2 avatar">
                        <img className="card-img-top" src={props.post.avatar} alt="Card image" style={{ width: "100%" }} />
                        <p className="card-title text-center mt-2">{props.post.name}</p>
                    </div>
                    <div className="col-sm-10">
                        <p className="lead">{props.post.text}</p>
                        <button className="btn btn-light mr-1 " onClick={() => handleLike(props.post._id)}><i className="fa fa-thumbs-up pr-1  "></i>{props.post.likes.length}</button>
                        <button className="btn btn-light mr-1" onClick={() => handleUnlike(props.post._id)}><i className="fa fa-thumbs-down text-secondary"></i></button>
                        <Link to={`/post/${props.post._id}`} className="btn btn-info mr-1">Comments</Link>
                        {props.user !== props.post.name ? '' :
                            <button className="btn btn-danger" onClick={() => handleDelete(props.post._id)}><i className="fa fa-times"></i></button>
                        }

                    </div>
                </div>

            </div>
        </div>
    )
}

export default FeedItem
