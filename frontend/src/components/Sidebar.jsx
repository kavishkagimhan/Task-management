import React from 'react';
import { MdDashboard } from "react-icons/md";
import { RiTaskFill } from "react-icons/ri";
import { MdAdd } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Sidebar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
        window.location.reload();
        toast.success("Successfully Logout ", {
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


    
    return (
        <div className='bg-primary relative h-[100vh] lg:w-[220px]  text-white font-semibold w-[80px] '>
            <Link to='/dashboard'>
                <div className='flex items-center justify-center h-16 text-3xl bg-secondary'>
                    <RiTaskFill className='mr-2' />
                    <h3 className='hidden font-bold cursor-pointer lg:block'>TASKS</h3>
                </div>
            </Link>
            <div className='flex flex-col items-center justify-center gap-6 mt-8'>
                <Link to='/dashboard'>
                    <div className='flex lg:w-[180px] items-center bg-[#EBE6ED1A] md:px-6 py-2 px-2 md:gap-[8px]  mx-auto rounded-full justify-center lg:justify-start cursor-pointer hover:bg-secondary'>
                        <MdDashboard />
                        <p className='font-400 text-[16px] hidden lg:block'>Dashboard</p>
                    </div>
                </Link>
                <Link to='/addTask'>
                    <div className='flex lg:w-[180px] items-center bg-[#EBE6ED1A] md:px-6 py-2 px-2 md:gap-[8px]  mx-auto rounded-full justify-center lg:justify-start cursor-pointer hover:bg-secondary'>
                        <MdAdd />
                        <p className='font-400 text-[16px] hidden lg:block'>Add Task</p>
                    </div>
                </Link>
                <Link to="/allTasks">
                    <div className='flex lg:w-[180px] items-center bg-[#EBE6ED1A] md:px-6 py-2 px-2 md:gap-[8px]  mx-auto rounded-full justify-center lg:justify-start cursor-pointer hover:bg-secondary'>
                        <FaTasks />
                        <p className='font-400 text-[16px] hidden lg:block'>All Tasks</p>
                    </div>
                </Link>
            </div>
            <div className='absolute bottom-5 lg:left-4 left-2'>
                <div onClick={handleLogout} className='flex lg:w-[180px] items-center bg-[#EBE6ED1A] md:px-6 py-2 px-2 md:gap-[8px]  mx-auto rounded-full justify-center lg:justify-start cursor-pointer hover:bg-secondary'>
                    <IoMdLogOut />
                    <p className='font-400 text-[16px] hidden lg:block'>Logout</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar