import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import './Navbar.css';
import { FaHome, FaAddressBook, FaHandHoldingHeart, FaUserCircle }from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navLinksRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        navLinksRef.current &&
        !navLinksRef.current.contains(event.target) &&
        event.target !== document.querySelector('.menu-icon')
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLinkClick = () => {
    if (window.innerWidth <= 450) {
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src="logo.png" alt="logo" />
        </Link>
      </div>
      <div
        className={`nav-links ${isMenuOpen ? 'open' : ''}`}
        ref={navLinksRef}
      >
        <Link to="/home" onClick={handleLinkClick}>
          <FaHome className="icon" />
          Home
        </Link>
        <Link to="/contact-us" onClick={handleLinkClick}>
          <FaAddressBook className="icon" />
          Contacts
        </Link>
        <Link to="/donate" onClick={handleLinkClick}>
          <FaHandHoldingHeart className="icon" />
          Donate
        </Link>
        <Link to="/profile" onClick={handleLinkClick}>
          <FaUserCircle className="icon" />
          Profile
        </Link>
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        &#9776;
      </div>
      {isModalOpen && (
        <LoginForm closeModal={closeModal} />
      )}
    </nav>
  );
};

export default Navbar;
