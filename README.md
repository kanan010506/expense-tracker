# 💸 Expense Tracker

A clean and intuitive expense tracking web application built with **React** and **Vite**, deployed on GitHub Pages.

🔗 **Live Demo:** [kanan010506.github.io/expense-tracker](https://kanan010506.github.io/expense-tracker/)

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Deployment](#deployment)

---

## About

Expense Tracker is a lightweight single-page application that helps you keep track of your income and expenses. It provides a simple and fast interface to add, view, and manage transactions so you always know where your money is going.

---

## ✨ Features

- Add income and expense transactions
- View current balance at a glance
- Track transaction history
- Delete individual transactions
- Responsive design that works on desktop and mobile
- Fast, client-side only — no backend required

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI library |
| [Vite 7](https://vitejs.dev/) | Build tool & dev server |
| [gh-pages](https://github.com/tschaub/gh-pages) | Deployment to GitHub Pages |
| JavaScript (ES Modules) | Application logic |
| CSS | Styling |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/kanan010506/expense-tracker.git
   cd expense-tracker
```

2. **Install dependencies**
```bash
   npm install
```

3. **Start the development server**
```bash
   npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

---

## 📜 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the local development server |
| `npm run build` | Build the app for production into the `dist/` folder |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check for code issues |
| `npm run deploy` | Build and deploy the app to GitHub Pages |

---

## 📁 Project Structure
```
expense-tracker/
├── public/             # Static assets
├── src/                # Application source code
│   ├── components/     # React components
│   ├── App.jsx         # Root application component
│   └── main.jsx        # Application entry point
├── index.html          # HTML entry point
├── vite.config.js      # Vite configuration
├── eslint.config.js    # ESLint configuration
└── package.json        # Project metadata and dependencies
```

---

## 🌐 Deployment

This project is configured for deployment to **GitHub Pages** using the `gh-pages` package.

To deploy:
```bash
npm run deploy
```

This will automatically build the project and push the `dist/` folder to the `gh-pages` branch of the repository.

The `homepage` field in `package.json` is already set to:
```
https://kanan010506.github.io/expense-tracker/
```

---

> Made with ❤️ by [kanan010506](https://github.com/kanan010506)