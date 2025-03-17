import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found. Please log in.');
      setLoading(false);
      return;
    }

    try {
      // Decode the token (assuming it's a JWT)
      const base64Url = token.split('.')[1];
      if (!base64Url) {
        throw new Error('Invalid token format.');
      }

      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const decodedToken = JSON.parse(window.atob(base64));

      console.log('Decoded Token:', decodedToken); // Log the decoded token for debugging

      // Check if the required fields exist in the token payload
      if (!decodedToken.fullname || !decodedToken.email || !decodedToken.phone_number) {
        throw new Error('Token does not contain required user details.');
      }

      setUserData(decodedToken); // Set user data from the decoded token
    } catch (err) {
      console.error('Error decoding token:', err.message);
      setError('Invalid token. Please log in again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const getInitials = () => {
    if (userData?.username) {
      return userData.username.charAt(0).toUpperCase();
    }
    return 'U';
  };

  if (loading) return <p>Loading user data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      {userData ? (
        <div className="profile-container">
          <div className="profile-photo">
            <span>{getInitials()}</span>
          </div>
          <div className="profile-sections">
            <div className="section personal-details">
              <h3>Personal Details</h3>
              <div className="profile-details">
                <p>
                  <strong>Full Name:</strong> {userData.fullname || 'N/A'}
                </p>
                <p>
                  <strong>Email:</strong> {userData.email || 'N/A'}
                </p>
                <p>
                  <strong>Phone Number:</strong> {userData.phone_number || 'N/A'}
                </p>
              </div>
            </div>

            <div className="section account">
              <h3>Account</h3>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default UserProfile;