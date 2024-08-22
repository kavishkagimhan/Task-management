import React from 'react';

const ViewTask = ({ isOpen, onClose, task }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className='p-4 bg-white rounded-lg shadow-xl'>
                <h2 className="text-2xl font-bold text-gray-800">Task Details</h2>
                <div className='flex flex-col items-center gap-2 md:flex-row '>
                    <img className='md:w-[300px] w-[150px]' src="https://img.freepik.com/free-vector/isometric-time-management-concept-illustrated_52683-55534.jpg" alt="" />
                    <div className="w-full max-w-md p-6 mx-4 ">

                        <div className="mt-4">
                            <p className="text-lg font-semibold text-gray-600">Title:</p>
                            <p className="text-gray-800">{task.title}</p>
                        </div>
                        <div className="mt-4">
                            <p className="text-lg font-semibold text-gray-600">Description:</p>
                            <p className="text-gray-800">{task.description}</p>
                        </div>
                        <div className="mt-4">
                            <p className="text-lg font-semibold text-gray-600">Status:</p>
                            <p className="text-gray-800">{task.status}</p>
                        </div>
                        <div className="mt-4">
                            <p className="text-lg font-semibold text-gray-600">Due Date:</p>
                            <p className="text-gray-800">{new Date(task.due_date).toLocaleDateString()}</p>
                        </div>
                        <div className="flex justify-end mt-6 space-x-2">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewTask;
