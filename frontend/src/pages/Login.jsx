import React, { useState } from 'react';
import { AiOutlineMail } from "react-icons/ai";
import { BsKey } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import {
   toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Errors from '../components/Errors';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Helper function to validate email format
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const onLogin = async (e) => {
    e.preventDefault(); // Prevent form submission

    // Reset error states
    setEmailError('');
    setPasswordError('');

    // Input validation
    if (!email) {
      setEmailError('Please enter your email');
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
    }

    if (!password) {
      setPasswordError('Please enter your password');
    }

    // Check for any errors before proceeding with the API request
    if (emailError || passwordError || !email || !password) {
      return; // Exit the function if there are validation errors
    }

    const values = { email, password };

    try {
      const res = await axios.post("http://localhost:5000/api/user/login", values);
      
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        window.location.reload();
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        navigate("/dashboard");
      } else {
        toast.error(res.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred during login", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  return (
    <div className='h-[100vh] w-full flex items-center justify-center'>
      <div className='max-w-[700px] h-auto bg-gray-100 mx-auto rounded-xl shadow-xl'>
        <div className='p-6'>
          <h2 className='mb-4 text-2xl font-semibold text-black'>LogIn</h2>

          <div className='flex flex-col'>
            <div className='flex items-center px-6 py-2 bg-white border-2 border-blue-200 rounded-lg'>
              <input
                className='h-[100%] w-[90%] ml-1 rounded-lg focus:outline-none'
                type="text"
                placeholder='Enter Your Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className='text-xl'><AiOutlineMail /></p>
            </div>
            {emailError && <Errors message={emailError} />} {/* Display email error */}
          </div>

          <div className='flex flex-col mt-4'>
            <div className='flex items-center px-6 py-2 bg-white border-2 border-blue-200 rounded-lg'>
              <input
                className='h-[100%] w-[90%] ml-1 rounded-lg focus:outline-none'
                type="password"
                placeholder='Enter Your Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className='text-xl'><BsKey /></p>
            </div>
            {passwordError && <Errors message={passwordError} />} {/* Display password error */}
          </div>

          <button
            className='bg-primary text-white px-4 py-1 rounded-lg text-lg hover:text-white hover:bg-secondary mt-[20px]'
            onClick={onLogin}
          >
            LogIn
          </button>
          <p className='p-4 font-thin text-md'>You don't have an account? <Link to="/signup">Signup</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login;
