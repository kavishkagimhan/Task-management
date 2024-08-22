import React, { useState, useEffect } from 'react';

const UpdateDialog = ({ isOpen, onClose, task, onUpdate }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');
    const [dueDate, setDueDate] = useState('');

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setStatus(task.status);
            setDueDate(new Date(task.due_date).toISOString().split('T')[0]);
        }
    }, [task]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onUpdate) {
            onUpdate({ title, description, status, due_date: dueDate });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="w-5/6 p-6 bg-white rounded-lg shadow-lg lg:w-1/3">
                <h3 className="mb-4 text-lg font-semibold">Update Task</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="block w-full px-4 py-2 mt-1 bg-gray-100 border rounded-md shadow-sm border-secondary"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="4"
                            className="block w-full p-2 mt-1 bg-gray-100 border rounded-md shadow-sm border-secondary"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="block w-full px-4 py-2 mt-1 bg-gray-100 border rounded-md shadow-sm border-secondary"
                            required
                        >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
                        <input
                            type="date"
                            id="dueDate"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="block w-full px-4 py-2 mt-1 bg-gray-100 border rounded-md shadow-sm border-secondary"
                            required
                        />
                    </div>
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-white bg-gray-300 rounded-md shadow-sm hover:bg-red-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white rounded-md shadow-sm bg-secondary hover:bg-purple-700"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateDialog;
