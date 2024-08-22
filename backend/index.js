const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require('./config/db');

const app = express();
dotenv.config();


// Middleware
app.use(cors());
app.use(bodyParser.json());


app.use("/api/user", require("./routes/authRoutes"));
app.use("/api/task", require("./routes/taskRoutes"));


const PORT = process.env.PORT;

if (!PORT) {
    console.error('Error: PORT is not defined in environment variables.');
    process.exit(1);
}
// Start the server
app.listen(PORT, (err) => {
    if (err) {
        console.error(`Failed to start server: ${err.message}`);
        process.exit(1);
    } else {
        console.log(`Server is running on port ${PORT}`);
    }
});
