import React, { useState, useRef, useEffect, useContext } from 'react'
import Post from './post'
import {postRequest, getRequest} from '../../utils/server-queries.ts';
import {useLocation} from 'react-router-dom';
import { USERNAME } from '../../data/contexts.js';

//component to allow user to create a post
export default function CreateEventPost() {
    const {usernameContext} = useContext(USERNAME)
    const [posts, setPosts] = useState([]); //recent posts state
    const postInputRef = useRef() //reference to post input
    const {state} = useLocation()
    const {id, artist} = state

    //run once when first rendered
    useEffect( () => {  
        getEventPosts()
        
    },[])

    //function to send new post to backend
    async function newEventPost() {
        if(postInputRef.current.value) {
            const data = {id: id, message: postInputRef.current.value}
            await addTempPost(data)
            await postRequest('posts/createEventPost', data)
            postInputRef.current.value = ''
            getEventPosts()
        }
    }

    const addTempPost = async (data) => {
        console.log('data', data)
        console.log(usernameContext)
        
        const profile = await getRequest('profile/profile-pic')
        const tempPost = {
            postedBy: usernameContext,
            message: data.message,
            profilePicture: profile.profilePicture,
            likedBy: [],
            comments: [],
            tempPost: true
        }

        console.log(tempPost)
        

        setPosts(currentComments => [...currentComments, tempPost])
    }

    
     //function to get recent posts from server
    async function getEventPosts(){
    
        const response = await postRequest('posts/eventPosts', {id: id})
        console.log('response', response)
        setPosts((currentPosts) => [...response.recentEventPosts])
       
    }

    return(
        <div className='gothic' >
            <header className='flex justify-center'>
                <h1 className='text-5xl heading'>{artist}</h1>
            </header>
            <div className='ml-16'>
                <div className=" flex flex-col w-[95%]  mx-auto gap-6">
                    {posts.map((post, index) => <Post key={post.id} post={post} />)}
                </div>
                <div className ="flex pb-[20px] flex-col items-center mt-10 mx-auto fixed bottom-0 w-[100%] placeholder:text-black bg-green-500">
                    <textarea className="border-black border-2 w-[70%] text-lg rounded-lg px-2 my-3"id="postBox" type="text" placeholder="What is on your mind" ref={postInputRef}/>
                    <p className="button-green w-[50%] border-black border-2" onClick={newEventPost}>Post</p>
                </div>
            </div>
        </div>
    )
}