import React, {useState, useRef, useEffect} from 'react';

//function to allow user to add tags to a list
function Tags(props) {
  const [tags, setTags] = useState([])
  const inputRef = useRef(null)
  
  //checks whether the user has already added the tag
  const doesTagExist = tag => !tags.includes(tag)?true : false

  
  function removeTag(tag) {

    setTags(currentValues => {
      return currentValues.filter(tagToCheck => tagToCheck !== tag)
    })

    const localTags = tags
    props.callback(tags)
  }
  
  function addTag() {
    const inputValue = inputRef.current.value
    
    if(doesTagExist(inputValue)) {
      setTags(currentTags => [...currentTags, inputValue])
      inputRef.current.value = ''
      const localTags = tags
    
      props.callback(() => localTags)
    }

    else {
      alert('Tag already exists')
    }
  }

  return (
    <div className="App">
      <ul>
        {tags.map((tag, i) =>{ return <li key={i} className='flex justify-between items-center bg-gray-100' >
          <p>{tag}</p>
          <p onClick={()=>{
        
            removeTag(tag)
          }} className='hover:text-green-800'>x</p>
        </li>})}
      </ul>
      <div className='flex'>
        <input className='text-black py-2 pl-2 rounded-l-md' type="text" ref={inputRef}></input>
        <p className='bg-green-500 p-2 rounded-r-md hover:bg-green-700' onClick={addTag}>add</p>
      </div>
    </div>
  );
}

export default Tags;
