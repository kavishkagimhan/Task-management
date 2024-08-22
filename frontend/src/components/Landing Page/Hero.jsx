import React from 'react'
import bg from '../../assets/bg.jpg';
import { RiTaskFill } from "react-icons/ri";
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className='w-screen text-white h-[80vh] bg-center bg-no-repeat bg-cover relative' style={{ backgroundImage: `url(${bg})` }}>
            <div className='bg-black w-screen h-[80vh] absolute top-0 left-0 opacity-30 z-20'></div>

            <div className='relative z-40 flex items-center justify-center h-[100%] flex-col gap-4 max-w-[1300px] p-2 text-center mx-auto'>
                <div className='absolute flex items-center justify-center h-16 text-3xl top-3 left-3'>
                    <RiTaskFill className='mr-2' />
                    <h3 className='font-bold cursor-pointer'>TASKS</h3>
                </div>
                <h1 className='text-2xl font-bold md:text-4xl'>Stay on Top of Your Tasks - Your Personal Productivity Partner</h1>
                <p className='md:text-lg text-md'>Effortlessly manage your to-do list, deadlines, and projects all in one place.</p>
                <Link to='/login'>
                    <button className='relative px-4 py-2 bg-[#b4a0f0] rounded-full border-2 border-primary hover:bg-secondary duration-150'>Get Start</button>
                </Link>
            </div>
        </div>
    )
}

export default Hero