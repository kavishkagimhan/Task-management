import React, { useState } from 'react';
import { FaBell } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import ViewTask from '../dialog Boxes/ViewTaks';

const Tasks = () => {
    const { tasks, status, error } = useSelector((state) => state.tasks);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isViewTaskOpen, setIsViewTaskOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const viewTask = (task) => {
        setSelectedTask(task);
        setIsViewTaskOpen(true);
    };

    const indexOfLastTask = currentPage * itemsPerPage;
    const indexOfFirstTask = indexOfLastTask - itemsPerPage;
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

    const totalPages = Math.ceil(tasks.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const getShortDescription = (description) => {
        const words = description.split(" ");
        return words.length > 5 ? words.slice(0, 5).join(" ") + "..." : description;
    };

    const formatDate = (dateString) => {
        const options = { month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case 'in-progress':
                return 'text-yellow-600 bg-yellow-100';
            case 'completed':
                return 'text-green-600 bg-green-100';
            case 'pending':
                return 'text-red-600 bg-red-100';
            default:
                return '';
        }
    };

    if (!tasks) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full lg:w-[656px] border border-[#D0D5DD] rounded-lg bg-white shadow-xl">
            <p className="font-medium text-16 border-b border-[#D0D5DD] p-2">Tasks</p>
            <div className="p-2">
                {currentTasks.map((task) => (
                    <div
                        key={task.id}
                        className="border-b border-[#D0D5DD] flex justify-between items-center cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
                    >
                        <div className="flex items-center">
                            <FaBell size={20} />
                            <div className='flex flex-col items-start ml-3'>
                                <p onClick={() => viewTask(task)} className=" text-[16px] text-secondary font-semibold hover:underline">{task.title}</p>
                                <p className='text-gray-500 '>{getShortDescription(task.description)}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <p className={`px-1 py-1 text-sm rounded-full md:px-2 ${getStatusStyles(task.status)}`}>
                                {task.status}
                            </p>
                            <p className=" text-[#757575] text-xs lg:text-md">
                                {formatDate(task.due_date)}
                            </p>
                        </div>
                    </div>
                ))}
                <div className="flex items-center justify-center mt-4">
                    <button
                        className={`p-2 cursor-pointer ${currentPage === 1 ? 'text-gray-400' : 'text-blue-500'}`}
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <MdArrowBackIos />
                    </button>
                    <div className="text-gray-600">
                        Page {currentPage} of {totalPages}
                    </div>
                    <button
                        className={`p-2 cursor-pointer ${currentPage === totalPages ? 'text-gray-400' : 'text-blue-500'}`}
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <MdArrowForwardIos />
                    </button>
                </div>
                {selectedTask && (
                    <ViewTask
                        isOpen={isViewTaskOpen}
                        onClose={() => setIsViewTaskOpen(false)}
                        task={selectedTask}
                    />
                )}
            </div>
        </div>
    );
};

export default Tasks;
