import { useEffect, useRef, useState } from "react";
import {getRequest, postRequest} from '../../utils/server-queries.ts'

//component to allow user to post a comment
export default function PostComment(props) {
    //state of comment component
    const [comments, setComments] = useState([])
    const commentInputRef = useRef()
    //runs function getComments once ce on render
    useEffect( () => {
        getComments()
    
    }, [])

    //function to deal with comments returned from server
    async function getComments() { 
        setComments([]) //sets comments state back to empty array to avoid duplicates
        
        //requests backends viewComments viw comments with the post and postId
        const response = await postRequest('posts/viewComments', {postId: props.id}) 
        console.log('response', response.comments) 
        //loops through each comment sent back by the server
        response.comments.forEach(comment => {

            //and adds them to the comments state
            setComments(currentComments => [...currentComments, comment])
        });
        
    }

    //function to run when user comments on post
    const commentOnPost = async (e) => {
        //checks there is data in comment input field
        if(commentInputRef.current.value) {

            //set the data object to c
            const data = {
                content: commentInputRef.current.value,
                postId: props.id, //sets postId to the id passed in when this component is initalised witin jsx
            }

            postRequest('posts/comment', data)
            
            getComments()
            console.log(typeof comments)
          
            commentInputRef.current.value = ''
        }
    }

   //if comments has a 
    if(comments) {
        return (
            <div className="h-screen">
                <div className="comments flex flex-col gap-10">
                    {comments.map((comment, index) => {
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
    else {
        return (
            <div>
                <h2>Loading...</h2>
                <input placeholder="add comment" ref={commentInputRef}/>
                <button onClick={commentOnPost}>Send</button>
            </div>
        )
    }
}