
### **Task Management**


#### **Project Requirements:**

1. **User Management:**
   - User registration and authentication (using Django's built-in user model or a custom user model).


2. **Task Management:**
   - CRUD operations for tasks.
   - Set deadlines,progress and priorities for tasks.


5. **RESTful API:**
   - Expose APIs for all core functionalities (task creation, task updates).
   - Secure APIs using token-based authentication (e.g., JWT).



#### **Technical Stack:**
- **Backend:** Django, Django REST framework


#### **High-Level Implementation Plan:**

1. **Setup Django Project:**
   - Create a new Django project and configure SQLite as the database.
   - Setup user authentication and role-based access control using simple JWT.

2. **Develop Task Management Module:**
   - Define Task model with necessary fields (title, description, assignee, status, priority, deadline).
   - Implement CRUD operations for tasks.


3. **Implement RESTful APIs:**
   - Use Django REST framework to create serializers and viewsets for tasks.
   - Implement authentication and authorization for the APIs.
