# User Management CRUD

A basic CRUD (Create, Read, Update, Delete) project built with Node.js and MySQL to manage users in a database.

![Node.js](https://img.shields.io/badge/Node.js-v14%2B-brightgreen) ![MySQL](https://img.shields.io/badge/MySQL-Supported-blue)

## 🚀 Features
- REST API with CRUD operations
- MySQL database integration
- Express.js for server-side logic
- Body-parser for handling requests

## 📌 Prerequisites
Ensure you have the following installed:
- **Node.js** (v14 or newer)
- **MySQL** (Workbench or CLI)

## 📖 Installation
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/user-management-crud.git
cd user-management-crud
```
Or manually download and extract the files.

2️⃣ Install Dependencies
```
npm init -y
npm install express mysql2 body-parser
```
3️⃣ Set Up MySQL Database

Create a new database in MySQL (Workbench/CLI):
```
CREATE DATABASE user_management;
USE user_management;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  age INT NOT NULL
);
```
Update database connection details in config.js:
```
const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'user_management'
});
```
4️⃣ Run the Server
```
node app.js
```
Expected Output:
```
Connected to the MySQL database.
Server is running on http://localhost:3000
```
🛠️ API Endpoints
- Use Postman or a browser to test:
- GET /users → Retrieve all users
- POST /users → Add a new user
- PUT /users/:id → Update a user
- DELETE /users/:id → Delete a user


📜 Notes

Ensure MySQL service is running before starting the app.
Use .env files for sensitive credentials.
This project is for educational purposes but can be extended.


📄 License
This project is licensed under the MIT License.
