import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Utility function to save tasks to local storage
const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Utility function to get tasks from local storage
const getTasksFromLocalStorage = () => {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : null;
};

// Async action to fetch tasks
export const fetchTasks = createAsyncThunk(
    "tasks/fetchTasks",
    async (userId, { rejectWithValue }) => {
        try {
            const localTasks = getTasksFromLocalStorage();
            if (localTasks) {
                return localTasks; // Return tasks from local storage if available
            }

            const res = await axios.get("http://localhost:5000/api/task/tasks", {
                params: { userId },
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });

            if (res.data.success) {
                const tasks = res.data.data;
                console.log("fetch tasks worked")
                saveTasksToLocalStorage(tasks); // Save tasks to local storage on first fetch
                return tasks;
            } else {
                return rejectWithValue(res.data.message);
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Async action to add a task
export const addTask = createAsyncThunk(
    'tasks/addTask',
    async ({ title, description, due_date, user_id }, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:5000/api/task/addTask", {
                title,
                description,
                due_date,
                user_id
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.data.success) {
                // After successfully adding a task, fetch all tasks again
                await dispatch(fetchTasks(user_id));
                localStorage.removeItem("tasks");
                return response.data.task;
            } else {
                return rejectWithValue(response.data.message || "Failed to add task");
            }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// Async action to update a task
export const updateTask = createAsyncThunk(
    "tasks/updateTask",
    async ({ updatedTask, userId, taskId }, { rejectWithValue }) => {

        try {
            const res = await axios.post(
                "http://localhost:5000/api/task/update",
                { ...updatedTask, userId, taskId },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
            );
           

            if (res.data.success) {
                return { taskId, updatedTask };  // Return the updated task
            } else {
                return rejectWithValue(res.data.message);
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Async action to delete a task
export const deleteTask = createAsyncThunk(
    "tasks/deleteTask",
    async ({ userId, taskId }, { rejectWithValue }) => {
        try {
            const res = await axios.delete("http://localhost:5000/api/task/delete", {
                params: { userId, taskId },
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });

            if (res.data.success) {
                return taskId;  
            } else {
                return rejectWithValue(res.data.message);
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const taskSlice = createSlice({
    name: "tasks",
    initialState: {
        tasks: [],
        status: null,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle addTask
            .addCase(addTask.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasks.push(action.payload); 
                // No need to save to local storage here since fetchTasks will update it
            })
            .addCase(addTask.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Handle fetchTasks
            .addCase(fetchTasks.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.tasks = action.payload;  // Store the fetched tasks
                saveTasksToLocalStorage(state.tasks); // Save fetched tasks to local storage
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || action.error.message;
            })

            // Handle updateTask
            .addCase(updateTask.fulfilled, (state, action) => {
                const { taskId, updatedTask } = action.payload;
                state.tasks = state.tasks.map((task) =>
                    task.id === taskId ? { ...task, ...updatedTask } : task
                );
                saveTasksToLocalStorage(state.tasks); // Save updated tasks to local storage
            })

            // Handle deleteTask
            .addCase(deleteTask.fulfilled, (state, action) => {
                const taskId = action.payload;
                state.tasks = state.tasks.filter((task) => task.id !== taskId);
                saveTasksToLocalStorage(state.tasks); // Save updated tasks to local storage
            });
    },
});

export default taskSlice.reducer;
