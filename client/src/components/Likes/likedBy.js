import { useState, useEffect } from "react"
import Modal from "../UI/modal/modal"
import { postRequest } from "../../utils/server-queries.ts";
export default function LikedBy(props) {
    const [modalActive, setModalActive] = useState(false); //state to indicate if the modal showing list of people who liked the post is active or not
    const [likedBy, setLikedBy] = useState([])
    useEffect(() => {

       getUserPictures(props.likedBy)
    }, [])

    const getUserPictures = async (usersArray) => {
        const users = []

        for(const user of usersArray) {
            const response = await postRequest('/profile/user-pic', {username: user})
            users.push({
                username: user,
                profilePicture: response.picture
            })
        }
        setLikedBy(users)
    }
    //maps the names of users in the likedBy array passed down by parent and then stores it in list of users
        const listOfUsers = <div className="w-[100%] flex gap-10 justify-center mt-5">
            {likedBy.map((user) => {
                return (
                    <div className="flex flex-row items-center bg-green-500 gap-5 px-5 py-4 w-[50%] rounded-2xl">
                        <img className="w-[50px] h-[50px]  bg-black rounded-full" src={`http://localhost:5000/images/${user.profilePicture}`}/>
                        <p className="text-3xl">{user.username}</p>
                       
                    </div>
                )
            })}
    </div>
    return(
        <div className="mr-4 w-[100%] button-green">
            <p className="" onClick={() => setModalActive(true)}>LikedBy</p>
            <Modal show={modalActive} close={()=> setModalActive(false)} content={listOfUsers} title={"Liked By"}/>
        </div>
    )
}