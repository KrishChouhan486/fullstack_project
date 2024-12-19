import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import '../styles/login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use navigate hook for programmatic navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://fullstack-project-ufns.onrender.com/api/v1/user/login', {
        email,
        password,
      });
      console.log('Login Successful:', response.data);
      alert('Login Successful!');
      
      // Save token to localStorage (or handle it as needed)
      localStorage.setItem('token', response.data.token);

      // Redirect to homepage after successful login
      navigate('/home');  // Redirect to Home page (or whatever route is your home page)
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Login failed!');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn">Login</button>
      </form>
      
      {/* Signup Option */}
      <div className="signup-option">
        <p>Don't have an account? <Link to="/signup">Signup here</Link></p>
      </div>
    </div>
  );
};

export default Login;
