import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, updateTask } from '../redux/features/taskSlice';
import { MdNotificationsActive } from "react-icons/md";

const Notification = () => {
    const dispatch = useDispatch();
    const { tasks } = useSelector((state) => state.tasks);
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        if (user && user.id) {
            dispatch(fetchTasks(user.id));
        }
    }, [user, dispatch]);

    // Filter tasks to only include those with the status 'pending'
    const pendingTasks = tasks.filter(task => task.status === 'pending');

    const getShortDescription = (description) => {
        const words = description.split(" ");
        return words.length > 5 ? words.slice(0, 5).join(" ") + "..." : description;
    };

    const markAsInProgress = (task) => {
        const formatDateForMySQL = (isoDate) => {
            const date = new Date(isoDate);
            return date.toISOString().slice(0, 19).replace('T', ' ');
        };

        const updatedTask = {
            ...task,
            status: 'in-progress',
            due_date: formatDateForMySQL(task.due_date)
        };

        dispatch(updateTask({ updatedTask, userId: user.id, taskId: task.id }));
    };

    return (
        <div className="absolute right-0 z-10 mt-2 rounded-lg shadow-lg md:w-[600px] max-w-[600px] w-[70vw] bg-purple-100 p-2">
            <h2>Pending Tasks</h2>
            <div className="py-2">
                {pendingTasks.length === 0 ? (
                    <div className="px-4 py-2 text-gray-500">No new notifications</div>
                ) : (
                    pendingTasks.map((task) => (
                        <div
                            key={task.id}
                            className="flex items-center justify-between gap-4 px-4 py-2 border-b border-gray-300 hover:bg-purple-200"
                        >
                            <div className="flex items-center gap-4">
                                <MdNotificationsActive size={30} color="red" />
                                <div>
                                    <p className="font-medium text-gray-800">{task.title}</p>
                                    <p className="text-sm text-gray-600">{getShortDescription(task.description)}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => markAsInProgress(task)}
                                className="px-2 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600"
                            >
                                Mark as In-Progress
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Notification;
