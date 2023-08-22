# Task-management-app
A Task Management Application using the MERN stack. The application allows users to create, update, and delete tasks. Each task has a title, description,
 due date, and status (e.g., "To Do," "In Progress," "Completed"). The application also provides a user authentication system.

# First-time configuration
* git clone https://github.com/Abrar124/task-management-app.git
* cd Task-management-App && run npm install for backend modules
* Now in Task-management-App directory type cd frontend && run npm install for frontend modules
* Add secret key for frontend
   * Create .env.local file in the root directory of the frontend
   * Add REACT_APP_JWT_SECRET_KEY = Your secret key
* Add secret key for Backend
   * Create .env file in the root directory of the backend
   * Add JWT_SECRET_KEY = Your secret key
* In server.js replace const mongoURI = 'key'; with your mongoURI

# Running the application
* In the root directory of Task-management-App run npm start to start the backend server
* In the directory of frontend open another terminal and run npm start to start the frontend server

# Features
* Implement user authentication using JWT (JSON Web Tokens) for user registration and login.
* Create a user dashboard where users can manage their tasks.
* Users should be able to create new tasks, providing a title, description, due date, and initial status.
* Allow users to update task details, including title, description, due date, and status.
* Provide a way for users to mark tasks as completed or move them to different statuses by using the edit button.
* Implement the ability to delete tasks.
* Display tasks in an organized and visually appealing manner.
* Implement validation and error handling for form submissions. Also for the empty fields
* Use MongoDB for storing task data and user details.
* Implement a RESTful API for communication between the front-end and back-end.
* Ensure responsive design for a seamless experience on different devices.
* **Advance features:**
   * Provide filtering options for tasks based on various criteria.
   * Implement different colors based on task status.
   * Nobody can directly access /dashboard route if he is not login.
   * Implement drag-and-drop functionality to change the order of tasks within different statuses but it's not implemented with backend connection.


