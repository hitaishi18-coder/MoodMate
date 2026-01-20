import React from 'react'
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react"
import './App.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext';

const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkKey}>
      <ThemeProvider>
        <App/>
      </ThemeProvider>
    </ClerkProvider>
  </React.StrictMode>
)