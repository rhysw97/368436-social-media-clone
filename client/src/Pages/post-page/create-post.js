import React, { useState, useRef, useEffect } from 'react'
import Post from './post'
import { postRequest, getRequest } from '../../utils/server-queries.ts';

//component to allow user to create a post
export default function CreatePost() {
    const [posts, setPosts] = useState([]); //recent posts state
    const postInputRef = useRef() //reference to post input

    //function to send new post to backend
    async function newPost(e) {
        if(postInputRef.current.value) {
            const data = {post: postInputRef.current.value}
            await postRequest('posts', data)
            postInputRef.current.value = ''
            getRecentPosts()
        }
    }

    //run once when first rendered
    useEffect( () => {  
        getRecentPosts()
  
    },[])
     //function to get recent posts from server
    async function getRecentPosts(){
        const serverPosts = await getRequest('posts/recentPosts', localStorage.getItem('access_token'))
        
        setPosts([])
        serverPosts.forEach(post => {
            setPosts(currentPosts => [...currentPosts, {
                id:post._id, 
                username: post.postedBy, 
                content: post.message,
                likes: post.likes, 
                likedBy: post.likedBy, 
                comments: post.comments,
                date: post.date,
                profilePicture: post.profilePicture
            }])
        });
    }

    return(
        <div className='gothic' >
            <header className='flex justify-center'>
                <h1 className='text-5xl heading'>Feed</h1>
            </header>
            <div className='ml-16'>
                <div className=" flex flex-col w-[95%]  mx-auto gap-6  mb-[15%]">
                    {posts.map((post, index) => <Post key={post.id} post={post} />)}
                </div>
                <div className ="flex pb-[20px] flex-col items-center mt-10 mx-auto fixed bottom-0 w-[100%] placeholder:text-black bg-green-500">
                    <textarea className="border-black border-2 w-[70%] text-lg rounded-lg px-2 my-3"id="postBox" type="text" placeholder="What is on your mind" ref={postInputRef}/>
                    <p className="button-green w-[50%] border-black border-2" onClick={newPost}>Post</p>
                </div>
            </div>
        </div>
    )
}