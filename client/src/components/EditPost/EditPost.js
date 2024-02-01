import React from "react";
import { postRequest} from '../../utils/server-queries.ts';
export default function EditPost(props) {
    //stores the post message and id passed down by parent in post data object
    let postData = {
        message: props.message,
        postId: props.id
    }

    //sets the message state of the parent to the new message updating the UI instantly before waiting for it to update on the backend
    const handleSave = () => {
       postRequest("posts/updatePost", postData)
       props.setMessage(postData.message)
       props.setModalActive(false)
    }

    //updates the postData.message whenever the user changes anything in the input
    const handleTextChange = (event) => {
        postData.message = event.target.value
    }

    return (
        <div className="h-screen pt-4 flex flex-col gap-4">
            <textarea onChange={handleTextChange} className="w-[100%] text-xl h-[80%]" defaultValue={postData.message}></textarea>
            <p className="button-green w-[80%] h-8 mx-auto" onClick={handleSave}>Save</p>
        </div>
    )
}