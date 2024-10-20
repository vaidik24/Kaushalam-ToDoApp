# To-Do List Application

A simple and intuitive to-do list application built with React for the front end and Node.js/Express for the back end. This application allows users to create, view, and manage their tasks effectively.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (Login/Signup)
- Add, view,update,delete and complete tasks
- User-specific task management (only logged-in users can update or delete tasks)
- Responsive design for mobile and desktop

## Technologies Used

- **Frontend**:

  - React
  - React Router
  - CSS (for styling)

- **Backend**:
  - Node.js
  - Express
  - MongoDB (or any other database you use)
  - JWT (for authentication)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/vaidik24/Kaushalam-ToDoApp.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Kaushalam-ToDoApp
   ```
3. Install the frontend dependencies:

   ```bash
    cd Frontend
    npm install
   ```

4. Install the backend dependencies:
   ```bash
   cd ../Backend
   npm install
   ```
5. Set up environment variables:
   Create a .env file in the backend directory and add the required environment variables refer to the .envsample . (like MongoDB URI, JWT secret, etc.).

6.Start the backend server:

```bash
npm run dev
```

7.Start the frontend:

```bash
cd ../Frontend
npm run dev
```
