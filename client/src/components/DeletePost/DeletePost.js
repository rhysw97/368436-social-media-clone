import React from "react";

export default function DeletePost(props) {
    const handleConfimDelete = async () => {
        fetch('posts/deletePost', {
            method: 'DELETE',
            headers: {
                'postId': props.id,
            }
        })
        props.setModalActive(false)
    }

    const handleRejectDelete = () => {
        
        props.setModalActive(false)
    }

    return(
        <div>
            <p>Are you sure you would like to delete this post</p>
            <div classname="options">
                <p onClick={handleConfimDelete}>Yes</p>
                <p onClick={handleRejectDelete}>No</p>
            </div>
        </div>
    )
}