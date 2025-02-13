import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from '../services/AuthServise';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }

    // Simulate API call for login
    try {
      // Replace with your actual API call
      const response = await AuthService.login({ username, password });

      if (response.ok) {
        const data = await response.json();
        // Save token or user data to state/context
        localStorage.setItem('authToken', data.token); // Example: Save token
        navigate('/available-slots'); // Redirect to dashboard or home page
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Invalid username or password.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#121212] to-[#1E1E1E] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-[#1E1E1E] p-8 rounded-lg shadow-md border border-gray-700">
        {/* Header Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-400">Sign in to your account</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 text-red-500 text-sm text-center">{error}</div>
        )}

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {/* Username Field */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-400">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-[#39FF14] focus:border-[#39FF14] bg-[#2A2A2A] text-white sm:text-sm"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-400">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-[#39FF14] focus:border-[#39FF14] bg-[#2A2A2A] text-white sm:text-sm"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-[#39FF14] hover:bg-[#32CD32] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#39FF14]"
            >
              Sign In
            </button>
          </div>
        </form>

        {/* Signup Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="font-medium text-[#39FF14] hover:text-[#32CD32]"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;