import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { toast } from 'react-toastify';
import ConformationDialog from '../components/dialog Boxes/ConformationDialog';
import ViewTask from '../components/dialog Boxes/ViewTaks';
import UpdateDialog from '../components/dialog Boxes/UpdateDialog';
import { fetchTasks, deleteTask, updateTask } from '../redux/features/taskSlice';
import SearchBox from '../components/SearchBox';

const AllTasks = () => {
    const dispatch = useDispatch();
    const { tasks } = useSelector((state) => state.tasks);
    const { user } = useSelector((state) => state.user);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [taskIdToDelete, setTaskIdToDelete] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isViewTaskOpen, setIsViewTaskOpen] = useState(false);
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');  // Add state for search query

    useEffect(() => {
        if (user && user.id) {
            dispatch(fetchTasks(user.id));
        }
    }, [user, dispatch]);

    const handleDeleteClick = (id) => {
        setTaskIdToDelete(id);
        setIsDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        if (!taskIdToDelete) return;
        dispatch(deleteTask({ userId: user.id, taskId: taskIdToDelete }))
            .unwrap()
            .then(() => {
                toast.success("Task deleted successfully!", { position: "top-right" });
            })
            .catch((error) => {
                toast.error("An error occurred while deleting the task", { position: "top-right" });
                console.error("Error deleting task:", error);
            })
            .finally(() => {
                setIsDialogOpen(false);
            });
    };

    const viewTask = (task) => {
        setSelectedTask(task);
        setIsViewTaskOpen(true);
    };

    const handleUpdateClick = (task) => {
        setSelectedTask(task);
        setIsUpdateDialogOpen(true);
    };

    const handleUpdateTask = (updatedTask) => {
        dispatch(updateTask({ updatedTask, userId: user.id, taskId: selectedTask.id }))
            .unwrap()
            .then(() => {
                toast.success("Task updated successfully!", { position: "top-right" });
            })
            .catch((error) => {
                toast.error("An error occurred while updating the task", { position: "top-right" });
                console.error("Error updating task:", error);
            })
            .finally(() => {
                setIsUpdateDialogOpen(false);
            });
    };

    const getShortDescription = (description) => {
        const words = description.split(" ");
        return words.length > 5 ? words.slice(0, 5).join(" ") + "..." : description;
    };

    // Filter tasks based on the search query
    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex bg-[#f6f5f5] w-screen h-screen">
            <div className="flex-none">
                <Sidebar />
            </div>
            <div className="flex flex-col flex-grow overflow-y-scroll">
                <Navbar />
                <h4 className='font-semibold text-[20px] cursor-pointer p-2'>All Tasks</h4>
                <div className="p-6 w-[100%]">
                    <SearchBox searchQuery={searchQuery} handleSearchChange={setSearchQuery} />
                    <table className="min-w-full bg-white border-collapse">
                        <thead className='text-black bg-gray-300'>
                            <tr>
                                <th className="px-6 py-3 text-sm tracking-wider text-left text-gray-800 uppercase font-sm medium">
                                    Title
                                </th>
                                <th className="px-6 py-3 text-sm tracking-wider text-left text-gray-800 uppercase font-sm medium">
                                    Description
                                </th>
                                <th className="px-6 py-3 text-sm tracking-wider text-left text-gray-800 uppercase font-sm medium">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-sm tracking-wider text-left text-gray-800 uppercase font-sm medium">
                                    Due Date
                                </th>
                                <th className="px-6 py-3 text-sm tracking-wider text-left text-gray-800 uppercase font-sm medium">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTasks.length > 0 ? (
                                filteredTasks.map((task) => (
                                    <tr key={task.id} className="transition-all duration-200 border-b hover:bg-gray-100 hover:shadow-md">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                                            {task.title}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            {getShortDescription(task.description)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            {task.status}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            {new Date(task.due_date).toLocaleDateString()}
                                        </td>
                                        <td className="flex gap-3 px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            <button onClick={() => handleDeleteClick(task.id)} className="text-xl text-blue-900 cursor-pointer hover:shadow-md">
                                                <MdDelete />
                                            </button>
                                            <button
                                                onClick={() => handleUpdateClick(task)}
                                                className="text-xl text-red-800 cursor-pointer hover:shadow-md"
                                            >
                                                <MdModeEditOutline />
                                            </button>
                                            <button
                                                onClick={() => viewTask(task)}
                                                className='text-xl text-green-800 cursor-pointer hover:shadow-md'
                                            >
                                                <IoEye />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-sm text-center text-gray-500 whitespace-nowrap">
                                        No tasks found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <ConformationDialog
                        isOpen={isDialogOpen}
                        onClose={() => setIsDialogOpen(false)}
                        onConfirm={handleConfirmDelete}
                        message="Are you sure you want to delete this item?"
                    />
                    {selectedTask && (
                        <ViewTask
                            isOpen={isViewTaskOpen}
                            onClose={() => setIsViewTaskOpen(false)}
                            task={selectedTask}
                        />
                    )}
                    {selectedTask && (
                        <UpdateDialog
                            isOpen={isUpdateDialogOpen}
                            onClose={() => setIsUpdateDialogOpen(false)}
                            task={selectedTask}
                            onUpdate={handleUpdateTask}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllTasks;
