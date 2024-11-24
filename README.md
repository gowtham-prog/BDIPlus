# Project Overview

This project is a full-stack application with a **Django backend** and a **React frontend**. Each part of the project is organized into separate folders with their respective setup and documentation files.

---

## Folder Structure

### 1. `django_backend/`  
This folder contains the backend of the application, built with **Django**.  
- The Django backend handles the API logic, database management, and server-side operations.  
- Refer to the [Django Backend README](./django_backend/README.md) for setup instructions and detailed documentation.

### 2. `react_frontend/`  
This folder contains the frontend of the application, built with **React**.  
- The React frontend handles the user interface and communicates with the Django backend via API endpoints.  
- Refer to the [React Frontend README](./react_frontend/README.md) for setup instructions and detailed documentation.

---

## Project Flow

1. **Backend**:  
   The Django backend exposes API endpoints that the frontend communicates with. It manages the core logic, authentication, and database interactions.

2. **Frontend**:  
   The React frontend fetches data from the backend APIs and renders it to the user. User actions (e.g., form submissions) are sent to the backend for processing.

3. **Integration**:  
   - The frontend communicates with the backend using REST API calls.
   - The backend is designed to run on `http://127.0.0.1:8000` by default.
   - The frontend is designed to run on `http://localhost:3000` by default. Ensure proper configuration of CORS (Cross-Origin Resource Sharing) in the backend for seamless integration.

---

## How to Use This Repository

1. Set up the **Django backend**:
   - Navigate to the `django_backend` folder.
   - Follow the setup instructions in the [Django Backend README](./django_backend/README.md).

2. Set up the **React frontend**:
   - Navigate to the `react_frontend` folder.
   - Follow the setup instructions in the [React Frontend README](./react_frontend/README.md).

3. Start both the backend and frontend servers:
   - Run the Django server for backend functionality.
   - Run the React development server for frontend functionality.

4. Access the application:
   - Backend API documentation and testing endpoints: `http://127.0.0.1:8000/api/`
   - Frontend application: `http://localhost:3000/`

---

## Documentation

- Backend Design: [Django Backend Design](./django_backend/DOC.md)
- API documentation: [API Postman Documentation](https://documenter.getpostman.com/view/32604647/2sAYBUDC3Z)

---

## Notes

- Ensure both servers are running simultaneously for the application to work correctly.
- Configure environment variables in both the backend and frontend if required.
