const express = require('express');
const router = express.Router();
const {
    addTaskController,
    getAllTasksController,
    updateTaskController,
    deleteTaskController,
    viewTaskController
} = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");


//routes
//add task route
router.post('/addTask', authMiddleware, addTaskController);

//view All tasks route
router.get('/tasks', authMiddleware, getAllTasksController);

// //update tasks route
router.post("/update", updateTaskController);

//delete tasks route
router.delete("/delete", authMiddleware, deleteTaskController);

//view task route
router.get("/task", viewTaskController);

module.exports = router;
