# Budgify – Expense Tracker

Budgify is a full-stack expense tracking application built with **React, Node.js, Express, and MongoDB**. It lets users record expenses, view their tracked expenses, edit existing entries, and delete entries.

## Features

- **Add expenses** with a title, amount, date, and category.
- **View tracked expenses** displayed as individual cards.
- **Edit expenses** and save the updated information.
- **Delete expenses** from the tracker.
- **Expense categories:** Food, Petrol, and EMI.
- **Indian date formatting** for displayed expense dates.
- **MongoDB persistence** through a Node.js/Express REST API.
- **Responsive styling** with a card-based layout and form animation.

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- Axios
- CSS

### Backend
- Node.js
- Express
- Mongoose

### Database
- MongoDB

## Project Structure

```text
expense-tracker/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   └── expressModels.js
│   ├── index.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── buttons.jsx
│   │   │   └── expenseForm.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## Prerequisites

Install the following before running the project:

- [Node.js](https://nodejs.org/) (which includes npm)
- [MongoDB](https://www.mongodb.com/) database (MongoDB Atlas or a local MongoDB instance)
- A code editor such as [Visual Studio Code](https://code.visualstudio.com/)

## Getting Started

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
cd expense-tracker
```

### 2. Configure the MongoDB connection

The backend needs a MongoDB connection string.

**Security note before publishing:** the uploaded project currently contains a MongoDB Atlas connection string directly in `backend/config/db.js`. Do not publish that credential. Rotate/revoke the exposed database password in MongoDB Atlas, then update the project to read the connection string from an environment variable instead of hardcoding it.

For example, update `backend/config/db.js` to use:

```javascript
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
```

Create a `backend/.env` file:

```env
MONGODB_URI=your_mongodb_connection_string
```

Make sure `.env` is listed in `.gitignore` and is **never committed to GitHub**. The example above expects the environment variable to be loaded before the backend starts. With a recent Node.js version, you can start it using:

```bash
node --env-file=.env index.js
```

For development with Nodemon, use:

```bash
node --env-file=.env ./node_modules/nodemon/bin/nodemon.js index.js
```

Alternatively, configure an environment-variable loader and the backend start scripts for your development setup.

### 3. Install backend dependencies

Open a terminal:

```bash
cd backend
npm install
```

### 4. Start the backend

From the `backend` directory:

```bash
npm start
```

The API server runs at:

```text
http://localhost:8000
```

For development, the project also includes a Nodemon script:

```bash
npm run dev
```

If you use the `.env` setup above, start the backend with the corresponding `--env-file` command so `MONGODB_URI` is available.

### 5. Install frontend dependencies

Open a second terminal and navigate to the frontend folder:

```bash
cd frontend
npm install
```

### 6. Start the frontend

```bash
npm run dev
```

Vite will print the local development URL in the terminal (typically `http://localhost:5173`).

Keep both the backend and frontend servers running while using the application. The Vite development server proxies `/api` requests to `http://127.0.0.1:8000`.

## API Endpoints

The Express backend currently provides these expense endpoints:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/expenses` | Retrieve all expenses |
| `POST` | `/api/expenses` | Create a new expense |
| `PUT` | `/api/expenses/:id` | Update an expense by its MongoDB ID |
| `DELETE` | `/api/expenses/:id` | Delete an expense by its MongoDB ID |

### Expense data format

The API uses the following fields:

```json
{
  "title": "Groceries",
  "amount": 850,
  "category": "Food",
  "date": "2026-11-23"
}
```

## How to Use

1. Start the backend and frontend servers.
2. Open the frontend URL shown by Vite.
3. Select **Add Expense**.
4. Enter the expense title, amount, date, and category.
5. Submit the form to save the expense.
6. View saved expenses in the **Tracked Expenses** section.
7. Use the edit icon to update an expense.
8. Use the delete icon to remove an expense.

## Available Scripts

### Backend (`backend/`)

| Command | Description |
|---|---|
| `npm start` | Start the Express server |
| `npm run dev` | Start the server with Nodemon |

### Frontend (`frontend/`)

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the frontend for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint |

## Current Scope and Possible Improvements

The current version focuses on basic expense CRUD operations. Some possible future enhancements include:

- Monthly and category-wise expense summaries.
- Charts and spending analytics.
- Search, filtering, and sorting.
- User registration and login with separate personal expense records.
- Input validation and more detailed API error handling.
- Deployment of the frontend, backend, and database.

## Notes for GitHub

Before pushing the project:

1. Rotate the MongoDB password that was included in the uploaded source code.
2. Keep database credentials in environment variables, not source files.
3. Add `.env`, `node_modules/`, and build output folders to `.gitignore`.
4. Do not upload `node_modules`; GitHub users can install dependencies with `npm install`.

## License

No license is currently specified. Add a `LICENSE` file if you want to define how others may use, modify, or distribute this project.


