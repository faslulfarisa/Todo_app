import React, { useState } from 'react'
import './PasswordInput.css';
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa6";

const PasswordInput = ({value,onChange}) => {
  const [isShowPassword,setIsShowPassword] = useState(false);
  const toggleShowPassword = () =>{
    setIsShowPassword(!isShowPassword)
  }
  return (
    <div className='password-input-container'>
        <input 
            value={value}
            onChange={onChange}
            type={isShowPassword?'text':'password'} 
            placeholder='Password'
            />
            <div className='eye-icon-container'>
                {isShowPassword?(
                <FaRegEye
                    size={22}
                    className='eye-button-one'
                    onClick={()=>toggleShowPassword()}/>):(
                <FaRegEyeSlash
                    size={22}
                    className='eye-button-two'
                    onClick={()=>toggleShowPassword()}/>)}
            </div>
    </div>
  )
}

export default PasswordInput