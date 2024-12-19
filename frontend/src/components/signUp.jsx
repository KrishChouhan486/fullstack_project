import React, { useState } from 'react';
import axios from 'axios';
import '../styles/signUp.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    avatar: null, // Add avatar
    coverImage: null, // Add coverImage
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData(); // Create a new FormData instance
      // Append all data to the FormData object
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await axios.post('https://fullstack-project-ufns.onrender.com/api/v1/user/register', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Signup Successful:', response.data);
      setSuccess('Signup successful! Please login.');
      setError('');
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Signup failed!');
      setSuccess('');
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name:</label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            placeholder="Choose a username"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            onChange={handleChange}
            required
          />
        </div>

        {/* Avatar Upload */}
        <div className="form-group">
          <label>Avatar:</label>
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        {/* Cover Image Upload */}
        <div className="form-group">
          <label>Cover Image:</label>
          <input
            type="file"
            name="coverImage"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        {/* Conditional rendering for error and success */}
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <button type="submit" className="btn">Signup</button>
      </form>

      {/* Login Option */}
      <div className="login-option">
        <p>Already have an account? <a href="/">Login here</a></p>
      </div>
    </div>
  );
};

export default Signup;
