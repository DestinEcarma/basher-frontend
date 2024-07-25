# Basher

Basher is a forum-based web application where all users are anonymous. This project is built using React and TypeScript, following specific naming conventions for different types of files. It uses **Tailwind** CSS for styling and **Axios** for HTTP client requests.

## Project Structure

The project is organized into several directories, each serving a specific purpose:

- [**components/**](./src/components/README.md): Contains reusable UI components.
- [**pages/**](./src/pages/README.md): Contains the main pages of the application.
- [**features/**](./src/features/README.md): Contains specific features that only applies to that page, each with its own components, utils, services, and pages.
- [**utils/**](./src/utils/README.md): Contains utility functions used across the application.
- [**services/**](./src/services/README.md): Contains service functions for API calls and other business logic.

## Naming Conventions

- **Components, Pages, Services**: Use PascalCase (e.g., `UserProfile`, `HomePage`, `AuthService`).
- **Utilities**: Use camelCase (e.g., `formatDate`, `calculateAge`).

## Setting Up and Running the Project

1. Clone the repository:

```sh
git clone https://github.com/DestinEcarma/basher-frontend.git basher

cd basher
```

2. Install dependencies:

```sh
npm install
```

3. Run the development server:

```sh
npm run dev
```
