import React, { useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import {IoMdClose} from "react-icons/io";
import './SearchBar.css'

const SearchBar = ({onSearchNote,handleClearSearch}) => {
  const [searchQuery,setSearchQuery]=useState("");
  const handleSearch =()=>{
      if(searchQuery){
        onSearchNote(searchQuery)
      }
  };
  const onClearSearch =()=>{
    setSearchQuery("");
    handleClearSearch();
  };
  return (
    <div className='search-bar'>
        <input 
            type='text' 
            placeholder='Search Notes'
            className='search-input-box'
            value={searchQuery}
            onChange={(e)=>setSearchQuery(e.target.value)}/> 
        {searchQuery &&(
            <IoMdClose className='close-icon' onClick={onClearSearch}/>
        )}
        <FaMagnifyingGlass className='search-icon' onClick={handleSearch}/>
    </div>
  )
}

export default SearchBar