import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import './Navbar.css';
import { auth } from '../../Firebase.js'
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { CgProfile } from "react-icons/cg";
import Logo from "../assets/images/image.png"

export const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  return (
    <nav>
      <div className="navbar">
      <div className='logo'>
        <img className='img' src={Logo} alt="Logo" />
      </div>
      <div className="list">
      <ul className="content">

        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/search">Search</Link>
        </li>
        <li>
          <Link to="/book-room">Book Room</Link>
        </li>
      </ul>
      </div>
      <div className="authenticate">
      <ul className="auth">
        {user ? (
          <li>
            <div className="profile">
            <CgProfile />
              <div className="dropdown-content">
                <Link to="/home">{user.email}</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login" className='login'>Login</Link>
            </li>
            <li>
              <Link to="/signup" className='signup'>SignUp</Link>
            </li>
          </>
        )}
      </ul>
      </div>
      </div>
    </nav>
  );
};
