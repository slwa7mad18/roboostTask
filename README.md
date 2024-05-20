# Student Management Application

## Project Structure and Organization

The project is organized into several key directories and files, each serving a specific purpose:

- **components/**: Contains all the components of the application.
  - **home/**: Manages the homepage content.
  - **header/**: Manages the navigation bar, which includes buttons for login, register, and a language selection dropdown.
  - **login/**: Handles the login functionality.
  - **register/**: Manages user registration.
  - **not-found/**: Displays a 404 error page for non-existent routes.
  - **edit/**: Allows modification of student data.
  - **student/**: Lists all students and includes add and remove functionalities.

- **directives/**: Contains custom directives.
  - **sortable.directive.ts**: A custom directive to make the data table headers sortable.

- **guards/**: Contains route guards.
  - **auth.guard.ts**: An authentication guard to prevent unauthorized access to certain routes.

- **interfaces/**: Defines TypeScript interfaces.
  - **student.interface.ts**: Interface for student data.

- **services/**: Contains services used throughout the application.
  - **auth.service.ts**: Manages authentication (login, register, logout).
  - **student.service.ts**: Handles CRUD operations for student data.
  - **student-datatable.service.ts**: Manages filtering, sorting, and pagination of the student data table.
  - **translation.service.ts**: Manages localization of the application.

- **utils/**: Contains utility functions.
  - **validation.util.ts**: Utility for validating password and confirm password fields.

- **assets/i18n/**: Contains localization files.
  - **ar-EG.json**: Arabic translations.
  - **en-US.json**: English translations.

## Installation Instructions

To install the project and its dependencies, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   ```
   Replace `<repository-url>` with the actual URL of your GitHub repository.

2. **Install dependencies**:
   ```bash
   npm install
   ```

## Explanation of Code Structure

The code is organized into several main components, each serving a distinct function within the application:

- **components/**: This directory contains all the Angular components that make up the user interface.
  - **home/**: Contains the homepage component, which displays the main content of the application.
  - **header/**: Contains the header component, responsible for the navigation bar. This includes buttons for login, registration, and a language selection dropdown.
  - **login/**: Contains the login component, handling user authentication.
  - **register/**: Contains the register component, managing user registration.
  - **not-found/**: Contains the 404 component, displayed when a user navigates to a non-existent route.
  - **edit/**: Contains the edit component, used for modifying student data.
  - **student/**: Contains the student component, which lists all students and includes functionalities to add and remove students.

- **directives/**: This directory contains custom directives used in the application.
  - **sortable.directive.ts**: A custom directive that makes the data table headers sortable by clicking on them.

- **guards/**: This directory contains route guards that control access to certain routes.
  - **auth.guard.ts**: An authentication guard that prevents unauthorized access to specific routes.

- **interfaces/**: This directory defines TypeScript interfaces used throughout the application.
  - **student.interface.ts**: Defines the structure of the student data.

- **services/**: This directory contains services that handle business logic and data manipulation.
  - **auth.service.ts**: Manages authentication processes such as login, registration, and logout.
  - **student.service.ts**: Handles CRUD operations related to student data.
  - **student-datatable.service.ts**: Manages the filtering, sorting, and pagination of the student data table.
  - **translation.service.ts**: Manages the localization and translation of the application.

- **utils/**: This directory contains utility functions that are used across the application.
  - **validation.util.ts**: Provides a utility function for validating that the password and confirm password fields match.

- **assets/i18n/**: Contains localization files for different languages.
  - **ar-EG.json**: Arabic translations.
  - **en-US.json**: English translations.

## Running the Application Locally

After installing the dependencies, you can run the application locally with the following command:

```bash
ng serve
```

This will compile the application and start a local development server. By default, the application will be accessible at `http://localhost:4200/`.

## Additional Libraries and Dependencies

The project uses the following additional libraries:

- **ng-bootstrap**: Provides Bootstrap components for Angular.
- **sweetalert2**: A beautiful, responsive, customizable, and accessible (WAI-ARIA) replacement for JavaScript's popup boxes.
- **transloco**: A library for Angular that helps with translating your application into different languages.
