import React, { useRef } from "react";
import { postRequest } from "../../utils/server-queries.ts";

export default function CreateEvent() {
    const artistInputRef = useRef(null)
    const genreInputRef = useRef(null)
    const locationInputRef = useRef(null)
    const imageInputRef = useRef(null)
    const dateInputRef = useRef(null)
    const timeInputRef = useRef(null)
    
    const handleSubmit = () => {
        const data = {
            artist: artistInputRef.current.value,
            genre: genreInputRef.current.value,
            location: locationInputRef.current.value,
            date: dateInputRef.current.value,
            eventPicture: imageInputRef.current.value,
            time: timeInputRef.current.value
        }

        console.log(data)

        postRequest('events', data)

        artistInputRef.current.value = null
        genreInputRef.current.value = null
        locationInputRef.current.value = null
        dateInputRef.current.value = null
        timeInputRef.current.value = null
    }

    return(
        <form className="flex flex-col items-center text-black h-screen justify-evenly">
            <input className="input-field" placeholder="Artist Name" ref={artistInputRef} required/>
            <input className="input-field" placeholder="Genre" ref={genreInputRef} required/>
            <input className="input-field" placeholder="Location" ref={locationInputRef} required/>
            <input className="input-field" placeholder="Event Image Link" ref={imageInputRef} required/>
            <input className="input-field" type="date" ref={dateInputRef} required/>
            <input className="input-field text-center" type="time" ref={timeInputRef} required/>

            <button className="button-green" type="submit" onClick={handleSubmit}>Create Event</button>
        </form>
    )
}