import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, updateTask } from '../../redux/features/taskSlice';
import { CgLivePhoto } from "react-icons/cg";
import ViewTask from '../dialog Boxes/ViewTaks';

const Activity = () => {
    const dispatch = useDispatch();
    const { tasks } = useSelector((state) => state.tasks);
    const { user } = useSelector((state) => state.user);

    const [selectedTask, setSelectedTask] = useState(null);
    const [isViewTaskOpen, setIsViewTaskOpen] = useState(false);

    useEffect(() => {
        if (user && user.id) {
            dispatch(fetchTasks(user.id));
        }
    }, [user, dispatch]);

    // Filter tasks to only include those with the status 'in-progress' and limit to the first 5
    const inProgressTasks = tasks
        .filter((task) => task.status === 'in-progress')
        .slice(0, 5);

    const viewTask = (task) => {
        setSelectedTask(task);
        setIsViewTaskOpen(true);
    };

    const markAsCompleted = (task) => {
        const formatDateForMySQL = (isoDate) => {
            const date = new Date(isoDate);
            return date.toISOString().slice(0, 19).replace('T', ' ');
        };

        const updatedTask = {
            ...task,
            status: 'completed',
            due_date: formatDateForMySQL(task.due_date)
        };

        dispatch(updateTask({ updatedTask, userId: user.id, taskId: task.id }));
    };

    return (
        <div className='w-full border border-[#D0D5DD] rounded-lg bg-white shadow-lg p-3'>
            <div className='flex items-center gap-1'>
                <p className='font-medium text-16 border-b border-[#D0D5DD] p-2'>In-Progress</p>
                <div className="flex items-center justify-center h-4">
                    <div className="w-4 h-4 text-4xl bg-green-700 rounded-full animate-pulse " />
                </div>
            </div>
            <div>
                {inProgressTasks.length > 0 ? (
                    inProgressTasks.map((task) => (
                        <div
                            key={task.id}
                            className='flex items-center justify-between gap-4 p-2 py-2 border-b rounded-md cursor-pointer hover:bg-gray-100'
                        >
                            <div className='flex items-center gap-2'>
                                <CgLivePhoto size={20} className='text-green-500' />
                                <div>
                                    <p
                                        onClick={() => viewTask(task)}
                                        className='font-semibold text-primary hover:underline'
                                    >
                                        {task.title}
                                    </p>
                                    <p className='text-xs text-gray-600'>
                                        {new Date(task.due_date).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => markAsCompleted(task)}
                                className='text-sm font-semibold text-purple-500 hover:text-purple-700'
                            >
                                Mark as Completed
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No tasks in progress</p>
                )}
            </div>
            {selectedTask && (
                <ViewTask
                    isOpen={isViewTaskOpen}
                    onClose={() => setIsViewTaskOpen(false)}
                    task={selectedTask}
                />
            )}
        </div>
    );
};

export default Activity;
