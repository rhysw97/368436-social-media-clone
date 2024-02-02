import React, {useState, useRef, useEffect} from 'react';

//function to allow user to add tags to a list
function Tags(props) {
  const [tags, setTags] = useState([])
  const inputRef = useRef(null)
  
  useEffect(()=> {
    console.log(props.taglist)
    async function addCurrentTags() {
      await setTags(() => {
        const updatedTags = props.taglist
        return updatedTags
      })
    }

    addCurrentTags()
  },[])

  //checks whether the user has already added the tag
  const doesTagExist = tag => !tags.includes(tag)?true : false

  //function to remove a tag if user clicks on the x button
  function removeTag(tag) {

    setTags(currentValues => {
      return currentValues.filter(tagToCheck => tagToCheck !== tag) //returns a new array with all the tags that aren't equal to the one passed into function
    })
    
    props.callback(() => tags)
  }
  
  function addTag() {
    const inputValue = inputRef.current.value
    
    if(doesTagExist(inputValue)) {
      setTags(currentTags => [...currentTags, inputValue])
      inputRef.current.value = ''
      
    
      props.callback(currentTags => [...currentTags, inputValue])
    }

    else {
      alert('Tag already exists')
    }
  }

  return (
    <div className="App">
      <ul>
        {tags.map((tag, i) =>{ return <li key={i} className='flex justify-between items-center bg-gray-500' >
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
