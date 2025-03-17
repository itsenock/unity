import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserProfile.css';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState('');

  // State for change password
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  // State for delete account feedback
  const [deleteMessage, setDeleteMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found. Please log in.');
          setLoading(false);
          return;
        }
        const response = await axios.get('https://donate-api-2.onrender.com', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to load user data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <p>Loading user data...</p>;
  if (error) return <p>{error}</p>;

  const getInitials = () => {
    if (userData.username) {
      return userData.username.charAt(0).toUpperCase();
    }
    return 'U';
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };


  const personalDetailsFields = [
    { key: 'fullname', label: 'Full Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone_number', label: 'Phone Number' },
  ];

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
                {personalDetailsFields.map((field) => (
                  <p key={field.key}>
                    <strong>{field.label}:</strong>{' '}
                    {editingField === field.key ? (
                      <>
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                        />
                        <button className="save-button" onClick={handleSave}>
                          Save
                        </button>
                      </>
                    ) : (
                      <>
                        {userData[field.key]}{' '}
                        <button
                          className="edit-button"
                          onClick={() => handleEdit(field.key)}
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </p>
                ))}
              </div>
            </div>

            <div className="section manage-items">
              <h3>Manage Items</h3>
              <Link to="/manage-items" className="manage-items-link">
                Manage Your Items
              </Link>
            </div>

            <div className="section account">
              <h3>Account</h3>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
              <button
                className="delete-account-button"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </button>
            </div>

            <div className="section change-password">
              <h3>Change Password</h3>
              {!showChangePassword ? (
                <button
                  className="change-password-button"
                  onClick={() => setShowChangePassword(true)}
                >
                  Change Password
                </button>
              ) : (
                <div className="change-password-form">
                  <div>
                    <label>Old Password:</label>
                    <input
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>New Password:</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Confirm New Password:</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  {passwordMessage && (
                    <p className="password-message">{passwordMessage}</p>
                  )}
                  <button
                    className="save-password-button"
                    onClick={handleChangePassword}
                  >
                    Save Password
                  </button>
                  <button
                    className="cancel-password-button"
                    onClick={() => {
                      setShowChangePassword(false);
                      setPasswordMessage('');
                      setOldPassword('');
                      setNewPassword('');
                      setConfirmPassword('');
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {deleteMessage && (
              <p className="delete-message">{deleteMessage}</p>
            )}
          </div>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default UserProfile;
