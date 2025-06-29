# 📚 FlexiSlot – Backend

**FlexiSlot** is the backend service for our college project that provides a complete solution for managing and booking slots. Built using **Spring Boot** and **MySQL**, it enables secure user authentication, room and slot management, and real-time availability checking.

---

## 🚀 Features

- 🔐 JWT-based user authentication (register, login, profile)
- 🏠 Room and resource management
- 🕒 Time-based slot booking and availability
- 📅 User-specific booking history
- 📬 Contact form handling for user queries
- 🧩 Clean, modular structure with controller-service-repository layers

---

## 🏗️ Project Structure and Models

### 1. **Room Model**
- Lists available rooms
- Stores details like room capacity and storage
- Used to assign slots to specific rooms

### 2. **Slot Type Model**
- Represents different types of slots
- References a `Room`
- Contains slot date and time information
- Helps frontend display slots by date/time

### 3. **Slot Model**
- References the `SlotType` model
- Maintains actual slot records
- Used in controllers to fetch available or booked slots

### 4. **User Model**
- Handles user registration, login, and profile
- Associates users with booked slots
- Uses JWT for secure authentication

### 5. **Booking Model**
- Checks whether a slot is booked
- References both `User` and `Slot`
- Stores booking status and user-slot relationships

### 6. **Contact Model**
- Manages user queries or feedback
- Allows users to submit contact forms

---

## 🛠️ Tech Stack

- **Backend Framework**: Spring Boot
- **Database**: MySQL
- **ORM**: Hibernate (JPA)
- **Authentication**: JWT (JSON Web Token)
- **Security**: Spring Security

---

# FlexiSlot – Backend

🔗 **Frontend Repository**: [FlexiSlot-Frontend](https://github.com/arhamkac/FlexiSlot-Frontend)

---

## 📂 Folder Structure

```plaintext
/src
└── main
    ├── java
    │   └── com
    │       └── flexislot
    |           ├── config
    │           ├── controller
    │           ├── model
    │           ├── repository
    │           ├── service
    │           └── utils
    └── resources
        └── application.properties
