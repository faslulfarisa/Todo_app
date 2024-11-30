import React, { useState } from 'react';
import { MdAdd, MdClose } from 'react-icons/md'
import './TagInput.css'

const TagInput = ({tags,setTags}) => {
  const[inputValue,setInputValue] = useState("");
  const handleInputChange = (e) =>{
      setInputValue(e.target.value);
  }
  const addNewTag = () =>{
      if(inputValue){
        setTags([...tags,inputValue]);
        setInputValue("");
      }
  };

  const handleKeyDown = (e) =>{
    if(e.key === "Enter"){
        addNewTag();
    }
  }

  const handleRemoveTag = (tagToRemove) =>{
    setTags(tags.filter((tag)=>tag!== tagToRemove));
  };
  return (
  <div>
      <div className='tag-list'>
           {tags.map((tag,index)=>(
                <div key={index} className='tag-item'>
                    # {tag}
                    <button onClick={()=>{handleRemoveTag(tag)}}className='tag-remove-button'><MdClose/></button>
                </div>
           ))}
      </div>
      <div className='tag-container'>
            <input 
                type='text' 
                className='tag-input-button' 
                placeholder='Add tags'
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}/>
            <button onClick={addNewTag} className='tag-button-wrapper'>    
                <MdAdd className='tag-add-button'/>
            </button>
      </div>
  </div>
  )
}

export default TagInput