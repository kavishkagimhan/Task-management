import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { addTask } from '../redux/features/taskSlice';

const AddTask = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const taskData = { title, description, due_date: dueDate, user_id: user.id };
      const resultAction = await dispatch(addTask(taskData)).unwrap();
      window.location.reload();
      if (resultAction) {
        toast.success("Task added successfully!", { position: "top-right" });
        setTitle('');
        setDescription('');
        setDueDate('');

      }
    } catch (error) {
      toast.error(error || "An error occurred while adding the task", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-[#f6f5f5] w-screen h-screen">
      <div className="flex-none">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-grow overflow-y-scroll">
        <Navbar />
        <h4 className='font-semibold text-[20px] cursor-pointer p-2'>Add Task</h4>
        <div className="p-6 w-[100%] flex gap-4 items-center justify-between max-w-[1000px] mx-auto">
          <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="title">
                Task Title
              </label>
              <input
                type="text"
                id="title"
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter task description"
                rows="4"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="dueDate">
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="px-4 py-2 font-bold text-white rounded bg-primary hover:bg-secondary focus:outline-none focus:shadow-outline"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Task"}
              </button>
            </div>
          </form>
          <div className='max-w-[400px] h-[400px] hidden md:flex rounded-lg shadow-xl'>
            <img src="https://img.freepik.com/free-vector/hand-drawn-business-planning-with-task-list_23-2149164275.jpg" alt="Task illustration" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
