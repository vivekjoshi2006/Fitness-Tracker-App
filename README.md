# 🥗 FitTrack

### Full-Stack Fitness & Nutrition Tracking Platform

FitTrack is a modern full-stack web application that helps users monitor fitness goals, nutrition intake, activity levels, and overall health metrics through an intuitive and responsive interface.

Built using **React.js**, **Node.js**, and **Express.js**, the application demonstrates modern full-stack development practices, secure authentication, responsive UI design, and a stateless architecture optimized for serverless deployment environments.

---

## ✨ Highlights

* 🔐 JWT-based Authentication & Authorization
* 📊 Interactive Weekly Progress Analytics
* ⚖️ Automatic BMI Calculation & Classification
* 🍎 Nutrition Tracking & Calorie Monitoring
* 🏃 Activity & Workout Logging
* 🌙 Dark Mode Support
* 📱 Fully Responsive Design
* ☁️ Serverless Deployment Ready
* 🏗️ Stateless JWT Session Architecture

---

## 📖 Overview

FitTrack enables users to:

* Create and manage personalized fitness profiles
* Track daily calorie intake and physical activities
* Monitor BMI and health indicators
* View weekly fitness insights through visual analytics
* Maintain progress across sessions using token-based state management

The project was designed with deployment simplicity in mind, making it suitable for modern serverless platforms while maintaining a smooth user experience.

---

## 🏗️ Architecture

### Stateless JWT Session Architecture

Unlike traditional applications that rely on databases for session persistence, FitTrack employs a stateless authentication model designed specifically for serverless environments.

#### How It Works

1. **Authentication**

   * Users register or log in through secure JWT-based authentication.

2. **Token-Carried User State**

   * Essential profile information is embedded within a signed JWT payload.

3. **Protected Route Processing**

   * Middleware validates and decodes the token.
   * Updated profile information is re-signed and returned as a fresh token.

4. **Serverless Compatibility**

   * User sessions remain functional across cold starts and server restarts.
   * No persistent database is required for demonstration deployments.

### Benefits

✅ Simplified deployment

✅ No database configuration required

✅ Stateless and horizontally scalable

✅ Ideal for serverless hosting platforms

---

## 🚀 Features

### 👤 User Authentication

* Secure JWT authentication
* Protected API routes
* Session validation middleware
* Password hashing using bcrypt.js

### 🎯 Personalized Onboarding

* Multi-step onboarding workflow
* Fitness goal selection
* Height, weight, and age tracking
* Personalized calorie estimation

### 🍽️ Nutrition Management

* Food intake logging
* Calorie monitoring
* Entry management and deletion

### 🏃 Activity Tracking

* Workout logging
* Calories burned tracking
* Activity management dashboard

### 📈 Health Analytics

* BMI computation
* BMI classification indicator
* Weekly intake vs. burn analytics
* Interactive progress charts

### 🎨 User Experience

* Responsive mobile-first design
* Persistent navigation sidebar
* Dark and Light theme support
* Clean and accessible interface

---

## 🛠️ Technology Stack

### Frontend

| Technology       | Purpose          |
| ---------------- | ---------------- |
| React.js         | UI Development   |
| Vite             | Build Tool       |
| Tailwind CSS     | Styling          |
| React Router DOM | Routing          |
| Context API      | State Management |

### Backend

| Technology | Purpose              |
| ---------- | -------------------- |
| Node.js    | Runtime Environment  |
| Express.js | REST API Development |

### Security & Authentication

| Technology | Purpose               |
| ---------- | --------------------- |
| JWT        | Authentication        |
| bcrypt.js  | Password Hashing      |
| CORS       | Cross-Origin Security |

---

## 📂 Project Structure

```text
fittrack/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── mockDb.js
│   ├── vercel.json
│   └── server.js
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── hooks/
    │   ├── pages/
    │   ├── services/
    │   └── utils/
    ├── index.html
    ├── tailwind.config.cjs
    ├── postcss.config.cjs
    └── vite.config.js
```

---

## ⚙️ Local Setup

### Prerequisites

* Node.js
* npm

### Backend

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file:

```env
PORT=5000
JWT_SECRET=your_secret_key
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Application URL:

```text
http://localhost:5173
```

---

## ☁️ Deployment

### Backend Deployment

1. Import repository into Vercel
2. Set Root Directory to:

```text
backend
```

3. Deploy

### Frontend Deployment

1. Import repository again
2. Set Root Directory to:

```text
frontend
```

3. Configure environment variable:

```env
VITE_API_URL=https://your-backend-url.vercel.app/api
```

4. Deploy

---

## 🔮 Future Enhancements

* MongoDB/PostgreSQL Integration
* Historical Progress Tracking
* Advanced Analytics Dashboard
* AI-Based Meal Recommendations
* Personalized Workout Plans
* Cloud Storage Integration

---

## 📄 License

This project is intended for educational, learning, and portfolio purposes.
