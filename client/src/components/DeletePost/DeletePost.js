import React from "react";

export default function DeletePost(props) {

    //function to run when user clicks yes to delete post
    const handleConfimDelete = async () => {
        fetch('posts/deletePost', {
            method: 'DELETE',
            headers: {
                'postId': props.id,
            }
        })

        //sets removes post that was deleted from parents post state
        props.setPostList(currentPosts => {
            const updatedPosts = currentPosts.filter(post => post.id !== props.id)
            return updatedPosts
        })
        props.setModalActive(false) //closes the delete modal
    }

    //closes the modal if use clicks no indicating they don't want to delete the post
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