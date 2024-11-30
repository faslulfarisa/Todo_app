import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'
import PasswordInput from '../../components/Input/PasswordInput';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosinstance';

const Login = () => {
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const [error,setError]=useState();
  const navigate = useNavigate();
  const handleLogin =async (e) =>{
      e.preventDefault();
      if(!validateEmail(email)){
        setError("Please enter a valid email address.");
        return;
      }
      if(!password){
        setError("Please enter the password");
        return;
      }
      setError("");
      // Login API Call
      try{
          const response = await axiosInstance.post("/login",{
            email:email,
            password:password,
          });
          // Handle successfull login response
          if(response.data && response.data.token){
            localStorage.setItem("token",response.data.token);
            navigate("/dashboard");
          }
      }catch(error){
        // Handle login error
        if(error.response && error.response.data && error.response.data.message){
            setError(error.response.data.message);
        }else{
          console.log(error); 
          setError("An unexpected error ocurred.Please try again");
        }
      }
  };
  return <>
    <Navbar/>
    <div className='container'>
        <div className='sub-container'>
            <form onSubmit={handleLogin}>
              <h4 className='heading'>Login</h4>
              <input 
                type='text' 
                placeholder='Email' 
                className='input-box' 
                value={email} 
                onChange={(e)=> setEmail(e.target.value)}
                />
              <PasswordInput 
                value={password} 
                onChange={(e)=>setPassword(e.target.value)}/>
              {error && <p className='error-text'>{error}</p>}
              <button type='submit' className='btn-primary'>Login</button>
              <p className='styled-paragraph'>
                  Not registered yet?
                  <Link to ="/signUp" className='styled-link '>
                      Create an Account
                  </Link>
              </p>
            </form>
        </div>
    </div>
  </>
};
export default Login;