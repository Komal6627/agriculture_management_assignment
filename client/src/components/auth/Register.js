import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Farmer', // Default role
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const host = "http://localhost:5000/api";  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send signup data to the backend
      const response = await axios.post(`${host}/auth/register`, formData);
      console.log('Registration Successful:', response.data);
      navigate('/login'); // Redirect to login page after successful registration
    } catch (err) {
      console.error('Error during registration:', err);
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h1 className="text-xl font-bold mb-4">Sign Up</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border p-2 w-full mb-4"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="border p-2 w-full mb-4"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="border p-2 w-full mb-4"
          required
        />
        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="border p-2 w-full mb-4"
        >
          <option value="Farmer">Farmer</option>
          <option value="Admin">Admin</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 w-full hover:bg-blue-600"
        >
          Sign Up
        </button>
        <p className="text-sm text-gray-500 mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
