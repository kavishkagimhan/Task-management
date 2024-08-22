import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const Profile = () => {

    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    }

    // Format the created_at field
    const formattedDate = new Date(user.created_at).toLocaleDateString();
    const formattedTime = new Date(user.created_at).toLocaleTimeString();

    return (
        <div className="flex bg-[#f6f5f5] w-screen h-screen">
            <div className="flex-none">
                <Sidebar />
            </div>
            <div className="flex flex-col flex-grow overflow-y-scroll">
                <Navbar />
                <h4 className='font-semibold text-[20px] cursor-pointer p-2'>User Profile</h4>
                <div className='flex p-4 bg-white shadow-xl max-w-[1000px] mx-auto md:flex-row-reverse flex-col'>
                    <div>
                        <img src="https://cdni.iconscout.com/illustration/premium/thumb/user-profile-illustration-download-in-svg-png-gif-file-formats--id-login-register-technology-pack-network-communication-illustrations-2928727.png" alt="" />
                    </div>
                    <div className="p-6 bg-white md:w-[50%] mx-auto w-full">
                        <p className='py-4 text-xl font-bold text-left'>Hello {user.name}</p>
                        <div className='flex flex-col gap-4'>
                            <p>Name: {user.name}</p>
                            <p>Created At: {formattedDate} {formattedTime}</p>
                            <p>Email: {user.email}</p>
                        </div>
                        <div onClick={handleLogout} className='flex items-center gap-2 px-4 py-2 text-xl text-white rounded-full cursor-pointer bg-secondary w-[150px] justify-center mt-12'>
                            <IoMdLogOut />
                            <p className='font-400 text-[16px]'>Logout</p>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default Profile;
