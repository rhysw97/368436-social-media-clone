import {useEffect, useState, useContext} from "react";
import UserProfile from "../../data/userProfile";
import Likes from "../../components/Likes/likes"
import PostComment from "../../components/comments/postComment";
import Modal from "./../..//components//UI/modal/modal"
import { USERNAME } from "../../data/contexts";
import DeletePost from "../../components/DeletePost/DeletePost";
import EditPost from "../../components/EditPost/EditPost"

export default function Post(props) {
    const [commentsModalActive, setCommentsModalActive] = useState(false);
    const [editModalActive, setEditModalActive] = useState(false);
    const [deleteModalActive, setDeleteModalActive] = useState(false);
    const {usernameContext, setUsernameContext} = useContext(USERNAME)
    const postData = props.post
    let posterButtons = null;
    const username = usernameContext
  
    useEffect(() => {
        console.log(postData)
    }, [])

    if(postData.username === username) {
        posterButtons = 
            <div className="flex mb-6 justify-between gap-2">
                <p className="button-green" onClick={()=> setEditModalActive(true)}>Edit</p>
                <p className="button-green mr-4" onClick={()=> setDeleteModalActive(true)}>Delete</p>
            </div>
    } else {
        posterButtons = null
    }

    return(
        <div className="flex-col px-[20px] bg-slate-300 rounded-md shadow-xl shadow-slate-600 gap-6" >
            <div className="flex mt-1">
                <div className="rounded-full h-[50px] w-[50px] mt-2 mb-2 mr-2 ml-1">
                    <img className="w-[50px] h-[50px]  bg-black rounded-full" src={`./uploads/${postData.profilePicture}`}/>
                </div>
                <div className="flex w-[100%] justify-between">
                <p className="mx-[6%] pt-1 text-3xl">{postData.username}</p>
                {posterButtons}
                </div>
            </div>
            <div className="my-[10px] min-h-[100px] flex align-middle">
                <p className="mx-[9.5%] my-auto text-xl">{postData.content}</p>
            </div>
            
            <div className="flex flex-col gap-6">
                <Likes className= "" likes ={postData.likes} post={postData}></Likes>
                <div className="px-[20%]">
                    <p className=" w-[100%] button-green mb-5" onClick={()=> {setCommentsModalActive(true)}}>comments</p>
                </div>
                <Modal show={commentsModalActive} close={()=> setCommentsModalActive(false)} content={<PostComment id={postData.id}/>} title={"Comments"}/>
                <Modal show={deleteModalActive} close={()=> setDeleteModalActive(false)} content={<DeletePost id={postData.id}/>} title={"Delete"}/> 
                <Modal show={editModalActive} close={()=> setEditModalActive(false)} content={<EditPost id={postData.id} content={postData.content}/>} title={"Edit"}/>  
            </div>
        </div>
    )
}