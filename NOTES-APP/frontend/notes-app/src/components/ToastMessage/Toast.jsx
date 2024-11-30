import React, { useEffect } from 'react'
import {LuCheck} from "react-icons/lu"
import { MdDeleteOutline } from 'react-icons/md'
import "./Toast.css"

const Toast = ({isShown,type,message,onClose}) => {
  console.log(isShown,"show");
  console.log(type,"type");
  console.log(onClose,"CLOSE");
  console.log(message,"MSG");
  useEffect(()=>{
    // Set up a timer to close the toast after 3 seconds
    const timeoutId = setTimeout(()=>{
        onClose();
    },3000);
     // Clean up the timer if the component unmounts or if the toast is manually closed
    return()=>{
        clearTimeout(timeoutId);
    };
  },[onClose])
  return (
    <div className={`toast-main-container ${isShown?"opacity-100":"opacity-0"}`}>
      <div className={`toast-wrapper ${type === "delete" ? "delete" :type==="success"? "success":""}`}>
        {type === 'delete' || type === 'success' ? (
        <div className='toast-container'>
          <div className={`toast ${type === "delete" ? "red" : type === "success" ? "green" : ""}`}>
            {type === 'delete' ? (
              <MdDeleteOutline className='icon-delete' />
            ) : type === 'success' ? (
              <LuCheck className='icon-check' />
            ) : null}
          </div>
          <p>{message}</p>
        </div>
      ) : null}
      </div>  
    </div>
  )}

export default Toast