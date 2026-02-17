# 🚀 SkillSync Frontend

<div align="center">

<!-- TODO: Add project logo (e.g., in public/logo.png) -->
<p align="center">
  <img src="![Uploading Gemini_Generated_Image_nj78smnj78smnj78.png…]()
" alt="SkillSync Logo" width="180"/>
</p>

<h1 align="center">SkillSync</h1>

<p align="center">
  Connect. Learn. Grow.
</p>

<!-- ![Logo](public/logo.png) -->

[![GitHub stars](https://img.shields.io/github/stars/mahek-40/SkillSync?style=for-the-badge&logo=github)](https://github.com/mahek-40/SkillSync/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/mahek-40/SkillSync?style=for-the-badge&logo=github)](https://github.com/mahek-40/SkillSync/network)
[![GitHub issues](https://img.shields.io/github/issues/mahek-40/SkillSync?style=for-the-badge&logo=github)](https://github.com/mahek-40/SkillSync/issues)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](LICENSE)

**A dynamic platform for seamless skill exchange and collaboration.**

<!-- TODO: Add live demo link if available -->
<!-- [Live Demo](https://skillsync.vercel.app) | -->
[Backend Repository](https://github.com/mahek-40/SkillSync-Backend) <!-- TODO: Adjust link if backend repo exists --> 

</div>

## 📖 Overview

SkillSync is a modern web application designed to connect individuals seeking to exchange or learn new skills. This repository contains the **frontend client** for the SkillSync platform, built with React and Vite. It provides a user-friendly interface for browsing skills, managing user profiles, initiating skill swap requests, and engaging in real-time communication.

The application is built to consume a separate backend API (not included in this repository) for data persistence, user authentication, and core business logic.

## ✨ Features

-   🎯 **Skill Discovery & Listing:** Browse and list various skills offered by users.
-   👤 **User Profiles:** Create and manage personal profiles with skill sets and interests.
-   🤝 **Skill Exchange:** Request and offer skill swaps with other users.
-   🔐 **Authentication:** Secure user login and registration, including Google OAuth integration.
-   ☁️ **Cloudinary Integration:** Upload and manage profile pictures and other media.
-   ⚡ **Responsive Design:** Optimized for a smooth experience across devices.

## 🖥️ Screenshots

<!-- TODO: Add actual screenshots of the application's key pages (e.g., homepage, profile, skill listing, chat). Consider mobile and desktop views. -->
<!-- ![Screenshot 1](docs/screenshots/homepage.png) -->
<!-- ![Screenshot 2](docs/screenshots/profile.png) -->

## 🛠️ Tech Stack

**Frontend:**
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-6-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![PostCSS](https://img.shields.io/badge/PostCSS-8-DD3A0A?style=for-the-badge&logo=postcss&logoColor=white)](https://postcss.org/)

**Tools:**
[![npm](https://img.shields.io/badge/npm-9-CB3837?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)


## 🚀 Quick Start

Follow these steps to get the SkillSync frontend up and running on your local machine.

### Prerequisites
Before you begin, ensure you have the following installed:
-   **Node.js**: v18.x or higher (LTS recommended)
-   **npm**: Included with Node.js
-   **SkillSync Backend**: This frontend requires the [SkillSync Backend API](https://github.com/mahek-40/SkillSync-Backend) (TODO: Adjust backend repo link) to be running. Please set it up first.

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/mahek-40/SkillSync.git
    cd SkillSync
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment setup**
    Create a `.env` file in the root directory by copying the example:
    ```bash
    cp .env.example .env
    ```
    Configure your environment variables in the newly created `.env` file:
    ```ini
    # Base URL for the backend API
    VITE_API_URL=http://localhost:5000/api

    # Cloudinary configuration for image uploads
    VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    VITE_CLOUDINARY_API_KEY=your_cloudinary_api_key
    VITE_CLOUDINARY_API_SECRET=your_cloudinary_api_secret

    # Google OAuth client ID for authentication
    VITE_GOOGLE_CLIENT_ID=your_google_client_id

    # WebSocket URL for real-time communication
    VITE_SOCKET_URL=ws://localhost:5000
    ```
    *Replace placeholders (`your_...`) with your actual service credentials.*

4.  **Start development server**
    ```bash
    npm run dev
    ```

5.  **Open your browser**
    Visit `http://localhost:5173` to see the application running.

## 📁 Project Structure

```
SkillSync/
├── public/                 # Static assets (e.g., images, manifest)
├── src/                    # All application source code
│   ├── assets/             # Static assets like images/icons
│   ├── components/         # Reusable UI components
│   ├── config/             # Configuration files (e.g., API settings)
│   ├── context/            # React Context for global state management
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Main application pages/routes
│   ├── services/           # API interaction services (e.g., Axios instances)
│   ├── store/              # State management (if using libraries like Redux/Zustand)
│   ├── styles/             # Global styles and Tailwind directives
│   ├── utils/              # Utility functions and helpers
│   └── main.jsx            # Main entry point for the React application
├── .env.example            # Example environment variables
├── .gitignore              # Files/directories to ignore in Git
├── SETUP_GUIDE.md          # Comprehensive setup instructions
├── eslint.config.js        # ESLint configuration for code quality
├── index.html              # Main HTML file for the application
├── package-lock.json       # Records exact dependency versions
├── package.json            # Project metadata and scripts
├── postcss.config.js       # PostCSS configuration for styling
├── tailwind.config.js      # Tailwind CSS configuration
└── vite.config.js          # Vite build tool configuration
```

## ⚙️ Configuration

### Environment Variables
The application relies on environment variables for sensitive data and configuration settings. These are loaded from the `.env` file.

| Variable                     | Description                                         | Default                    | Required |
|------------------------------|-----------------------------------------------------|----------------------------|----------|
| `VITE_API_URL`               | Base URL for the SkillSync Backend API              |`http://localhost:5000/api` | Yes      |
| `VITE_CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name for image uploads        | `(empty)`                  | Yes      |
| `VITE_CLOUDINARY_API_KEY`    | Your Cloudinary API key                             | `(empty)`                  | Yes      |
| `VITE_CLOUDINARY_API_SECRET` | Your Cloudinary API secret                          | `(empty)`                  | Yes      |
| `VITE_GOOGLE_CLIENT_ID`      | Google Client ID for OAuth authentication           | `(empty)`                  | Yes      |
| `VITE_SOCKET_URL`            | WebSocket URL for real-time communication           | `ws://localhost:5000`      | Yes      |

### Configuration Files
-   `vite.config.js`: Configures Vite for development and build processes.
-   `tailwind.config.js`: Customizes Tailwind CSS themes, variants, and plugins.
-   `postcss.config.js`: Configures PostCSS plugins, including Tailwind CSS and Autoprefixer.
-   `eslint.config.js`: Defines linting rules for consistent code style and quality.

## 🔧 Development

### Available Scripts
In the project directory, you can run:

| Command             | Description                                                   |
|---------------------|---------------------------------------------------------------|
| `npm run dev`       | Starts the development server with Vite.                      |
| `npm run build`     | Builds the app for production to the `dist` folder.           |
| `npm run lint`      | Runs ESLint to check for code style and potential errors.     |
| `npm run preview`   | Serves the production build locally for testing.              |

### Development Workflow
1.  Ensure all prerequisites, especially the backend API, are running.
2.  Install dependencies using `npm install`.
3.  Configure environment variables in `.env`.
4.  Start the development server with `npm run dev`.
5.  Develop components and features, changes will hot-reload.
6.  Use `npm run lint` regularly to maintain code quality.

## 🧪 Testing

This project uses ESLint for code linting.
```bash
# Run linting checks
npm run lint
```
No dedicated unit or integration testing framework (e.g., Jest, React Testing Library, Cypress) was explicitly detected in `package.json` or `SETUP_GUIDE.md`. Developers are encouraged to implement tests as the project evolves.

## 🚀 Deployment

### Production Build
To create an optimized production build:
```bash
npm run build
```
This command bundles the React application into static files in the `dist/` directory, ready for deployment.

### Deployment Options
The `dist/` folder can be deployed to any static site hosting service, such as:
-   **Vercel**
-   **Netlify**
-   **GitHub Pages**
-   **Firebase Hosting**
-   **Amazon S3**

Ensure your hosting environment's base URL matches your `VITE_API_URL` configuration if deploying to a non-root path or for server-side rendering setup (though this is a client-side only app).

## 🤝 Contributing

We welcome contributions to SkillSync! Please refer to the [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed development setup instructions.

If you have suggestions for improving this project, feel free to fork this repository and create a pull request, or open an issue with the tag "enhancement".

## 🙏 Acknowledgments

-   Built with [React](https://react.dev/) for an efficient UI.
-   Powered by [Vite](https://vitejs.dev/) for a fast development experience.
-   Styled using [Tailwind CSS](https://tailwindcss.com/) for utility-first styling.
-   Utilizes [Cloudinary](https://cloudinary.com/) for media management.
-   Leverages [Google OAuth](https://developers.google.com/identity/oauth2) for authentication.

## 📞 Support & Contact

-   🐛 Issues: [GitHub Issues](https://github.com/mahek-40/SkillSync/issues)

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by [Mahek](https://github.com/mahek-40)

</div>
