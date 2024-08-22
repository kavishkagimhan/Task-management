import React from 'react'
import Welcome from './Welcome'
import Activity from './Activities';
import Tasks from './Tasks';

const Content = () => {
    return (
        <div className=''>
            <div className='flex gap-2'>
                <Welcome />
            </div>
            <div className='flex gap-6 py-6 w-[100%] flex-col lg:flex-row'>
                <div>
                    <Tasks />
                </div>
                <div className='flex flex-col flex-grow '>
                    <Activity />
                </div>
            </div>
        </div>
    )
}

export default Content