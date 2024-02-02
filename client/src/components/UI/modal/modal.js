import React from 'react'

export default function Modal(props) {
    //checks if the show props passed in is falsy if it is then this component wont render anything 
    //otherwise it will render the modal with component passed in
    if (!props.show) {
        return null
    }

    return (
        <div className='fixed top-0 left-0 h-screen w-screen bg-gray-700 flex items-center justify-center z-50' onClick={props.close}>
            <p className='text-white fixed left-3 top-0 text-3xl hover:text-green-500'> x </p>
            <div className=' bg-gray-400 h-screen w-[80%] ' onClick= {event => event.stopPropagation()}> 
                <div className='modal-header'>
                    <h1 className='text-center font-extrabold text-green-500 text-5xl'>{props.title}</h1>
                </div>
                <div className="modal-body h-[100%]">
                    {props.content}
                
                </div>
                <div className="modal-footer">
                    <p className="close-button" onClick={props.close}>Close</p>
                </div>
            </div>
        </div>
    )
}