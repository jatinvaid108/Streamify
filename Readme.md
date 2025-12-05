# 🚀 Streamify — Real-Time Chat & Video Calling

Streamify is a MERN-based social & language-exchange app with real-time chat, video calls, friends system, onboarding flow, and theme customization.  
Powered by **Stream Chat** and **Stream Video** APIs.

---

## ⭐ Features

### 🔐 Auth & Security
- JWT authentication (HTTP-only cookies)
- Secure password hashing (bcrypt)
- Protected backend routes & frontend pages
- Onboarding required before accessing app

### 👤 User Onboarding
- Avatar upload or auto-generated avatar
- Bio + language selection
- Multi-step onboarding UI

### 👥 Friends System
- Send, accept, reject friend requests
- Friend-only chat & call permissions
- Recommended users *(future enhancement)*

### 💬 Real-Time Chat (Stream Chat)
- 1:1 & group messaging
- Typing indicators, reactions, read receipts
- File & image uploads
- Online/offline presence
- Message history stored on Stream servers

### 🎥 Video Calls (Stream Video)
- High-quality 1:1 & group video calls
- Screen sharing
- Camera & microphone toggles
- Real-time reactions
- Stream handles WebRTC layer

### 🎨 Themes & UI
- 32+ customizable themes
- Persistent theme storage
- TailwindCSS + Vite build system
- Responsive modern UI

---

## 🏗 Tech Stack

**Frontend:** React (Vite), TailwindCSS, TanStack Query, Zustand, Axios, Stream Chat SDK, Stream Video SDK  
**Backend:** Node.js, Express, MongoDB Atlas, Mongoose, JWT, Bcrypt, Stream Server SDK

---

## ⚙️ Setup

### 1️⃣ Clone
```sh
git clone https://github.com/jatinvaid108/Streamify
cd Streamify

🛠 Backend Setup
cd backend
npm install

Create .env:
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
STREAM_API_KEY=your_key
STREAM_API_SECRET=your_secret
STREAM_APP_ID=your_app_id

Run backend:
npm run dev

Runs at: http://localhost:5000

🖥 Frontend Setup
cd frontend
npm install

Create .env:
VITE_BACKEND_URL=http://localhost:5000
VITE_STREAM_API_KEY=your_key

Run frontend:
npm run dev

Runs at: http://localhost:5173

🔌 Stream API Setup

Create a Stream account → https://getstream.io

Create a Chat + Video App

Add your Key, Secret, App ID to backend .env

Backend (lib/stream.js) handles:

Creating Stream users

Generating tokens

Creating channels

Initializing call sessions

Frontend imports:
import { StreamChat } from "stream-chat";
import { StreamVideoClient } from "@stream-io/video-react-sdk";

🛡 Protected Routes
Backend
/api/users/*
/api/chat/*
/api/calls/*


Protected with:

JWT authentication

User verification middleware

Onboarding enforcement

Frontend

Redirects unauthenticated users to login

Redirects incomplete profiles to onboarding

📡 API Endpoints

Auth

POST /api/auth/signup

POST /api/auth/login

POST /api/auth/logout

GET /api/auth/me

Users

POST /api/users/:id/friend-request

POST /api/users/friend-request/:requestId/accept

GET /api/users/me

Chat

POST /api/chat/create-channel

POST /api/chat/token

Calls

POST /api/calls/initiate

🌐 Deployment

Frontend: Vercel / Netlify
Backend: Render / Railway / VPS
Database: MongoDB Atlas
Real-time: Stream Chat + Stream Video

Supports:

CORS

Cookies

Environment variables

📁 File Structure
backend/
  controllers/
  models/
  routes/
  middleware/
  lib/
  server.js

frontend/
  components/
  pages/
  hooks/
  lib/
  store/
  App.jsx

❤️ Author

Jatin Vaid
Full-Stack Developer — MERN • Real-Time Systems • Realtime Apps

⭐ Support

If this project helped you, please ⭐ the repo.
Your support motivates future updates! 😊