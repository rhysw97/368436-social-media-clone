import { useState } from "react"
import Modal from "../UI/modal/modal"
export default function LikedBy(props) {
    const [modalActive, setModalActive] = useState(false); //state to indicate if the modal showing list of people who liked the post is active or not

    //maps the names of users in the likedBy array passed down by parent and then stores it in list of users
        const listOfUsers = <div>
            {props.likedBy.map((user) => {
                return <p>{user}</p>
            })}
    </div>
    return(
        <div className="mr-4 w-[100%] button-green">
            <p className="" onClick={() => setModalActive(true)}>LikedBy</p>
            <Modal show={modalActive} close={()=> setModalActive(false)} content={listOfUsers} title={"Liked By"}/>
        </div>
    )
}