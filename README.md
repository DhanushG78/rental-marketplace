# 🏠 RentEase Premium: Luxury Rental Marketplace

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12-orange?style=flat-square&logo=firebase)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-blue?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Zustand](https://img.shields.io/badge/Zustand-5-8b5cf6?style=flat-square)](https://zustand-demo.pmnd.rs/)

**RentEase** is a production-grade, full-stack rental marketplace built with modern web technologies. Designed for both property hunters and real estate managers, it offers a seamless experience with real-time data synchronization, robust state management, and a premium, high-aesthetic UI.

![RentEase Hero Preview](file:///C:/Users/lenovo/.gemini/antigravity/brain/f732ff7b-5e3b-4c50-be6c-0597b2e57b56/hero_screenshot_mockup_1775106409962.png)

---

## ✨ Key Features

### 🔍 Advanced Property Discovery
- **Real-time Search:** Instantly filter properties by location, price range, and bedroom count.
- **Dynamic Categorization:** Browse by property types (Apartments, Villas, Houses, etc.).
- **Detailed Insights:** View exhaustive property details including area (sqft), furnishing status, and amenities.

### 👤 Role-Based Access Control (RBAC)
- **Admin Dashboard:** Exclusive access to create, edit, and delete property listings with real-time Firestore updates.
- **User Experience:** Seamless browsing, personalized wishlists, and secure authentication.

### ❤️ Personalized Wishlist
- **Persistent State:** Save your favorite properties to a wishlist that persists across sessions using Zustand and LocalStorage.
- **Instant Feedback:** Toast notifications (via React Hot Toast) for all user interactions.

### 🛡️ Production-Grade Backend
- **Firebase Firestore:** Real-time NoSQL database for lightning-fast property data retrieval and updates.
- **Firebase Authentication:** Secure user sign-in and session management.

---

## 🚀 Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Next.js 16 (App Router)** | Core framework for SSR, routing, and React 19 support. |
| **Firebase 12** | Backend-as-a-Service for Auth and Firestore database. |
| **Zustand 5** | Lightweight, high-performance global state management. |
| **Tailwind CSS 4** | Modern utility-first styling with advanced design tokens. |
| **Lucide React** | Clean, consistent iconography. |
| **React Hot Toast** | Elegant, non-blocking notifications. |
| **TypeScript** | Static typing for enterprise-level stability. |

---

## 🎨 UI/UX Design Philosophy

RentEase follows a **Premium Modernist** design language:
- **Aesthetics:** Soft shadows, vibrant gradients, and a clear visual hierarchy.
- **Interactivity:** Glassmorphism headers, micro-animations on hover, and smooth transitions.
- **Accessibility:** Fully responsive layout optimized for mobile, tablet, and desktop viewports.
- **Dark Mode:** Deep, high-contrast dark theme for a sophisticated night-time experience.

![Admin Dashboard Preview](file:///C:/Users/lenovo/.gemini/antigravity/brain/f732ff7b-5e3b-4c50-be6c-0597b2e57b56/dashboard_mockup_1775106428929.png)

---

## 🛠️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/rent-ease-premium.git
cd rent-ease-premium
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory and add your Firebase credentials:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📂 Project Structure

```text
src/
├── app/            # Next.js App Router (Pages, Layouts, API)
├── components/     # High-level layout components (Navbar, UI elements)
├── config/         # App-wide configurations
├── hooks/          # Custom React hooks (Data fetching, Auth)
├── lib/            # External library initializations (Firebase)
├── modules/        # Domain-specific logic (Items, Auth)
├── store/          # Zustand global state stores
└── types/          # Global TypeScript interfaces
```

---

## 📄 License
This project is licensed under the MIT License.

---

<p align="center">
  MADE BY ANTIGRAVITY 🚀
</p>
