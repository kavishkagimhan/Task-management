const moment = require("moment");
const db = require('../config/db');



// Add Task Controller
const addTaskController = async (req, res) => {
    try {
        // Prepare the task data
        const { title, description, user_id } = req.body;
        const due_date = moment(req.body.due_date, "DD-MM-YYYY").format("YYYY-MM-DD");
        const created_at = moment().format("YYYY-MM-DD HH:mm:ss");
        const status = "pending";

        // SQL query to insert the task
        const sql = `INSERT INTO tasks (title, description, status, due_date, created_at, user_id) VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [title, description, status, due_date, created_at, user_id];

        // Execute the query
        db.query(sql, values, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send({
                    success: false,
                    error: err,
                    message: "Error While Adding Task",
                });
            }

            res.status(200).send({
                success: true,
                message: "Task Added Successfully",
                taskId: result.insertId,
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error While Adding Task",
        });
    }
};


const getAllTasksController = async (req, res) => {
    try {
        const userId = req.query.userId;
        const sql = 'SELECT * FROM tasks WHERE user_id = ?';
        const values = [userId];

        // Execute the query
        db.query(sql, values, (err, result) => {
            if (err) {
                console.error("Error while fetching tasks:", err);
                return res.status(500).send({
                    success: false,
                    error: err,
                    message: "Error while fetching tasks",
                });
            }

            res.status(200).send({
                success: true,
                message: "Tasks fetched successfully",
                data: result,
            });
        });
    } catch (error) {
        console.error("Unexpected error while fetching tasks:", error.message);
        res.status(500).send({
            success: false,
            error,
            message: "Unexpected error while fetching tasks",
        });
    }
};


const deleteTaskController = (req, res) => {
    try {
        const taskId = req.query.taskId;
        const userId = req.query.userId; 
        if (!taskId) {
            return res.status(400).send({
                success: false,
                message: "Task ID is required",
            });
        }

        // First, check if the task exists and belongs to the user
        const sqlSelect = 'SELECT * FROM tasks WHERE id = ? AND user_id = ?';
        const valuesSelect = [taskId, userId];

        db.query(sqlSelect, valuesSelect, (err, result) => {
            if (err) {
                console.error("Error while fetching task:", err);
                return res.status(500).send({
                    success: false,
                    error: err,
                    message: "Error while fetching task",
                });
            }

            if (result.length === 0) {
                return res.status(404).send({
                    success: false,
                    message: "Task not found or you do not have permission to delete it",
                });
            }

            // If task exists, delete it
            const sqlDelete = 'DELETE FROM tasks WHERE id = ? AND user_id = ?';
            const valuesDelete = [taskId, userId];

            db.query(sqlDelete, valuesDelete, (err, result) => {
                if (err) {
                    console.error("Error while deleting task:", err);
                    return res.status(500).send({
                        success: false,
                        error: err,
                        message: "Error while deleting task",
                    });
                }

                res.status(200).send({
                    success: true,
                    message: "Task deleted successfully",
                });
            });
        });
    } catch (error) {
        console.error("Unexpected error while deleting task:", error.message);
        res.status(500).send({
            success: false,
            error,
            message: "Unexpected error while deleting task",
        });
    }
};

const viewTaskController = (req, res) => {
    try {
        const taskId = req.query.taskId; 
        const userId = req.query.userId;

        const sql = 'SELECT * FROM tasks WHERE id = ? AND user_id = ?';
        const values = [taskId, userId];

        // Execute the query
        db.query(sql, values, (err, result) => {
            if (err) {
                console.error("Error while fetching task:", err);
                return res.status(500).send({
                    success: false,
                    error: err,
                    message: "Error while fetching task",
                });
            }

            if (result.length === 0) {
                // No task found with the provided ID
                return res.status(404).send({
                    success: false,
                    message: "Task not found",
                });
            }

            // Return the task details
            res.status(200).send({
                success: true,
                message: "Task fetched successfully",
                data: result[0], 
            });
        });
    } catch (error) {
        console.error("Unexpected error while fetching task:", error.message);
        res.status(500).send({
            success: false,
            error,
            message: "Unexpected error while fetching task",
        });
    }
};

const updateTaskController = (req, res) => {
    const { taskId, userId } = req.body; 
    const { title, description, status, due_date } = req.body; 

    // Validate input
    if (!taskId || !userId || !title || !description || !status || !due_date) {
        return res.status(400).send({
            success: false,
            message: "Missing required fields",
        });
    }

    // Validate status
    const validStatuses = ['pending', 'in-progress', 'completed'];
    if (!validStatuses.includes(status)) {
        return res.status(400).send({
            success: false,
            message: "Invalid status",
        });
    }

    // Update the task
    const sql = `
        UPDATE tasks 
        SET title = ?, description = ?, status = ?, due_date = ? 
        WHERE id = ? AND user_id = ?`;

    const values = [title, description, status, due_date, taskId, userId];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error while updating task:", err);
            return res.status(500).send({
                success: false,
                error: err,
                message: "Error while updating task",
            });
        }

        if (result.affectedRows === 0) {
            // No rows affected, task might not exist or not belong to the user
            return res.status(404).send({
                success: false,
                message: "Task not found or no changes made",
            });
        }

        res.status(200).send({
            success: true,
            message: "Task updated successfully",
        });
    });
};





module.exports = {
    addTaskController,
    getAllTasksController,
    deleteTaskController,
    viewTaskController,
    updateTaskController
};
