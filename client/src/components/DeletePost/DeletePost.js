import React from "react";

export default function DeletePost(props) {
    const handleConfimDelete = async () => {
        console.log('ID', typeof props.id)
        fetch('posts/deletePost', {
            method: 'DELETE',
            headers: {
                'postId': props.id,
            }
        })
    }

    return(
        <div>
            <p>Are you sure you would like to delete this post</p>
            <div classname="options">
                <p onClick={handleConfimDelete}>Yes</p>
                <p>No</p>
            </div>
        </div>
    )
}