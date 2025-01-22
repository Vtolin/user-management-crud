User Management CRUD
A basic CRUD (Create, Read, Update, Delete) project built with Node.js and MySQL, designed to manage users in a MySQL database.


Prerequisites
Before starting, make sure you have the following installed:

Node.js (v14 or newer recommended)

MySQL (Workbench or CLI)

Features

Create: Add new users to the database.

Read: Retrieve user data.

Update: Edit existing user information.

Delete: Remove users from the database.


Getting Started

Follow these steps to set up and run the application.

Step 1: Clone the Repository
If using version control:

git clone https://github.com/your-username/user-management-crud.git

cd user-management-crud

Otherwise, create a folder and add the project files manually.


Step 2: Install Node.js Modules

Initialize the project and install the required dependencies:

npm init -y

npm install express mysql2 body-parser


Step 3: Set Up the MySQL Database

Create a new database in MySQL (e.g., using MySQL Workbench or CLI).

Import the provided SQL schema or run the necessary SQL commands to create the required tables. Example:

CREATE DATABASE user_management;

USE user_management;

CREATE TABLE users (

    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    age INT NOT NULL
);


Update the database connection details in your project files, usually located in config.js or within the app.js file:

const db = mysql.createConnection({

    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'user_management'
    
});


Step 4: Run the Application
Start the server with the following command:

node app.js
You should see this output in the terminal:

Connected to the MySQL database.

Server is running on http://localhost:3000


Step 5: Access the Application

Open your browser and go to http://localhost:3000. You can also use tools like Postman to test the CRUD endpoints.

GET /users - Retrieve all users.

POST /users - Add a new user.

PUT /users/:id - Update an existing user by ID.

DELETE /users/:id - Delete a user by ID.


Notes
Ensure that your MySQL service is running before starting the app.
Use environment variables (via a .env file) for sensitive information like database credentials.
This project is for educational purposes and can be extended with features like authentication or pagination.
