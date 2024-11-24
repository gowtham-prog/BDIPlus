

# Django Backend Setup Guide

Follow these steps to set up and run the Django project on your local machine.

---

## Prerequisites

- Python installed (version 3.8 or later recommended)
- `pip` installed
- `virtualenv` installed (`pip install virtualenv`)

---

## Setup Instructions


1. **Create a Virtual Environment**  
   Use `virtualenv` to create a virtual environment:
   ```bash
   virtualenv venv
   ```

2. **Activate the Virtual Environment**  
   - **Windows**:
     ```bash
     venv\Scripts\activate
     ```
   - **Mac/Linux**:
     ```bash
     source venv/bin/activate
     ```

3. **Install Dependencies**  
   Install the required packages from `requirements.txt`:
   ```bash
   pip install -r requirements.txt
   ```

5. **Run Migrations**  
   Apply database migrations to set up the database:
   ```bash
   python manage.py makemifgrations apis
   python manage.py migrate
   ```

6. **Run the Server**  
   Start the development server:
   ```bash
   python manage.py runserver
   ```

---

## Access the Application

Once the server is running, you can access the application at:  
[http://127.0.0.1:8000/](http://127.0.0.1:8000/)

