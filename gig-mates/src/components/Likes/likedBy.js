import { useState } from "react"
import Modal from "../UI/modal/modal"
export default function LikedBy(props) {
    const [modalActive, setModalActive] = useState(false);

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