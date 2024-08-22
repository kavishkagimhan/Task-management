import React from 'react';
import { SiGoogletasks } from "react-icons/si";
import { RiTimeFill } from "react-icons/ri";
import { MdNotificationsActive } from "react-icons/md";
import { MdOutlineSecurity } from "react-icons/md";

const Features = () => {

    const features = [
        {
            title: "Task Management",
            icon: <SiGoogletasks  />, 
            description: "Organize your tasks with customizable categories and priorities, tailored to fit your unique workflow."
        },
        {
            title: "Real-Time Collaboration",
            icon: <RiTimeFill  />, 
            description: "Work together with your team by sharing tasks and tracking progress in real-time."
        },
        {
            title: "Smart Notifications",
            icon: <MdNotificationsActive  />, 
            description: "Stay on top of deadlines with automated reminders and notifications for upcoming tasks."
        },
        {
            title: "Secure User Accounts",
            icon: <MdOutlineSecurity  />, 
            description: "Protect your data with secure sign-up, login, and password recovery, powered by industry-leading encryption."
        }
    ];

    return (
        <div className='w-screen h-auto'>
            <div className='max-w-[1300px] mx-auto text-center px-4 py-8'>
                <h2 className='p-4 text-3xl font-bold text-center text-primary'>Features</h2>
                <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
                    {features.map((feature, index) => (
                        <div key={index} className='p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-2xl hover:shadow-purple-300'>
                            <h3 className='mb-2 text-xl font-bold'>{feature.title}</h3>
                            <div className='flex items-center justify-center p-2 mx-auto text-4xl text-center text-secondary'>
                                {feature.icon}
                            </div>
                            <p className='text-gray-700'>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Features;
