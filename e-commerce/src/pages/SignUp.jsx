import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate from React Router
import { supabase } from '../supabaseClient'; // Import Supabase client

const SignUp = () => {
  const [firstName, setFirstName] = useState(''); // First Name
  const [lastName, setLastName] = useState(''); // Last Name
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Confirm Password
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Handle sign-up
  const handleSignUp = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      // Call Supabase signUp method
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      // Add user details to the 'users' table
      const { data, error: insertError } = await supabase
        .from('users')
        .insert([{ user_id: user.id, first_name: firstName, last_name: lastName, email }]);

      if (insertError) throw insertError;

      alert('Account created successfully! Please check your email to verify your account.');
      
      // Redirect to the Login page after successful sign-up
      navigate('/'); // Redirect to login page
    } catch (error) {
      console.error(error.message);
      setErrorMessage('Error signing up: ' + error.message); // Show the error message
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>

      {/* Display error message if passwords don't match */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <p>
        Already have an account?{' '}
        <span
          onClick={() => navigate('/')}
          style={{ color: 'blue', cursor: 'pointer' }}
        >
          Log In
        </span>
      </p>
    </div>
  );
};

export default SignUp;