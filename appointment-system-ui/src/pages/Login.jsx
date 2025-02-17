import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthService from '../services/AuthServise';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for token on mount
    const token = localStorage.getItem('accessToken');
    if (token) {
      // Redirect to '/available-slots' if already logged in
      navigate('/available-slots');
    }
  }, [navigate]); // Dependency array ensures this effect runs only once after component mounts

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    setLoading(true);
    try {
      const data = await AuthService.login(username, password);
      if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
        navigate('/available-slots');
      } else {
        setError('Login failed: No access token received.');
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Invalid username or password.');
      } else {
        setError('An error occurred. Please try again later.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#121212] to-[#1E1E1E] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-[#1E1E1E] p-8 rounded-lg shadow-md border border-gray-700"
      >
        {/* Header Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-400">Sign in to your account</p>
        </div>
        {/* Error Message */}
        {error && (
          <div className="mt-4 text-red-500 text-sm text-center" aria-live="polite">
            {error}
          </div>
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
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-400">
              Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-[#39FF14] focus:border-[#39FF14] bg-[#2A2A2A] text-white sm:text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-400 hover:text-gray-300"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-[#39FF14] hover:bg-[#32CD32] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#39FF14]"
            >
              {loading ? 'Signing In...' : 'Sign In'}
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
      </motion.div>
    </div>
  );
};

export default Login;
