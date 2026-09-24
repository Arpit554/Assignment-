# Feedants - Competition Details Screen (Full-Stack Module)

A production-grade, highly scalable full-stack module for the **Feedants Competition Details Screen**, built using **React Native (Expo + Web)**, **Node.js + Express.js**, and **MongoDB**.

---

## 🌟 Overview & Key Features

This module delivers a dynamic, high-fidelity experience matching the Feedants design specification with end-to-end full-stack functionality:

1. **Pixel-Perfect Fidelity**: Matches the reference layout, typography, badges, custom color palette (`#007A78`), urgency elements, and component hierarchy.
2. **Dynamic Data Layer**: No static or hardcoded data. Everything is served via a RESTful backend with indexed MongoDB models and computed virtuals.
3. **Smart State-Aware Bottom CTA**:
   * **Unregistered**: Shows `Register Now • ₹99` with instant Razorpay simulated checkout.
   * **Registered**: Shows `Upload Submission (Registered)` opening the performance submission dialog.
   * **Submitted**: Shows `Submission Received` allowing preview and updates.
   * **Capacity Full / Closed**: Automatically shows `Spots Full (20/20)` or `Registration Closed`.
   * **Results Declared**: Shows `View Results & Leaderboard`.
4. **Live Ticking Countdown Timer**: Real-time ticker (`01d : 06h : 28m : 32s`) synchronized with server timestamps.
5. **Concurrency & High-Throughput Protection**: Atomic MongoDB spot reservation (`$inc` with `$lt` guard) preventing race conditions and overbooking across thousands of concurrent users.
6. **Multi-Language Support (i18n)**: Real-time language switching between English (`ENG`) and Hindi (`हिंदी`).
7. **Interactive Video Players & Modals**:
   * Judge Introduction Video Player
   * "How will you receive prize money?" Video Player
   * Previous Winners Performance Highlights
   * Razorpay Checkout Sheet with UPI, Card, and Netbanking modes
   * User Testimonials Drawer & Refund Policy Sheet
8. **Evaluator & Demo Toolbar**: Built-in switcher to instantly toggle between user personas (Priya - Registered, Rahul - Unregistered, Ananya - Submitted) and simulate competition lifecycle states for rapid testing.

---

## 🏗 System Architecture

```
┌────────────────────────────────────────────────────────┐
│                   React Native Frontend                │
│    (Expo / Mobile & Web / Theme / Context / Modals)    │
└───────────────────────────┬────────────────────────────┘
                            │ REST API (JSON / CORS)
                            ▼
┌────────────────────────────────────────────────────────┐
│                  Node.js + Express.js                  │
│       Controllers | Middleware | Validation Guards     │
└───────────────────────────┬────────────────────────────┘
                            │ Mongoose ODM / Transactions
                            ▼
┌────────────────────────────────────────────────────────┐
│                        MongoDB                         │
│  Competitions | Users | Registrations | Submissions    │
└────────────────────────────────────────────────────────┘
```

---

## 🗄 Database Schema Design (MongoDB)

### 1. `Competition`
* `title` (String), `slug` (String, unique indexed)
* `category` (String), `tags` ([String])
* `prizePool` (Number), `entryFee` (Number)
* `maxSpots` (Number, default: 20), `bookedSpots` (Number, default: 1)
* `dates`: `{ registerBefore, submissionStart, submissionEnd, resultDate }`
* `judge`: `{ name, role, experience, avatarUrl, introVideoUrl }`
* `previousWinners`: `[{ name, rankTitle, avatarUrl, videoUrl }]`
* `tabContent`: `{ about, judgingParameters, rulesAndEligibility }`
* `rewards`: `[{ rank, title, amount, icon }]`
* `status`: `REGISTRATION_OPEN | SUBMISSION_OPEN | JUDGING | RESULTS_DECLARED | REGISTRATION_CLOSED`

### 2. `Registration`
* `user` (Ref -> User, indexed)
* `competition` (Ref -> Competition, indexed)
* `amountPaid` (Number), `paymentStatus` (SUCCESS / PENDING / FAILED)
* `transactionId` (String, unique)
* `paymentMethod` (String, e.g. "Razorpay UPI")
* **Index**: `{ user: 1, competition: 1 }` (Unique compound index preventing double booking).

### 3. `Submission`
* `user` (Ref -> User)
* `competition` (Ref -> Competition)
* `title` (String), `videoUrl` (String), `description` (String), `danceStyle` (String)
* `status` (SUBMITTED / UNDER_REVIEW / APPROVED)

### 4. `User`
* `name` (String), `email` (String, unique), `phone` (String), `avatarUrl` (String), `referralCode` (String), `walletBalance` (Number)

---

## ⚡ Concurrency & Data Consistency Strategy

To support high concurrent registration spikes:
```javascript
// Atomic spot reservation with conditional guard
const updatedCompetition = await Competition.findOneAndUpdate(
  {
    _id: competitionId,
    bookedSpots: { $lt: maxSpots } // Atomic safety condition
  },
  {
    $inc: { bookedSpots: 1 }
  },
  { new: true }
);

if (!updatedCompetition) {
  return res.status(409).json({ message: "Registration is full!" });
}
```
* **Compound Unique Constraints**: Prevents duplicate charge attempts on network retries.
* **Server Time Sync**: The API sends `serverTime` to prevent client clock skew in countdown timers.

---

## 🚀 Quick Start Guide

### Prerequisites
* **Node.js** (v18+ recommended, v22 supported)
* **npm** (v9+)
* *(Optional)* MongoDB running locally at `mongodb://127.0.0.1:27017` (If MongoDB is not installed, the backend automatically boots an **in-memory MongoDB server** with zero setup required!).

---

### Step 1: Start the Backend Server

```bash
cd backend
npm install
npm start
```
* The backend will start on **`http://localhost:5000`**
* It automatically checks the database and seeds the full competition data matching the design mockup on first boot.
* Health Check: `http://localhost:5000/api/health`

---

### Step 2: Start the React Native Frontend

Open a new terminal window:

```bash
cd frontend
npm install
npm run web
```
* Press **`w`** in the terminal to open the web preview in your default browser (`http://localhost:8081`).
* Or scan the QR code using **Expo Go** on iOS / Android.

---

## 📡 API Endpoints Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/competitions/latest` | Get primary competition with calculated spots and user state |
| `GET` | `/api/competitions/:id` | Get specific competition details |
| `POST` | `/api/competitions/:id/register` | Atomic spot registration & Razorpay simulation |
| `POST` | `/api/competitions/:id/submit` | Upload dance performance submission |
| `GET` | `/api/competitions/:id/submission` | Get user's active submission |
| `GET` | `/api/users` | List all demo user personas |
| `POST` | `/api/competitions/:id/simulate-state` | **Demo helper**: Change spots/status dynamically |
| `POST` | `/api/competitions/seed/reset` | **Demo helper**: Reset entire DB to initial mock data |

---

## 💡 Important Assumptions, Trade-offs & Production Roadmap

### 1. Assumptions Made
* **Authentication**: For evaluation and seamless testing, user switching is made accessible via the top-right profile badge, supporting Registered, Unregistered, and Submitted user profiles without requiring SMS OTP setup.
* **Payment Gateway**: Simulated full Razorpay checkout flow with instant webhook callback behavior.
* **Video Hosting**: Direct streaming support for YouTube, MP4 URLs, and Google Drive links.

### 2. Major Technical Decisions
* **React Native with Web Compatibility**: Ensured the application runs smoothly on native iOS/Android devices while being 100% testable via standard web browsers.
* **Zero-Config Database Fallback**: Embedded MongoDB Memory Server fallback ensures the application works instantly on any machine even if MongoDB is not pre-installed.
* **Atomic MongoDB Operations**: Avoided distributed race conditions on the last available spots by utilizing atomic `$inc` operators with filter guards.

### 3. Trade-offs Considered
* *Full Video Transcoding vs. Stream Embedding*: Utilized embedded stream playback to keep dependencies lightweight without requiring external AWS Elemental MediaConvert pipelines.
* *In-Memory Caching vs Direct DB Queries*: Direct indexed MongoDB queries were chosen for strict real-time spot accuracy; in extreme scale, Redis caching with distributed locks would be introduced.

### 4. What would be improved for Production
* **Redis Queue (BullMQ / RabbitMQ)** for high-volume concurrent booking queues during flash registrations.
* **S3 / Cloudinary Direct Pre-signed Uploads** for 4K video uploads.
* **Push Notifications** (FCM / Expo Notifications) for submission deadlines and results announcements.
* **WebSockets / Socket.io** for live spot-filling animations when hundreds of users are viewing simultaneously.

---

## 👨‍💻 Submission Details
* **Company**: Feedants
* **Role**: Full Stack Development Intern
* **Module**: Competition Details Screen - Functional Full-Stack Module
