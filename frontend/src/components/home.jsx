import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();  // Use useNavigate instead of useHistory

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');  // Redirect to login if the token is not available
    } else {
      // Fetch user data or handle logged-in state
      setUser({ name: 'John Doe' });  // Example user data
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove token on logout
    navigate('/');  // Redirect to login after logout
  };

  return (
    <div className="home-container">
      <h1>Welcome to Home, {user ? user.name : 'Guest'}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
