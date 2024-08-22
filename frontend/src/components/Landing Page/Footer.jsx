import React from 'react';

const Footer = () => {
    return (
        <div className='px-4 py-6 text-white bg-primary'>
            <div className='max-w-[1100px] mx-auto flex justify-between items-center flex-col md:flex-row'>
                <div className='mb-4'>
                    <h2 className='text-xl font-bold md:text-3xl'>TaskMaster</h2>
                    <p className='mt-2 text-sm'>Your ultimate tool for efficient task management and collaboration.</p>
                </div>
                <div>
                    <div className='flex mb-4 space-x-6'>
                        <a href="/" className='hover:text-gray-300'>About Us</a>
                        <a href="/" className='hover:text-gray-300'>Features</a>
                        <a href="/" className='hover:text-gray-300'>Contact</a>
                        <a href="/" className='hover:text-gray-300'>Privacy Policy</a>
                    </div>
                    <div className='text-xs'>
                        <p>&copy; {new Date().getFullYear()} Tasks. All rights reserved.</p>
                        <p>Designed and developed with passion.</p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Footer;
