import { getRequest} from "../../utils/server-queries.ts";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import Tags from '../../components/Tags/Tags.js'

export default function EditProfile() {
        //profile inputs
    const [name, setName] = useState("");
    const [image, setImage] = useState();
    const [bio, setBio] = useState("");
    const [genres, setGenres] = useState(null);
    const [artists, setArtists] = useState(null);
    let artistList = []
    const navigate = useNavigate()

    useEffect(() => {
        getLikedMusic()
        
    },[])

    async function getLikedMusic() {
            const response = await getRequest('profile/get-profile')
            console.log(response)
            setGenres(() => response.genres)
            setArtists(() => response.artists) 
    }
   
    //handles submitting the form and sends data to backend then navigates to the users profile page so they can see the update
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('file', image)
        formData.append('name', name)
        formData.append('bio', bio)
        formData.append('genres', genres) 
        formData.append('artists', artists) 
        
        fetch('/profile/edit', {
            method: 'POST',
            body: formData,
        });

        navigate('/profile')
    };

    const handleChange = (e) => {
        const file = e.target.files[0];
        setImage(() => file);
    };
  
    return (
      <div className="flex flex-col  w-[100%] mx-auto" >
        <h1 className="heading">Edit Profile</h1>
        <div className="flex items-center flex-col ml-16">
            <form  className="w-[100%] flex flex-col items-center" onSubmit={handleSubmit}>
                <input
                className="input-field"
                placeholder="Name"
                name='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                />
                <div className="w-[50%]">
               
                    <input
                    className="
                        block w-full text-sm 
                        text-gray-900 border 
                        border-gray-300 rounded-lg 
                        cursor-pointer
                        bg-gray-50 dark:text-gray-400 
                        focus:outline-none dark:bg-gray-700 
                        dark:border-gray-600 dark:placeholder-gray-400
                    "
                    name='file'
                    type="file"
                    id="file_input"
                    accept="image/*"
                    onChange={handleChange}
                    placeholder="Please Upload Profile Image"
                    required
                    />
                </div>
               
                <textarea
                className="border-black border-2 h-20 placeholder:translate-y-20"
                placeholder="Bio"
                name='bio'
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                />

                <div className="text-white">
                    <div>
                        <h2 className="text-xl">Add your favourite Genres</h2>
                        {genres && <Tags callback={setGenres} taglist={genres}></Tags>}
                        
                    </div>
                    <div>
                        <h2>Add your favourite Artists</h2>
                        {artists && <Tags  callback={setArtists} taglist={artists}></Tags>}
                    </div>
                </div>
                <button className="button-green" type="submit" >Submit</button>
            </form>
        </div>
      </div>
    );
}