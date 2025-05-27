import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Home/Dashboard";
import InterviewPrep from "./pages/InterviewPrep/InterviewPrep";
import UserProvider from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/interview-prep/:sessionId?" element={<InterviewPrep />} />


          </Routes>

          <Toaster
            toastOptions={{
              className: "",
              style: {
                fontSize: "13px",
              },
            }}
          />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
