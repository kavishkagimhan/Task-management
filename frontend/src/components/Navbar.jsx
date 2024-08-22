import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { MdNotificationsActive } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import ProfileMenu from './ProfileMenu';
import Notification from './Notification';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [showProfile, setShowProfile] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    const tasks = useSelector((state) => state.tasks.tasks);

    const pendingTasksCount = tasks.filter(task => task.status === 'pending').length;

    const handleProfile = () => {
        setShowProfile(!showProfile);
    };

    const handleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    return (
        <div>
            <div className='bg-white h-[80px] flex justify-end items-center p-[28px] relative z-20'>
                <div className='flex items-center gap-6 text-2xl'>
                    <div
                        onClick={handleNotifications}
                        className='relative text-xl cursor-pointer hover:text-secondary hover:shadow-lg'
                    >
                        <MdNotificationsActive className='text-4xl text-yellow-500' />
                        <div className='absolute top-0 flex items-center justify-center w-6 p-1 text-sm text-white bg-red-700 rounded-full -right-2'>
                            {pendingTasksCount}
                        </div>
                        {showNotifications && (
                            <Notification tasks={tasks.filter(task => task.status === 'pending')} />
                        )}
                    </div>

                    <Link to="/profile">
                        <FaCircleUser className='cursor-pointer hover:text-secondary hover:shadow-lg' />
                    </Link>
                    <IoIosArrowDropdownCircle
                        onClick={handleProfile}
                        className='cursor-pointer hover:text-secondary hover:shadow-lg'
                    />
                </div>
            </div>
            {showProfile && <ProfileMenu />}
        </div>
    );
};

export default Navbar;
