# Movie Review Platform – Backend

This is the **Readme** for the Movie Review Platform built using **Node.js, Express, and MongoDB**.  
It handles authentication, user management.

---

## Instructions

- Many more features are in deelopment, loader and other features are yet to be build please wait until data fetches from backend and Database, while login and and other async function rendering executing

## Features

- User registration & login with JWT authentication
- Passwords hashed with bcrypt
- MongoDB with Mongoose models
- REST API endpoints for users (extendable for movies & reviews)
- `.env` support for environment variables

---

## ⚙️ Setup & Installation

Command Line

```bash
npm install
cd /Backend
```

Create .env root and copy following
(Since the site is deployed .env is hidden)

```env
PORT=
MONGO_URI=
JWT_SECRET=
```

Clone the repository

```bash
git clone https://github.com/PSD24-art/Funmovies-B
cd \Backend
```

Run the backend

```bash
npm run dev
```

Live Link

```
https://funmovies-fe.onrender.com/
```
