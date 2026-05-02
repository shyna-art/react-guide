import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogIn from './pages/LogIn';  // LogIn page
import SignUp from './pages/SignUp'; // SignUp page
import Dashboard from './pages/Dashboard'; // Dashboard page

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogIn />} /> {/* Log In Page */}
        <Route path="/sign-up" element={<SignUp />} /> {/* Sign Up Page */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard Page */}
      </Routes>
    </Router>
  );
};

export default App;