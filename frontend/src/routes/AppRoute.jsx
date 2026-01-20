import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import News from "../pages/News";
import Music from "../pages/Music";
import Yoga from "../pages/Yoga";
import Food from "../pages/Food";
import Jokes from "../pages/Jokes";
import Quotes from "../pages/Quotes";
import Memes from "../pages/Memes";
import Weather from "../pages/Weather";
import Expense from "../pages/Expense";
import Todo from "../pages/Todo";
import About from "../pages/About";
import TimerAlarm from "../pages/TimerAlarm";
import DailyDiary from "../pages/DailyDiary";

import SignInPage from "../pages/SignIn";
import SignUpPage from "../pages/SignUp";
import Profile from "../pages/Profile";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />

      {/* Protected */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/news"
        element={
          <ProtectedRoute>
            <News />
          </ProtectedRoute>
        }
      />
      <Route
        path="/memes"
        element={
          <ProtectedRoute>
            <Memes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/music"
        element={
          <ProtectedRoute>
            <Music />
          </ProtectedRoute>
        }
      />
      <Route
        path="/yoga"
        element={
          <ProtectedRoute>
            <Yoga />
          </ProtectedRoute>
        }
      />
      <Route
        path="/food"
        element={
          <ProtectedRoute>
            <Food />
          </ProtectedRoute>
        }
      />
      <Route
        path="/jokes"
        element={
          <ProtectedRoute>
            <Jokes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/quotes"
        element={
          <ProtectedRoute>
            <Quotes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/weather"
        element={
          <ProtectedRoute>
            <Weather />
          </ProtectedRoute>
        }
      />
      <Route
        path="/todo"
        element={
          <ProtectedRoute>
            <Todo />
          </ProtectedRoute>
        }
      />
      <Route
        path="/expense"
        element={
          <ProtectedRoute>
            <Expense />
          </ProtectedRoute>
        }
      />
      <Route
        path="/timer"
        element={
          <ProtectedRoute>
            <TimerAlarm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dailydiary"
        element={
          <ProtectedRoute>
            <DailyDiary />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/about"
        element={
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
