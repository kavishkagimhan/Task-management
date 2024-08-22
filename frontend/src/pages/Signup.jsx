import React, { useState } from 'react';
import { AiOutlineMail } from "react-icons/ai";
import { BsKey } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Errors from '../components/Errors';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');

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
    setNameError('');

    // Input validation
    if (!name) {
      setNameError('Please enter your Name');
    }

    if (!email) {
      setEmailError('Please enter your email');
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
    }

    if (!password) {
      setPasswordError('Please enter your password');
    }

    // Check for any errors before proceeding with the API request
    if (emailError || passwordError || nameError || !email || !password || !name) {
      return; // Exit the function if there are validation errors
    }

    const values = { email, password, name };

    try {
      const res = await axios.post("http://localhost:5000/api/user/signup", values);
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        console.log(res.data)
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
        navigate("/login");
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
      <ToastContainer />
      <div className='max-w-[700px] h-auto bg-gray-100 mx-auto rounded-xl shadow-xl'>
        <div className='p-6 md:p-12'>
          <h2 className='mb-4 text-2xl font-semibold text-black'>Signup</h2>

          <div className='flex flex-col'>
            <div className='flex items-center px-6 py-2 bg-white border-2 border-blue-200 rounded-lg'>
              <input
                className='h-[100%] w-[90%] ml-1 rounded-lg focus:outline-none'
                type="text"
                placeholder='Enter Your Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <p className='text-xl'><FaUser /></p>
            </div>
            {emailError && <Errors message={nameError} />}
            <div className='flex items-center px-6 py-2 mt-4 bg-white border-2 border-blue-200 rounded-lg'>
              <input
                className='h-[100%] w-[90%] ml-1 rounded-lg focus:outline-none'
                type="text"
                placeholder='Enter Your Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className='text-xl'><AiOutlineMail /></p>
            </div>
            {emailError && <Errors message={emailError} />}
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
            {passwordError && <Errors message={passwordError} />}
          </div>

          <button
            className='bg-primary text-white px-4 py-1 rounded-lg text-lg hover:text-white hover:bg-secondary mt-[20px]'
            onClick={onLogin}
          >
            Signup
          </button>
          <p className='p-4 font-thin text-md'>You have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Signup;
