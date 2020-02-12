import React from 'react';
import CommentItem from "./CommentItem";

const Comments = (props) => {
    return (
        <div >
            {props.comments && props.comments.map((comment, index) =>
                <CommentItem key={index} comment={comment} user={props.user} idPost={props.idPost} />)}
        </div>
    )
}

export default Comments
