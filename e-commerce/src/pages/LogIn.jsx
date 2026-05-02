import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate from React Router
import { supabase } from '../supabaseClient'; // Import Supabase client

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      alert('Logged in successfully');
      navigate('/dashboard'); // Redirect to dashboard after successful login
    } catch (error) {
      console.error(error.message);
      alert('Error logging in');
    }
  };

  // Navigate to the SignUp page
  const handleSignUpRedirect = () => {
    navigate('/sign-up'); // Redirect to the SignUp page
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Log In</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Log In</button>
      </form>

      <p>
        Don’t have an account?{' '}
        <span
          onClick={handleSignUpRedirect}
          style={{ color: 'blue', cursor: 'pointer' }}
        >
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default LogIn;