import React, {useState, useRef} from 'react';

function Tags(props) {
  const [tags, setTags] = useState([])
  const inputRef = useRef('')
  
  
  const doesTagExist = tag => !tags.includes(tag)?true : false

  
  function removeTag(tag) {

    setTags(currentValues => {
      return currentValues.filter(tagToCheck => tagToCheck !== tag)
    })

    const localTags = tags
    props.callback(() => localTags)
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
      //add Error message
    }
  }

  return (
    <div className="App">
      <ul>
        {tags.map((tag, i) =>{ return <li key={i}>
          <p>{tag}</p>
          <p onClick={()=>{
        
            removeTag(tag)
          }}>x</p>
        </li>})}
      </ul>
      <input type="text" ref={inputRef}></input>
      <p onClick={addTag}>add</p>
    </div>
  );
}

export default Tags;
