import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import './Navbar.css';
import { auth, database } from '../../Firebase.js'; // Import database from Firebase
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { CgProfile } from "react-icons/cg";
import Logo from "../assets/images/image.png";
import { ref,get} from "firebase/database";

export const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false); 
  const [userRole, setUserRole] = useState(''); 
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
    
        const userRef = ref(database, 'users/' + user.uid);
        const snapshot = await get(userRef);
        const userData = snapshot.val();
        if (userData) {
          setUserRole(userData.role);
        }
      } else {
        setUser(null);
        setUserRole('');
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
            {userRole === 'Owner' && (
              <li>
                <Link to="/add-room">Add Room</Link> 
              </li>
            )}
            {userRole === 'Student' && (
              <li>
                <Link to="/book-room">Book Room</Link> 
              </li>
            )}
          </ul>
        </div>
        <div className="authenticate">
          <ul className="auth">
            {user ? (
              <li>
                <div className="profile" onClick={() => setShowDropdown(!showDropdown)}>
                  <CgProfile />
                  {showDropdown && (
                    <div className="dropdown-content">
                      <p >{user.email}</p>
                      {userRole === 'Student' && (
             <p > <Link to="/myroom" className='myrooms'>My Rooms</Link> </p>
               
              
            )}
            {userRole === 'Owner' && (
             <p > <Link to="/myroom1" className='myrooms'>My Rooms</Link> </p>
               
              
            )}
                      <button onClick={handleLogout}>Logout</button>
                    </div>
                  )}
                </div>
              </li>
            ) : (
              <li>
                <Link to="/login" className='login'>Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
