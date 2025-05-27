import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import axiosInstance from '../../utils/axiosInstance';
import { UserContext } from '../../context/UserContext';

function Login({ setCurrentPage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {updateUser} = useContext(UserContext)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post('/api/auth/login', {
        email,
        password,
      });

      const token = response.data.token;
      localStorage.setItem('token', token);
      updateUser(response.data)
      navigate('/dashboard');
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred during login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="p-4 sm:p-6">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h3>
      <p className="text-gray-600 text-sm sm:text-base mb-4">Please enter your login details</p>
      {error && (
        <p className="text-red-500 text-sm mb-4" role="alert">
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600 mb-1 text-sm sm:text-base">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            placeholder="john@example.com"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6F61] focus:border-transparent transition-all duration-200 text-sm sm:text-base hover:border-[#FF6F61]"
            required
            aria-describedby={error ? 'email-error' : undefined}
          />
        </div>
        <div className="mb-4 relative">
          <label htmlFor="password" className="block text-gray-600 mb-1 text-sm sm:text-base">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              placeholder="Enter your password"
              className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6F61] focus:border-transparent transition-all duration-200 text-sm sm:text-base hover:border-[#FF6F61]"
              required
              aria-describedby={error ? 'password-error' : undefined}
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#FF6F61] transition-colors duration-200"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <FaRegEyeSlash className="w-5 h-5" />
              ) : (
                <FaRegEye className="w-5 h-5" />
              )}
            </button>
          </div>
          <div className="mt-2 text-right">
            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="text-[#FF6F61] text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-[#FF6F61] rounded"
            >
              Forgot Password?
            </button>
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full px-4 py-2 bg-[#FF6F61] text-white rounded-full hover:bg-[#FF8A80] transition-colors duration-200 text-sm sm:text-base flex items-center justify-center ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8h-8z"
                ></path>
              </svg>
              Logging in...
            </>
          ) : (
            'Login'
          )}
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600 text-sm sm:text-base">
        Don’t have an account?{' '}
        <button
          onClick={() => setCurrentPage('signup')}
          className="text-[#FF6F61] hover:underline focus:outline-none focus:ring-2 focus:ring-[#FF6F61] rounded"
        >
          Sign Up
        </button>
      </p>
    </div>
  );
}

export default Login;
