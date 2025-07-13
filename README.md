# JobTrackr

A full-stack Job Application Tracker built with Django REST Framework and React.  
Helps job seekers keep track of their job applications, statuses, notes, and resumes — all in one clean dashboard.

---

## 🚀 Live Demo

> Coming soon – to be deployed on **Render** (backend) and **Vercel** (frontend)

---

## 🧩 Tech Stack

**Frontend**:
- React
- Vite
- Axios
- React Router DOM

**Backend**:
- Django
- Django REST Framework
- Simple JWT for authentication
- PostgreSQL (soon)
- Django Admin

---

## ✨ Features

- 🔐 JWT authentication
- 📋 Add, view, and delete job applications
- 📝 Notes and resume upload
- 🎯 Filter jobs per user
- 🧾 Admin panel for superusers
- 🔄 Frontend and backend decoupled

---

## 📂 Folder Structure

Jobapp/
├── jobtracker# Django backend
├── jobtrackr-frontend/ # React frontend (Vite)
├── venv/ # Python virtual environment
└── README.md

---

## 🛠️ Setup Instructions

### 1. Backend – Django

bash
cd jobtrackr_backend
python -m venv venv
venv\Scripts\activate        # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver

**### 2. Frontend – React (Vite)**
bash
Copy
Edit
cd jobtrackr-frontend
npm install
npm run dev

Visit frontend: http://localhost:5173
Visit backend: http://localhost:8000

**🔐 API Endpoints**
POST /api/token/ – Get JWT access/refresh token
GET /api/jobs/ – List job applications
POST /api/jobs/ – Add a new job
DELETE /api/jobs/<id>/ – Delete a job

📦 Coming Soon
Job edit & update
User registration
Deployment
Tailwind styling

🧑‍💻 Author
Mumtha Purushothaman
Full-stack Developer | Django • React
https://github.com/Mumtha02/
