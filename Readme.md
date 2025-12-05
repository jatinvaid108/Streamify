🚀 Streamify — Real-Time Chat & Video Calling Platform

A modern MERN stack social & language exchange platform featuring real-time chat, video calls, onboarding flow, friend system, theme customization, and secure authentication — powered by Stream Chat & Stream Video APIs.

⭐ Key Features
🔐 Authentication & Security

JWT authentication using HTTP-only cookies

Encrypted password hashing (bcrypt)

Protected backend API routes

Protected frontend routes based on onboarding & login state

Automatic redirect if the user is not onboarded

👤 User Onboarding

Upload or auto-generate avatar

Select languages + user bio

Onboarding required before accessing the app

Clean profile setup page

👥 Friends System

Send friend requests

Accept / Reject requests

Only friends can chat or call

Recommendations for new connections

Notification-like UI for requests

💬 Real-Time Chat (Stream Chat API)

1:1 & group chat channels

Real-time delivery (no refresh needed)

Reactions, typing indicators, presence

Image uploads & attachments

Read receipts

Online/offline status

Reliable + scalable (powered by Stream infrastructure)

🎥 Video Calling (Stream Video API)

One-to-one calls

Group video calls

Screen sharing

Reactions & call controls

Auto-managed WebRTC signaling by Stream

High-quality, low-latency call experience

🎨 UI / Themes

32+ beautiful themes

Persistent theme storage

Fully responsive design

Clean & modern components using TailwindCSS

🏗 Tech Stack
Frontend

React + Vite

Tailwind CSS

TanStack Query

Axios

Zustand (Theme Store)

Stream Chat SDK

Stream Video SDK

Backend

Node.js

Express.js

MongoDB Atlas + Mongoose

JWT Authentication

Stream Server SDK

Bcrypt


⚙️ Setup Instructions
1️⃣ Clone Repo

git clone https://github.com/jatinvaid108/Streamify
cd Streamify

🛠 Backend Setup
cd backend
npm install

Create .env in /backend:
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
STREAM_API_KEY=your_stream_key
STREAM_API_SECRET=your_stream_secret
STREAM_APP_ID=your_stream_app_id

Start Backend:
npm run dev


Backend runs at:
👉 http://localhost:5000

🖥 Frontend Setup
cd frontend
npm install

Create .env in /frontend:
VITE_BACKEND_URL=http://localhost:5000
VITE_STREAM_API_KEY=your_stream_key

Start Frontend:
npm run dev


Frontend runs at:
👉 http://localhost:5173

🔌 Stream API Configuration
1️⃣ Create an account

https://getstream.io/

2️⃣ Create a Chat + Video App

Copy the following into backend .env:

STREAM_API_KEY=
STREAM_API_SECRET=
STREAM_APP_ID=

3️⃣ Backend (lib/stream.js)

Handles:

Stream user creation

Token generation

Channel creation

Video call session setup

4️⃣ Frontend

Connects via:

import { StreamChat } from "stream-chat";
import { StreamVideoClient } from "@stream-io/video-react-sdk";

🛡 Protected Routes
Backend Protected Routes:
/api/users/*
/api/chat/*
/api/calls/*


Middleware checks:

JWT validity

User onboarding status

Frontend Route Protection:

Redirects unauthenticated users to Login

Redirects non-onboarded users to Onboarding

📡 Key API Endpoints
Auth
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me

Users
POST /api/users/:id/friend-request
POST /api/users/friend-request/:requestId/accept
GET  /api/users/me

Chat
POST /api/chat/create-channel
POST /api/chat/token

Calls
POST /api/calls/initiate

🌐 Deployment Ready

Frontend: Vercel / Netlify

Backend: Render / Railway

Support for environment variables

Handles CORS + cookies correctly

Fully supports Stream APIs in production

📁 Simplified Project Structure
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
Full-Stack Developer | MERN | Real-Time Apps | System Design