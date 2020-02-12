import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteComment } from "../../actions/postsAction";



const CommentItem = (props) => {
    const dispatch = useDispatch();

    const handleDelete = (idPost, idComment) => {
        dispatch(deleteComment(idPost, idComment));
    }
    return (
        <div className="card my-3" >
            <div className="card-body">
                <div className="row">
                    <div className="col-sm-2 avatar">
                        <img className="card-img-top" src={props.comment.avatar} alt="Card image" style={{ width: "100%" }} />
                        <p className="card-title text-center mt-2">{props.comment.name}</p>
                    </div>
                    <div className="col-sm-10">
                        <p className="lead">{props.comment.text}</p>
                        {props.user !== props.comment.name ? '' :
                            <button className="btn btn-danger" onClick={() => handleDelete(props.idPost, props.comment._id)}><i className="fa fa-times"></i></button>
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CommentItem
