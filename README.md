# Frontend - Bluestock

This is the frontend of the Bluestock application, which provides a user interface for features like login, registration, password reset, and dashboard.

## Features
- User Registration
- Login with Google Identity Services
- Password Reset and OTP Verification
- Dashboard with Sidebar Navigation
- Responsive Design

## Folder Structure
Frontend/ ├── index.html # Login Page ├── register.html 
# User Registration Page ├── forgetpassword.html
# Forget Password Page ├── reset-password.html 
# Reset Password Page ├── verify-otp.html
# OTP Verification Page ├── home.html
# Dashboard Page ├── styles.css 
# Global Stylesheet

## Prerequisites
- A modern web browser (e.g., Chrome, Firefox)
- Internet connection for Google Identity Services

## How to Run
1. Open the `index.html` file in your browser to start the application.
2. Navigate through the pages using the links or buttons provided.

## Pages Overview
1. **Login Page (`index.html`)**
   - Allows users to log in using their credentials or Google Identity Services.

2. **Register Page (`register.html`)**
   - Enables users to create a new account.

3. **Forget Password Page (`forgetpassword.html`)**
   - Allows users to request a password reset.

4. **Reset Password Page (`reset-password.html`)**
   - Enables users to reset their password after OTP verification.

5. **OTP Verification Page (`verify-otp.html`)**
   - Verifies the OTP sent to the user's email.

6. **Dashboard Page (`home.html`)**
   - Displays the main dashboard with navigation and user information.

## Styles
All styles are defined in the `styles.css` file. Ensure this file is linked correctly in the HTML files.

## Known Issues
- Ensure the backend is running for features like OTP verification and password reset.
- Google Identity Services requires a valid client ID.

## Future Enhancements
- Add more dynamic content to the dashboard.
- Improve error handling for form submissions.



# Backend - Bluestock

This is the backend of the Bluestock application, built with Node.js and Express.js. It provides APIs for user authentication, password management, and OTP verification.

## Features
- User Signup and Login
- Password Reset with OTP Verification
- JWT-based Authentication
- MongoDB Integration

## Folder Structure

GitHub Copilot
Here are two separate README.md files for the Frontend and Backend based on the provided files:

Frontend README.md
Frontend/ ├── index.html # Login Page ├── register.html # User Registration Page ├── forgetpassword.html # Forget Password Page ├── reset-password.html # Reset Password Page ├── verify-otp.html # OTP Verification Page ├── home.html # Dashboard Page ├── styles.css # Global Stylesheet

Firefox
Backend README.md
Backend/ ├── server.js
# Main server file ├── routes/ │ └── User/ │ └── user.js
# User-related routes ├── controller/ │ └── Authcontroller.js 
# Authentication controllers ├── middleware/ │ ├── AuthMiddleware.js
# JWT Authentication middleware │ └── ValidatorMddleware.js 
# Validation middleware ├── models/ │ └── User.js 
# User model (empty in provided files) ├── config/ │ ├── db.js # MongoDB connection │ └── emailconfig.js 
# Email configuration ├── .env # Environment variables


## Prerequisites
- Node.js (v14 or higher)
- MongoDB database
- `.env` file with the following variables:
- DATABASE_URL=<your-mongodb-connection-string> EMAIL=<your-email> EMAIL_PASS=<your-email-password> JWT_SECRET=<your-jwt-secret> PORT=8000


## How to Run
1. Install dependencies:
 npm install
2.Start the server:
3.The server will run on http://localhost:8000 by default.

API Endpoints
POST Routes
/api/auth/signup - User signup
/api/auth/login - User login
/api/auth/logout - User logout
/api/auth/change-password - Change password (requires authentication)
/api/auth/forget-password - Request password reset
/api/auth/verify-otp - Verify OTP
/api/auth/reset-password - Reset password


API Endpoints
POST Routes
/api/auth/signup - User signup
/api/auth/login - User login
/api/auth/logout - User logout
/api/auth/change-password - Change password (requires authentication)
/api/auth/forget-password - Request password reset
/api/auth/verify-otp - Verify OTP
/api/auth/reset-password - Reset password

Future Enhancements
Add more detailed error handling.
Implement rate limiting for sensitive routes



