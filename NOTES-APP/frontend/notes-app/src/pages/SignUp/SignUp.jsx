import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import PasswordInput from '../../components/Input/PasswordInput'
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosinstance'

const SignUp = () => {
  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[error,setError]=useState();
  const navigate = useNavigate();
  const handleSignUp =async(e)=>{
    e.preventDefault();
    if(!name){
      setError("Please enter your name");
      return;
    }
    if(!validateEmail(email)){
      setError("Please enter a valid email address.");
      return;
    }
    if(!password){
      setError("Please enter the password");
      return;
    }
    setError("");
    // signUp API Call
    try{
        const response=await axiosInstance.post("/create-account",{
          fullName:name,
          email:email,
          password:password
        });
         // Handle successfull registration response
         if(response.data && response.data.token){
          localStorage.setItem("token",response.data.token);
          navigate("/dashboard");
        }
    }catch(error){
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
      }else{
        setError("An unexpected error occurred.Please try again");
      }
    }
  };
  return <>
    <Navbar/>
    <div className='container'>
        <div className='sub-container'>
            <form onSubmit={handleSignUp}>
              <h4 className='heading'>SignUp</h4>
              <input 
                  type='text' 
                  placeholder='Name' 
                  className='input-box'
                  value={name}
                  onChange={(e)=>setName(e.target.value)}/>
              <input 
                  type='text' 
                  placeholder='Email' 
                  className='input-box'
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}/>
              <PasswordInput
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}/>
              {error && <p className='error-text'>{error}</p>}
              <button type='submit' className='btn-primary'>Create Account</button>
              <p className='styled-paragraph'>
                  Already have an account?
                  <Link to ="/login" className='styled-link '>
                      Login
                  </Link>
              </p>
            </form>
        </div>
    </div>
  </>
}

export default SignUp