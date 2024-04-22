import React, { useState } from 'react';
import { MdOutlineEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../Firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import './Login.css';

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showInvalidCredentials, setShowInvalidCredentials] = useState(false);

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // Show invalid credentials message
        setShowInvalidCredentials(true);
      });
  }

  return (
    <div className='my-container'>
      <div className="wrapper">
        <form action="">
          <h1>Login</h1>
          <div className='input'>
            <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} required />
            <MdOutlineEmail className='icon' />
          </div>
          <div className="password-box">
            <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} required />
            <FaLock className='icon' />
          </div>
          <div className="forgot">
            <Link to="/forgot">Forgot Password</Link>
          </div>
          <button type='submit' className='submit' onClick={onLogin}>Login</button>
          <div className="register">
            <p>Don't have an account? <Link to="/signup">Register</Link> </p>
          </div>
        </form>
      </div>
      {showInvalidCredentials && (
        <div className="invalid-credentials-popup">
          Invalid credentials. Please try again.
        </div>
      )}
    </div>
  )
}
