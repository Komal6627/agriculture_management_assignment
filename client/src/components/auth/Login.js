import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../redux/slice/authSlice.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' }); // State to hold form inputs
  const [error, setError] = useState(''); // State to manage error messages
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate function

  const host = "http://localhost:5000/api";  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart()); // Dispatch login start
    setError(''); // Clear previous errors
    try {
      const { data } = await axios.post(`${host}/auth/login`, formData); // Call the login API

      // Store the token in localStorage
      localStorage.setItem('authToken', data.token);  // Save the JWT token

      // Save role and token in Redux store
      dispatch(loginSuccess({ token: data.token, role: data.role }));
      
      alert('Login successful');
      navigate('/dashboard'); // Navigate to the dashboard on successful login
    } catch (err) {
      dispatch(loginFailure(err.response?.data?.message || 'Login failed. Please try again.'));
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h1 className="text-xl font-bold mb-4">Login</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>} {/* Display error message */}
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="border p-2 w-full mb-4 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="border p-2 w-full mb-4 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600 transition">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
