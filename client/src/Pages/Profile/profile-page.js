import { useEffect, useState } from "react"
import { getRequest, postRequest } from "../../utils/server-queries.ts"
import Modal from "../../components/UI/modal/modal.js"
import Password from "../register/password.js"

export default function ProfilePage(){
    const [profile, setProfile] = useState({})
    const [passwordModalActive, setPasswordModalActive] = useState(false)
    const [password, setPassword] = useState('')
    const [currentIsValid, setCurrentIsValid] = useState(false)
    const [genres, setGenres] = useState()
    const [artists, setArtists] = useState()
    
    useEffect(() => {
        getProfile()
        
    },[getProfile])
    
    function mapArrayToList(array, arrayName) {
        console.log('array', array)
        if(array) {
            return array.map((item, index) => <li key={index}><p>{item}</p></li>)
        }
        return <li><p>No {arrayName} added</p></li>
    }

    async function updatePassword() {
        console.log(password)
        if(currentIsValid) {
            postRequest('/profile/update-password', {password: password})
        } else {
            alert('There was in issue with your password. Please check you have met the password critera')
        }
    }

    async function getProfile() { 
        const response = await getRequest('profile/get-profile')
        console.log('response', response)
        setProfile(()=> response)
        console.log('profile', profile)
        console.log(profile.genres)
        setGenres( () => mapArrayToList(response.genres, 'genres'))
        setArtists( () => mapArrayToList(response.artists, 'artists'))
    }
    if(!profile) {
        return(<div>loading</div>)
    } else {
   return(
        <div className=" flex flex-col content-center items-center ">
            <div className="ml-16 w-5/6 bg-gray-400 shadow-black shadow-lg h-screen">
                <div className="flex flex-col-reverse justify-end gap-5 m-b4">
                    <h1 className="w-[100%] text-6xl font-bold didact-gotic text-center ">{profile.username}</h1>
                    <img className="w-[80%] mx-auto object-0" src={`http://localhost:5000/uploads/${profile.profilePicture}`}/>
                </div>
                <p className=" w-[100%] button-green mt-4" onClick={()=> {setPasswordModalActive(true)}}>Change Password</p>
                <Modal show={passwordModalActive} close={()=> setPasswordModalActive(false)} content={
                    <div className="flex flex-col mt-4">
                        
                        <Password setPasswordState={setPassword} setIsPasswordValid={setCurrentIsValid}/>
                        <button onClick={updatePassword} className="button-green w-[60%] mx-auto mt-4" type="submit">Submit</button>
                    </div>
                    
                } title={"Change Password"}/>
                
                <p>BIO{profile.about} {console.log('hellooo')}</p>
                <div className="flex flex-row w-[100%] justify-evenly">
                    <div>
                        <h2>Favourite Genres</h2>
                        <ul className="basis-[100%] md:basis-[50%] ">
                            <li>Hi</li>
                            {genres}
                        </ul>
                    </div>
                    <div>
                        <h2>Favourite Artists</h2>
                        <ul className="basis-[100%] md:basis-[50%] ">
                            {artists}
                        </ul>
                    </div>
                </div>
              
            </div>
        </div>
        )
    }
}