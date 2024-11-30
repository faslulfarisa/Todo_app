import React from 'react'
import './Navbar.css'
import ProfileInfo from '../Cards/ProfileInfo'
import SearchBar from '../SearchBar/SearchBar'
import { useNavigate } from 'react-router-dom'

const Navbar = ({userInfo,onSearchNote,handleClearSearch}) => {
  const navigate = useNavigate();
  const onLogout =()=>{
    localStorage.clear()
    navigate("/login");
  };
  return (
    <div className='navbar'>
        <h2 className='navbar-title'>Notes</h2>
        <SearchBar onSearchNote={onSearchNote} handleClearSearch={handleClearSearch}/>
        <ProfileInfo userInfo ={userInfo} onLogout={onLogout}/>
    </div>
  )
}

export default Navbar