# Expense Tracker Frontend

React + Vite + Tailwind CSS frontend application.

## Development Server

Development server runs on port 5173.

- Development URL: `http://localhost:5173/`
- Hot Module Replacement: Enabled via Vite

## Project Structure

- `src/main.tsx` - React entrypoint; imports `src/index.css` and mounts `src/App.tsx` into `#root`
- `src/App.tsx` - Primary routing and layout setup
- `src/index.css` - Global CSS entrypoint and Tailwind CSS v4 import
- `index.html` - HTML shell
- `package.json` - Dependencies and build scripts
- `vite.config.ts` - Vite configuration with React, Tailwind CSS v4, and `@` alias for `src`

## Key Dependencies

- Runtime: React 19, React DOM 19, React Router 7, Recharts, Lucide React
- Styling: Tailwind CSS v4 with `@tailwindcss/vite`
- Build Tooling: Vite 8, TypeScript 5.7
