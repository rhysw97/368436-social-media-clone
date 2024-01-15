import React, { useEffect, useState } from "react";
import   {BlackMassImage, HamishHawkImage, QuelleChrisImage } from "./../../assets/images/image-links"  
import { FaCalendar, FaClock, FaLocationArrow, FaPlus} from "react-icons/fa";
import CreateEvent from './create-event'   
import Modal from './../../components/UI/modal/modal';        
import { getRequest } from "../../utils/server-queries.ts";
import Event from './event.js'

export default function Events() {
    const [createEventModalActive, setCreateEventModalActive] = useState(false)
    const [events, setEvents] = useState([])

    async function getEvents() {
        const data = await getRequest('events/getEvents')

        setEvents([
            {
            artist: 'Black Mass',
            id: '0',
            location: 'O2 Academy- Bristol',
            date: '24th Sep 2024',
            time: '19:00',
            img: BlackMassImage
            
        },
        {
            artist: 'Quelle Chris',
            id: '1',
            location: 'London Roundhouse',
            date: '7th Mar 2024',
            time: '18:00',
            img: QuelleChrisImage
            
        },
        {
            artist: 'Hamish Hawk',
            id: '2',
            location: 'O2 Academy- Brixton',
            date: '19th Aug 2024',
            time: '18:30',
            img: HamishHawkImage
            
        }
    ])
        data.forEach(event => {
            console.log(event._id)
            setEvents(currentEvents => [...currentEvents, {

                id: event._id,
                artist: event.artist,
                genre: event.genre,
                location: event.location,
                date: event.date,
                time: event.time,
                img: event.eventPicture
            }])
        })
    }

    useEffect(() => {
        getEvents()

    },[])

    return (
        <div className="gothic text-white">
            <header className='flex justify-center'>
                <h1 className='text-5xl heading'>Events</h1>
            </header>

            <div className="ml-16 flex flex-row max-w-[100%] flex-wrap">
                <div className="flex flex-row gap-2 flex-wrap w-[100%]">
                    {events.map(event => {
                        return <Event key={event.id} event={event}/>
                    })}
                    
                </div>
            </div>
            <div className="bg-green-700 py-4 px-10 rounded-full shadow-lg shadow-slate-700  fixed bottom-4 right-5 hover:shadow-none hover:bottom-3" onClick= { () => setCreateEventModalActive(true)} ><p>Create Event</p></div>
            <Modal show={createEventModalActive} close={()=> setCreateEventModalActive(false)} content={<CreateEvent />} title={"Create Event"}/>
        </div>
    );
}