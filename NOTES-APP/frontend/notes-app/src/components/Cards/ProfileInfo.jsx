import React from 'react'
import './ProfileInfo.css'
import { getInitials } from '../../utils/helper'


const ProfileInfo = ({userInfo,onLogout}) => {
  return (
    <div className='profile-info'>
      <div className='profile-initials'> {getInitials(userInfo?.fullName)}</div>
      <div>
          <p className='profile-name'>{userInfo?.fullName}</p>
          <div className='logout-container'>
            <button 
              onClick={onLogout}
              className="logout-button" >
              Logout
            </button>
          </div>
      </div>
    </div>
  )
}

export default ProfileInfo