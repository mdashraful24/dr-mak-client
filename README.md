# Dr. MAK Clinical Management System

<div align="center">
  <img height="500" src="https://drive.google.com/uc?export=view&id=1_amwLQREZtzbUBTwAap0UOOe8aCIdvYV" alt="Dr. MAK Clinical Management System Screenshot" />
</div>

<!-- <br/>

<div align="center">

![Status](https://img.shields.io/badge/Status-In%20Development-orange)

</div>

--- -->

## 📌 Project Overview

**Dr. MAK Clinical Management System** is a full-featured digital platform designed for a doctor's chamber. It allows the doctor to manage and track patient records, appointments, treatment history, and clinic workflows. The platform also serves as a professional medical portfolio and appointment management interface for a neurosurgeon — **Dr. M.A.K., MBBS, MS (Neurosurgery)**.

> ⚠️ **This project is currently under active development.** Features and structure may change.

---

## 🚀 Tech Stack

| Category | Technology |
|---|---|
| **Frontend Framework** | React 19, Vite 7 |
| **Styling** | Tailwind CSS 4, DaisyUI 5 |
| **UI Components** | Flowbite, Lucide React, React Icons, Swiper.js |
| **Animations** | Framer Motion, Motion, Lottie React |
| **Routing** | React Router 7, React Router Hash Link |
| **Data Fetching** | Axios, TanStack React Query 5 |
| **Forms & Validation** | React Hook Form 7, Yup, @hookform/resolvers |
| **Auth & Backend** | Firebase 12, JWT Decode |
| **Charts** | Recharts |
| **Notifications** | SweetAlert2, React Hot Toast, React Tooltip |
| **Date Utilities** | date-fns |

---

## 🗂️ Project Structure

```
src/
├── assets/           # Images, animations, icons
├── components/       # Shared + page-specific components
├── context/          # Global state stores
├── firebase/         # Firebase configuration
├── hooks/            # Custom React hooks
├── layouts/          # Layout wrappers (Public, Auth, Dashboard)
├── pages/            # All routes/pages
│   ├── Appointments/
│   ├── Auth/
│   ├── Control/
│   ├── Dashboard/
│   └── Services/
├── providers/        # Context providers
├── router/           # Router configuration
├── utils/            # Helper utilities
└── main.jsx          # Application entry point
```

---

## 🎯 Key Features

| Feature | Description |
|---|---|
| **Services** | Neurosurgery services listed with descriptions |
| **Blog** | Medical blog listing page |
| **Patient Reviews** | Swiper-based testimonials carousel with star ratings |
| **Contact Info** | Doctor's chamber location, phone, and schedule details |
| **Appointments** | Book and view patient appointments |
| **Reports** | Access and manage medical reports |
| **Settings Panel** | Multi-tab settings with sub-routes |
| **Notification Settings** | Control notification preferences |
| **Privacy Settings** | Account privacy and data controls |
| **Danger Zone** | Account deletion with confirmation modal |

<!-- 
### 🔜 Upcoming Features

- Electronic Health Record (EHR) module
- Prescription generation & printing system
- Medicine recommendation engine
- Full REST API integration for appointments & records
- Recharts-powered analytics for doctor/admin dashboards
- Dynamic blog with category filtering
- Patient review submission with star ratings -->

---

## 📦 Dependencies

### Runtime Dependencies

| Package | Version | Purpose |
|---|---|---|
| `react` | ^19.1.1 | Core UI library |
| `react-dom` | ^19.1.1 | React DOM renderer |
| `react-router` | ^7.9.5 | Client-side routing |
| `react-router-hash-link` | ^2.4.3 | Hash anchor navigation |
| `axios` | ^1.13.2 | HTTP client |
| `@tanstack/react-query` | ^5.90.21 | Server state management |
| `firebase` | ^12.8.0 | Auth & backend services |
| `jwt-decode` | ^4.0.0 | JWT token decoding |
| `react-hook-form` | ^7.69.0 | Form management |
| `@hookform/resolvers` | ^5.2.2 | Form validation resolvers |
| `yup` | ^1.7.1 | Schema validation |
| `tailwindcss` | ^4.1.16 | Utility-first CSS framework |
| `@tailwindcss/vite` | ^4.1.16 | Tailwind Vite plugin |
| `flowbite` | ^3.1.2 | UI component library |
| `framer-motion` | ^12.23.24 | Animation library |
| `motion` | ^12.23.24 | Motion utilities |
| `lottie-react` | ^2.4.1 | Lottie animation player |
| `lucide-react` | ^0.552.0 | Icon library |
| `react-icons` | ^5.5.0 | Icon library |
| `swiper` | ^12.0.3 | Slider & carousel |
| `recharts` | ^3.6.0 | Chart components |
| `sweetalert2` | ^11.26.17 | Alert/popup dialogs |
| `react-hot-toast` | ^2.6.0 | Toast notifications |
| `react-tooltip` | ^5.30.0 | Tooltip component |
| `date-fns` | ^4.1.0 | Date utility functions |

### Dev Dependencies

| Package | Version | Purpose |
|---|---|---|
| `vite` | ^7.1.7 | Build tool & dev server |
| `@vitejs/plugin-react` | ^5.0.4 | React plugin for Vite |
| `daisyui` | ^5.4.2 | Tailwind CSS component plugin |
| `eslint` | ^9.36.0 | JavaScript linter |
| `eslint-plugin-react-hooks` | ^5.2.0 | React Hooks lint rules |
| `eslint-plugin-react-refresh` | ^0.4.22 | Fast Refresh lint rules |

---

## ⚙️ Installation & Local Setup

### 1️⃣ Clone the repository

```sh
git clone https://github.com/mdashraful24/dr-mak-client.git
cd dr-mak-client
```

### 2️⃣ Install dependencies

```sh
npm install
```

### 3️⃣ Configure environment variables

Create a `.env.local` file in the project root and add the following:

```env
# Server API
VITE_API_URL=http://localhost:5000

# Firebase Configuration
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_project.firebaseapp.com
VITE_projectId=your_project_id
VITE_storageBucket=your_project.firebasestorage.app
VITE_messagingSenderId=your_messaging_sender_id
VITE_appId=your_app_id
```

> 🔑 Get your Firebase credentials from the [Firebase Console](https://console.firebase.google.com/).

### 4️⃣ Start the development server

```sh
npm run dev
```

The app will be available at `http://localhost:5173`.

### 5️⃣ Build for production

```sh
npm run build
```

### 6️⃣ Preview production build

```sh
npm run preview
```

---

## 🧩 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Runs the Vite development server |
| `npm run build` | Builds the production bundle |
| `npm run lint` | Lints the project using ESLint |
| `npm run preview` | Previews the production build |

---

## 🌐 Live Links

| Resource | Link |
|---|---|
| 🔗 Live Site | [dr-mak-180cf.web.app](https://dr-mak-180cf.web.app) |
| 🖥️ Backend Server | [dr-mak-server.vercel.app](https://dr-mak-server.vercel.app) |

---

## 🤝 Contributions

Currently not open to external contributions. Will be updated when the project stabilizes.

---

## 📄 License

This project is private and intended for professional showcasing only.
