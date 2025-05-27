import React, { useState, useContext } from 'react'; // Added useContext
import { useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import PhotoSelector from '../../components/inputs/PhotoSelector';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import uploadImage from '../../utils/uploadImage';
import { UserContext } from '../../context/UserContext'; // Import the context

function Signup({ setCurrentPage }) {
  const { updateUser } = useContext(UserContext); // Use context to get updateUser
  const [profilepic, setProfilepic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (!fullName || !email || !password) {
        throw new Error('Please fill in all fields');
      }

      let profileImgUrl = '';

      if (profilepic) {
        const imgUploadRes = await uploadImage(profilepic);
        profileImgUrl = imgUploadRes.imageUrl || '';
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImgUrl,
      });

      const { token } = response.data;
      if (token) {
        localStorage.setItem('token', token);
        updateUser(response.data);
        navigate('/dashboard');
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError(err.message || 'Something went wrong during signup');
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
      <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Create an Account</h3>
      <p className="text-gray-600 text-sm sm:text-base mb-4">Please enter your details to sign up</p>
      {error && (
        <p className="text-red-500 text-sm mb-4" role="alert">
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-600 mb-2 text-sm sm:text-base">
            Profile Photo (Optional)
          </label>
          <PhotoSelector
            image={profilepic}
            setImage={setProfilepic}
            preview={preview}
            setPreview={setPreview}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="full-name" className="block text-gray-600 mb-1 text-sm sm:text-base">
            Full Name
          </label>
          <input
            type="text"
            id="full-name"
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            placeholder="John Doe"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6F61] focus:border-transparent transition-all duration-200 text-sm sm:text-base hover:border-[#FF6F61]"
            required
          />
        </div>
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
              Signing up...
            </>
          ) : (
            'Sign Up'
          )}
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600 text-sm sm:text-base">
        Already have an account?{' '}
        <button
          onClick={() => setCurrentPage('login')}
          className="text-[#FF6F61] hover:underline focus:outline-none focus:ring-2 focus:ring-[#FF6F61] rounded"
        >
          Login
        </button>
      </p>
    </div>
  );
}

export default Signup;