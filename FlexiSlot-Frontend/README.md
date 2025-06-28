# 💻 FlexiSlot – Frontend

**FlexiSlot** is the frontend of our college project, designed to simplify on-campus slot bookings. Built using **React** and styled with **Tailwind CSS**, it offers an intuitive interface for students and staff to reserve time slots for libraries, classrooms, and parking spaces. The app helps reduce physical queues and administrative effort by providing a seamless booking experience.
---

## 🚀 Features

- 🔐 **User Authentication**
  - Signup and login with client-side validation
  - Protected routes using context-based authentication

- 📅 **Slot Booking System**
  - Browse and reserve slots by category:
    - 📚 Library
    - 🏫 Classroom
    - 🚗 Parking
  - View booking confirmations and status

- 📬 **Contact Form**
  - "Contact Us" page for submitting feedback or queries

- 📱 **Responsive Design**
  - Fully mobile-first, responsive UI using Tailwind CSS

- 🎞️ **Smooth Animations**
  - Scroll and interaction animations with Framer Motion

---
## 🚀 Project Features

Here are some UI screenshots of the project:

<div align="center">
  <img src="Screenshot (230).png" alt="Feature 1" width="600" />
</div>

---

<div align="center">
<img src="Screenshot (231).png" alt="Feature 2" width="600"/>
</div>

---

<div align="center">
<img src="Screenshot (234).png" alt="Feature 5" width="600"/>
</div>

---

## 🛠️ Tech Stack

| Purpose              | Technology             |
|----------------------|------------------------|
| Language             | JavaScript             |
| Framework            | React                  |
| Styling              | Tailwind CSS           |
| Animations           | Framer Motion          |
| Routing              | React Router DOM       |
| State Management     | React Context API      |
| HTTP Requests        | Axios                  |

---

## 📂 Folder Structure

```plaintext
/src
├── assets              # Static files and images
├── components          # Reusable UI components
├── context             # Auth and global state
├── pages               # App pages (Booking, Login, Contact, etc.)
├── services            # Axios API calls
├── App.js              # Main application component
├── index.js            # React root entry point
└── tailwind.config.js  # Tailwind configuration

```

> ⚠️ **Note:**  
> The backend is currently **not deployed** due to a deployment error. As a result, features of the application may not function properly in the online version.

> Backend Repo: https://github.com/arhamkac/Flexi_Slot
---

## 🔧 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/FlexiSlot-Frontend.git
cd FlexiSlot-Frontend

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

