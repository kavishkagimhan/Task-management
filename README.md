# Task Management Application

## Overview
This Task Management Application allows users to create, view, update, and delete tasks. Each user can manage their own tasks, with functionality for setting task titles, descriptions, statuses, and due dates. The application is built using the MERN stack (MongoDB, Express.js, React, Node.js) and includes user authentication.

## Features
- **User Authentication:** Secure login and registration using JWT.
- **Task Management:** Create, read, update, and delete tasks.
- **Task Status:** Tasks can have a status of `pending`, `in-progress`, or `completed`.
- **User-specific Data:** Each user has access only to their own tasks.
- **Responsive Design:** The application is fully responsive and works across different screen sizes.

## Tech Stack
- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **State Management:** Redux (for managing user and task states)
- **Authentication:** JWT (JSON Web Tokens)
- **API Client:** Axios

## Installation

### Prerequisites
- Node.js
- MySQL

### Backend Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/kavishkagimhan/Task-management.git
    cd Task-management
    ```
2. Install backend dependencies:
    ```bash
    cd backend
    npm install
    ```
3. Create a `.env` file in the `backend` directory and configure your environment variables:
    ```env
    PORT=5000
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_NAME=task_management
    JWT_SECRET=your_jwt_secret
    ```
4. Set up the MySQL database:
    ```sql
    CREATE DATABASE task_management;
    ```
5. Run database migrations (if you have any) or use an ORM to set up your database schema.
6. Start the backend server:
    ```bash
    npm start
    ```

### Frontend Setup
1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2. Install frontend dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file in the `frontend` directory and add the following environment variable:
    ```env
    REACT_APP_API_URL=http://localhost:5000/api
    ```
4. Start the frontend development server:
    ```bash
    npm start
    ```

## Usage

1. **Register/Login:**
   - Open the application in your browser and register for a new account or log in using existing credentials.
   
2. **Manage Tasks:**
   - Navigate to the "Add Task" page to create new tasks.
   - View all tasks on the "All Tasks" page, where you can edit or delete tasks.
   
3. **Task Status:**
   - Set the status of each task to keep track of its progress (Pending, In-progress, Completed).

## API Endpoints

### User Routes
- **POST /api/user/register:** Register a new user.
- **POST /api/user/login:** Login an existing user.
- **POST /api/user/getUserData:** Fetch user data using JWT.

### Task Routes
- **POST /api/tasks/addTask:** Add a new task.
- **GET /api/tasks:** Get all tasks for the authenticated user.
- **PUT /api/tasks/updateTask/:id:** Update a task by ID.
- **DELETE /api/tasks/deleteTask/:id:** Delete a task by ID.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request for review.

## License
This project is licensed under the MIT License.

## Contact
For any questions or inquiries, please contact [your email](mailto:kavishkagimhan23@gmail.com).
