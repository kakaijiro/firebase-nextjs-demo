# Firebase Next.js Demo

This is a demo application for real estate property search and management, built with Next.js (App Router) and Firebase. It features user authentication, property management, favorites, and an admin dashboard.

## Features

- Firebase Authentication (Email/Password, Google Login)
- Property listing and detail pages
- Property search and filtering
- Favorites management
- Admin dashboard (create, edit, delete properties)
- Responsive UI (Tailwind CSS)

## Getting Started

1. Clone this repository
2. Set up required environment variables in `.env.local` (Firebase API keys, etc.)
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Directory Structure

- `app/` ... Next.js App Router pages and routing
- `components/` ... UI components
- `firebase/` ... Firebase client/server initialization
- `data/` ... Data logic for properties and favorites
- `context/` ... React Context (e.g., authentication)
- `types/` ... Type definitions
- `validation/` ... Validation schemas

## Tech Stack

- Next.js 15 (App Router)
- React 19
- Firebase (Auth, Firestore, Storage)
- Tailwind CSS
- Zod, React Hook Form

## License

MIT

## Live Demo

You can see the live site [here](https://firebase-nextjs-demo-eta.vercel.app/).
