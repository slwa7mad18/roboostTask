

# Project Structure and Organization
The project is structured into several key directories and files, each serving a specific purpose:

components/: Contains all the components of the application.

home/: Manages the homepage content.
header/: Manages the navigation bar, which includes buttons for login, register, and a language selection dropdown.
login/: Handles the login functionality.
register/: Manages user registration.
not-found/: Displays a 404 error page for non-existent routes.
edit/: Allows modification of student data.
student/: Lists all students and includes add and remove functionalities.
directives/: Contains custom directives.

sortable.directive.ts: A custom directive to make the data table headers sortable.
guards/: Contains route guards.

auth.guard.ts: An authentication guard to prevent unauthorized access to certain routes.
interfaces/: Defines TypeScript interfaces.

student.interface.ts: Interface for student data.
services/: Contains services used throughout the application.

auth.service.ts: Manages authentication (login, register, logout).
student.service.ts: Handles CRUD operations for student data.
student-datatable.service.ts: Manages filtering, sorting, and pagination of the student data table.
translation.service.ts: Manages localization of the application.
utils/: Contains utility functions.

validation.util.ts: Utility for validating password and confirm password fields.

# Installation instructions
1. Clone the repo.
2. npm i
