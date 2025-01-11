# healthcare-client

A React-based client-side application for a smart healthcare system. This project provides a user-friendly interface to manage patients, appointments, and more.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)

## Features

- User authentication and protected routes.
- Components for managing doctors, patients, appointments, and navigation.
- Role based protected routes

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/hsahu615/smart-healthcare-system
   ```
2. Navigate to the project directory:
   ```bash
   cd smart-healthcare-system\ui-component
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Project

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

To create a production build:

```bash
npm run build
```

The build files will be in the `dist` folder.

## Scripts

- `dev`: Start the development server.
- `build`: Build the project for production.

## Project Structure

```
ui-component/
├── public/                # Static assets
├── src/                   # Source code
│   ├── auth/              # Authentication context and provider
│   │   ├── AuthContext.ts
│   │   └── AuthProvider.tsx
│   ├── components/        # React Components
│   │   ├── Appointments/  # Appointment Cards
│   │   │   └── Appointments.tsx
│   │   ├── Doctors/       # Doctor Cards
│   │   │   ├── Doctors.tsx
│   │   │   └── Doctors.css
│   │   ├── Navbar/        # Navigation Links and Logo
│   │   │   ├── Navbar.tsx
│   │   │   └── Navbar.css
│   │   ├── Patients/      # Patient Cards
│   │   │   ├── Patients.tsx
│   │   │   └── Patients.css
│   │   ├── ProtectedRoute/ # Route protection components
│   │   │   └── ProtectedRoute.tsx
│   │   └── Spinner/       # Loading spinner components
│   │       └── SpinnerProvider.tsx
│   ├── pages/             # Application pages
│   │   ├── AddAppointment/
│   │   │   └── AddAppointment.jsx # Page to Add a Appointment
│   │   ├── AddDoctor/
│   │   │   └── AddDoctor.jsx # Page to Add a Doctor
│   │   ├── Home/
│   │   │   ├── Home.tsx # Home Page with Appointment/Doctor/Patient section
│   │   │   └── Home.css
│   │   ├── Login/
│   │   │   └── Login.tsx # Login Page
│   │   └── Unauthorized.tsx # Page on hitting unauthorized route
│   ├── App.jsx            # Root component
│   └── main.jsx           # Entry point
├── package.json           # Project metadata and scripts
├── vite.config.js         # Vite configuration
├── Dockerfile             # Docker configuration (if applicable)
└── README.md              # Project documentation
```

## Dependencies

This project uses the following main dependencies:

- React
- React Router DOM
- Axios (for HTTP requests)
- Other libraries as listed in `package.json`
