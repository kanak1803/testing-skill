# SkillBuddy - Job Portal Website

Welcome to **SkillBuddy**, a job portal designed to connect candidates, companies, and administrators seamlessly. SkillBuddy aims to simplify the hiring process, making it efficient and user-friendly for all stakeholders.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features
- **User Roles**: 
  - Admin: Manage the platform, users, and job postings.
  - Candidate: Create profiles, apply for jobs, and track applications.
  - Recruiter: Post job openings and manage applications.
- **Authentication**: Secure login and registration using Firebase.
- **Job Listings**: Search, filter, and apply for jobs.
- **Admin Dashboard**: Monitor platform activity and manage content.
- **Responsive Design**: Fully functional on all devices.

## Technologies Used
### Frontend
- **Next.js**: Framework for building server-rendered React applications.
- **TypeScript**: For type safety and maintainable code.
- **Tailwind CSS**: For styling the application.

### Backend
- **Node.js**: Runtime environment for building the backend.
- **PostgreSql**:  Relational database for storing user and job data.

### Authentication
- **Firebase**: For user authentication and authorization.

### Package Manager
- **Yarn**: For dependency management.

## Installation
Follow these steps to set up the project locally:

### Prerequisites
- Node.js (v16 or higher)
- Yarn package manager
- PostgreSQL database
- Firebase project setup

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/skillbuddy.git
   cd skillbuddy
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:
   ```env
   NEXT_PUBLIC_BASE_URL=your_base_url
   NEXT_PUBLIC_CKEDITOR_API_KEY=your_ckeditor_api_key
   ```

4. Run the development server:
   ```bash
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Usage
- **Admin**:
  - Login to the admin dashboard.
  - Manage job postings, candidates, and companies.
- **Candidate**:
  - Sign up and create a profile.
  - Search and apply for jobs.
- **Companies**:
  - Register and post job openings.
  - Review and manage applications.

## Project Structure
```
skillbuddy/
├── public/               # Static assets
├── src/
│   ├── app/              # Next.js pages
│   ├── components/       # Reusable components
│   ├── data/             # Application-specific data
│   ├── enum/             # Enumerations
│   ├── inteface/         # TypeScript interfaces
│   ├── lib/              # Helper functions and hooks
│   │   ├── firebase/     # Firebase-specific logic
│   │   ├── store/        # State management (Redux)
│   │   │   ├── feature/  # Redux slices and feature-specific code
│   ├── service/          # API and service calls
│   ├── styles/           # Global styles
│   ├── type/             # Custom TypeScript types
│   └── utils/            # Utility functions
├── .env                  # Environment variables
├── .env.development      # Development-specific environment variables
├── .env.local            # Local-specific environment variables
├── .env.production       # Production-specific environment variables
├── package.json          # Project metadata and dependencies
└── README.md             # Project documentation
```

## Contributing
We welcome contributions to SkillBuddy! To contribute:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push your changes:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

Thank you for choosing SkillBuddy! We hope you find it valuable in your journey to simplify recruitment and job searching.

