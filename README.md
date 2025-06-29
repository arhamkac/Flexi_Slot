# FlexiSLOT - Room Booking System

A comprehensive room booking system built with Spring Boot backend and React frontend.

## 🚀 Features

- **User Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (User/Admin)
  - Password reset functionality
  - User profile management

- **Room & Slot Management**
  - Room categorization and capacity management
  - Flexible slot booking system
  - Real-time availability checking
  - Booking history and status tracking

- **Advanced Booking System**
  - Purpose-based booking requests
  - Booking approval workflow
  - Conflict detection and prevention
  - Email notifications

- **User Interface**
  - Modern, responsive React frontend
  - Intuitive booking interface
  - Real-time updates
  - Mobile-friendly design

## 🏗️ Project Structure

```
FlexiSLOT/
├── FlexiSlot-Backend/          # Spring Boot Backend
│   └── Backend/
│       ├── src/main/java/com/flexislot/
│       │   ├── config/         # Security and JWT configuration
│       │   ├── controllers/    # REST API endpoints
│       │   ├── models/         # JPA entities
│       │   ├── payloads/       # Request/Response DTOs
│       │   ├── repositories/   # Data access layer
│       │   ├── services/       # Business logic
│       │   └── utils/          # Utility classes
│       └── src/main/resources/
│           └── application.properties
├── FlexiSlot-Frontend/         # React Frontend
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── context/           # React context for state management
│   │   └── assets/            # Static assets
│   └── package.json
└── README.md
```

## 🛠️ Technology Stack

### Backend
- **Spring Boot 3.5.0** - Main framework
- **Spring Security** - Authentication & authorization
- **Spring Data JPA** - Data persistence
- **MySQL** - Database
- **JWT** - Token-based authentication
- **Maven** - Build tool

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling

## 📋 Prerequisites

- Java 21 or higher
- Node.js 18 or higher
- MySQL 8.0 or higher
- Maven 3.6 or higher

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd FlexiSLOT
```

### 2. Backend Setup

#### Database Configuration
1. Create a MySQL database named `flexislot`
2. Update database credentials in `FlexiSlot-Backend/Backend/src/main/resources/application.properties`

#### Run Backend
```bash
cd FlexiSlot-Backend/Backend
./mvnw spring-boot:run
```

The backend will start on `http://localhost:3000`

### 3. Frontend Setup

#### Install Dependencies
```bash
cd FlexiSlot-Frontend
npm install
```

#### Run Frontend
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## 🔧 Configuration

### Backend Configuration
Key configuration options in `application.properties`:

```properties
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/flexislot
spring.datasource.username=your_username
spring.datasource.password=your_password

# JWT
jwt.secret=your_jwt_secret_key
jwt.expiration=86400000

# Email (for password reset)
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your_email@gmail.com
spring.mail.password=your_app_password

# Frontend URL (for CORS and email links)
app.frontend.url=http://localhost:5173
```

### Frontend Configuration
Update API base URL in `vite.config.js`:

```javascript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})
```

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Reset**: Email-based password recovery
- **CORS Configuration**: Proper cross-origin resource sharing
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Prevention**: Using JPA repositories

## 📧 Email Configuration

For password reset functionality, configure Gmail SMTP:

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password
3. Update the email configuration in `application.properties`

## 🧪 Testing

### Backend Testing
```bash
cd FlexiSlot-Backend/Backend
./mvnw test
```

### Frontend Testing
```bash
cd FlexiSlot-Frontend
npm test
```

## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Password Management
- `POST /api/password/reset` - Request password reset
- `POST /api/password/reset/confirm` - Confirm password reset

### Rooms & Slots
- `GET /api/slots/available` - Get available slots
- `POST /api/slots/book` - Book a slot
- `GET /api/bookings/user/{userId}` - Get user bookings

### Admin Endpoints
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/{userId}/block` - Block/unblock user
- `GET /api/admin/bookings` - Get all bookings


**Note**: This is a development version. For production deployment, ensure proper security configurations and environment-specific settings.
