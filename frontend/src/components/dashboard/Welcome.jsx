import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Welcome = () => {
    const { tasks } = useSelector((state) => state.tasks);
    const { user } = useSelector((state) => state.user);

    const [taskSummary, setTaskSummary] = useState({
        pending: 0,
        inProgress: 0,
        completed: 0,
    });

    useEffect(() => {
        const summary = {
            pending: tasks.filter(task => task.status === 'pending').length,
            inProgress: tasks.filter(task => task.status === 'in-progress').length,
            completed: tasks.filter(task => task.status === 'completed').length,
        };

        setTaskSummary(summary);
    }, [tasks]);

    return (
        <div className='h-auto bg-white border-[1px] border-[#D0D5DD] rounded-lg relative box-border p-3 shadow-xl z-0 w-[100%] '>
            <div className='max-w-[1100px] mx-auto flex lg:justify-between lg:items-center lg:flex-row flex-col justify-start'>
                <div>
                    <h3 className='font-semibold text-[24px]'>
                        Welcome back, {user?.name}
                    </h3>
                    <p className='text-[14px]'>
                        The end of the year is coming. Are you planning your performance interviews? You can do this super efficiently with Acmy.
                    </p>
                    <p className='text-[#BC006D] underline text-[14px] cursor-pointer'>
                        Look here for more information
                    </p>
                </div>
                <div>
                    <p className='font-semibold text-[16px]'>Tasks Summary</p>
                    <p className='text-[14px] flex items-center gap-2'>Pending:  {taskSummary.pending} <span className='flex w-3 h-3 bg-red-600 '></span></p>
                    <p className='text-[14px] flex items-center gap-2'>In-Progress: {taskSummary.inProgress} <span className='flex w-3 h-3 bg-green-600 animate-pulse'></span></p>
                    <p className='text-[14px] flex items-center gap-2'>Completed: {taskSummary.completed} <span className='flex w-3 h-3 bg-yellow-400 '></span></p>
                </div>
            </div>

        </div>
    );
};

export default Welcome;
