import React from 'react';
import FeedItem from './FeedItem';



const Feeds = (props) => {
    return (
        <div >
            {props.listPost && props.listPost.map((post, index) =>
                <FeedItem key={index} post={post} user={props.user} />)}
        </div>
    )
}

export default Feeds
