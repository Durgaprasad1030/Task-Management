# 📝 Task Manager with Role-Based Access Control (RBAC)

A full-stack **MERN** application designed to manage tasks with specific permissions for **Admins** and **Standard Users**. This project demonstrates secure authentication, role-based data fetching, and a modern, responsive UI.

---

## 🚀 Features

### 🔐 Authentication & Security
- **User Registration & Login** with JWT (JSON Web Token).
- **Role-Based Access:**
  - **Admin:** Can view, edit, and delete *all* tasks and see user details.
  - **User:** Can only view, edit, and delete their *own* tasks.
- **Password Hashing** using bcrypt.js.
- **Protected Routes** on the frontend.

### 📋 Task Management
- **CRUD Operations:** Create, Read, Update, Delete tasks.
- **Search & Filter:** Real-time search by title and filtering by task status (Pending, In Progress, Completed).
- **Pagination:** Efficiently load tasks in chunks.

### 🎨 UI/UX
- **Modern Interface:** Clean, card-based layout with shadows and rounded corners.
- **Animations:** Smooth entry animations, hover effects, and focus states.
- **Responsive:** Works on desktop and mobile.
- **User Feedback:** Inline error handling and loading states.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, React Router v6, Axios, CSS3 (Custom Animations).
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB (Mongoose ODM).
- **Auth:** JWT (JSON Web Tokens), Bcrypt.

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd task-manager


2. Backend Setup
Navigate to the backend folder and install dependencies:

Bash

cd backend
npm install
Create a .env file in the backend folder and add the following variables:

Code snippet

PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=mySuperSecretKey123
Start the Backend Server:

Bash

npm run dev
(You should see "MongoDB Connected" in the terminal)

3. Frontend Setup
Open a new terminal window, navigate to the frontend folder, and install dependencies:

Bash

cd frontend
npm install
Start the React App:

Bash

npm start
The app will automatically open at http://localhost:3000.

🧪 Testing with Sample Data (Seeder)
You can quickly populate the database with test users and tasks using the included script.

Run this command inside the /backend folder:

Bash

node seeder.js
Use these credentials to test:

Role	Email	Password	Capabilities
Admin	admin@example.com	password123	View/Edit/Delete ALL tasks
User	jane@example.com	password123	Manage OWN tasks only
User	john@example.com	password123	Manage OWN tasks only

Export to Sheets

🔗 API Endpoints
Method	Endpoint	Description	Access
POST	/api/auth/register	Register a new user	Public
POST	/api/auth/login	Login & get Token	Public
GET	/api/tasks	Get all tasks (supports ?search= & ?status=)	Auth Required
POST	/api/tasks	Create a new task	Auth Required
PUT	/api/tasks/:id	Update a task	Owner/Admin
DELETE	/api/tasks/:id	Delete a task	Owner/Admin

Export to Sheets

📂 Project Structure
Plaintext

task-manager/
├── backend/
│   ├── config/         # Database connection logic
│   ├── controllers/    # Logic for Authentication and Task CRUD
│   ├── middleware/     # Auth verification & Admin checks
│   ├── models/         # Mongoose Schemas (User, Task)
│   ├── routes/         # API Routes definitions
│   ├── seeder.js       # Script to populate dummy data
│   └── server.js       # App entry point
│
└── frontend/
    ├── src/
    │   ├── components/ # Reusable components (Navbar, PrivateRoute)
    │   ├── pages/      # Main pages (Login, Dashboard, TaskForm)
    │   ├── utils/      # Axios configuration
    │   └── App.css     # Global styling and animations
🛡️ Future Improvements
To make this project enterprise-ready, the following features are planned:

[ ] Forgot Password: Email reset link via Nodemailer.

[ ] Security Hardening: HttpOnly Cookies instead of localStorage.

[ ] File Uploads: Profile pictures using Multer & Cloudinary.

[ ] Deployment: Hosting on Render/Vercel.

Developed by [Your Name]"# Task-Management" 
