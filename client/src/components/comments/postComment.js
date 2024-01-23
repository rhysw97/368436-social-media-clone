import { useEffect, useRef, useState, useContext } from "react";
import {getRequest, postRequest} from '../../utils/server-queries.ts'
import { USERNAME } from "../../data/contexts.js";
//component to allow user to post a comment
export default function PostComment(props) {
    const {usernameContext} = useContext(USERNAME);
    //state of comment component
    const [comments, setComments] = useState([])
    const commentInputRef = useRef()
    //runs function getComments once ce on render
    useEffect( () => {
        getComments()
    
    }, [])

    //function to deal with comments returned from server
    async function getComments() { 
        
        
        //requests backends viewComments viw comments with the post and postId
        const response = await postRequest('posts/viewComments', {postId: props.id})
        setComments((currentComments) => [...response.comments]) //sets comments state back to empty array to avoid duplicates 
        console.log('response', response.comments) 
    }

    const addTempComment = async (data) => {
        console.log(usernameContext)
        
        const profile = await getRequest('profile/profile-pic')
        const tempPost = {
            user: usernameContext,
            message: data.message,
            postId: data.postId,
            profilePicture: profile.profilePicture
        }

        console.log(tempPost)
        

        setComments(currentComments => [...currentComments, tempPost])
    }

    //function to run when user comments on post
    const commentOnPost = async (e) => {
        //checks there is data in comment input field
        if(commentInputRef.current.value) {

            //
            const data = {
                message: commentInputRef.current.value,
                postId: props.id, //sets postId to the id passed in when this component is initalised witin jsx
            }

            addTempComment(data)
            
            await postRequest('posts/comment', data)
            
            await getComments()
          
            commentInputRef.current.value = ''
        }
    }

   //if comments has a 
    return (
        <div className="h-screen">
            <div className="comments flex flex-col gap-10">
                {comments.toReversed().map((comment, index) => {
                    return <div className="bg-white w-[90%] m-auto rounded-xl p-10" key={index}>
                        <div className="flex items-center">
                            <img className="w-20 h-20" />
                            <h2>{comment.user}</h2>
                        </div>
                            <p>{comment.message}</p>
                    </div>
                })}
            </div>
            <div className="fixed flex items-center flex-col w-[100%] bottom-0 left-0 ">
                <textarea className="border-black border-2 w-[70%] text-lg rounded-lg" placeholder="add comment" ref={commentInputRef}/>
                <button className="button-green w-[50%] border-black border-2" onClick={commentOnPost}>Send</button>
            </div>
        </div>
    ) 
}