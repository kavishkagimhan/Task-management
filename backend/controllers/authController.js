const bcrypt = require("bcryptjs");
const db = require("../config/db"); 
const moment = require("moment");
const jwt = require("jsonwebtoken");

// Register callback
const signupController = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        // Check if the user already exists
        const [existingUser] = await new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE email = ?';
            db.query(query, [email], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });

        if (existingUser) {
            return res.status(200).send({ message: "User Already Exists", success: false });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = {
            email,
            password: hashedPassword,
            created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
            name
        };

        await new Promise((resolve, reject) => {
            const query = 'INSERT INTO users SET ?';
            db.query(query, newUser, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });

        res.status(201).send({ message: "Registered Successfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: `Register Controller ${error.message}`,
        });
    }
};



//login controller
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const [user] = await new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE email = ?';
            db.query(query, [email], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });

        if (!user) {
            return res.status(200).send({ message: "User not found", success: false });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(200).send({ message: "Invalid Email or Password", success: false });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        // Respond with a success message, token, and user details
        res.status(200).send({
            message: "Login Success",
            success: true,
            token,
            user: {
                id: user.id,
                email: user.email,
                createdAt: user.created_at,
                name: user.name
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: `Error in Login Controller: ${error.message}` });
    }
};


const authController = async (req, res) => {
    try {
        const { userId } = req.body;

        // Check if the user exists by ID
        const [user] = await new Promise((resolve, reject) => {
            const query = 'SELECT id, email, name, created_at FROM users WHERE id = ?';
            db.query(query, [userId], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });

        if (!user) {
            return res.status(200).send({
                message: "User not found",
                success: false,
            });
        }

        // Send back user details excluding the password
        res.status(200).send({
            success: true,
            data: user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "Auth error",
            success: false,
            error,
        });
    }
};


module.exports = {
    signupController,
    loginController,
    authController
};
