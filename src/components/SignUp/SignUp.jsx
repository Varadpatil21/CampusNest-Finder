import React, { useState, useEffect } from 'react';
import { MdOutlineEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import '../Login/Login.css';
import { auth, database } from '../../../Firebase'; // Import auth and database from Firebase
import { ref,set } from "firebase/database";


export const SignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [accountcreated, setAccountCreated] = useState(false);
    const [alreadyExist,setAlreadyExist]=useState(false);
    const [minPassword,setMinPassword]=useState(true);
    useEffect(() => {
        if (accountcreated) {
            const timer = setTimeout(() => {
                setAccountCreated(false);
                navigate("/");
            }, 2000); 
            return () => clearTimeout(timer);
        }
    }, [accountcreated, navigate]);
    const checkSize = (password) => {
        if (password.length >= 6) {
            setMinPassword(false);
        } else {
            setMinPassword(true);
        }
    };
    
    const onSubmit = async (e) => {
        e.preventDefault();
    
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // Store user details in Realtime Database
                const userRef = ref(database, 'users/' + user.uid); // 'ref' is imported from 'firebase/database'
                set(userRef, {
                    name: name,
                    email: email,
                    role: role,
                });
                console.log("data added successfully")
                setAccountCreated(true);
                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if(errorCode==="auth/weak-password")
                    setMinPassword(true)
                else if(errorCode==="auth/email-already-in-use")
                setAlreadyExist(true)
                console.log(errorCode,errorMessage);
            });
    };
    

    return (
        <div className='my-container'>
            <div className="wrapper">
                <form action="">
                    <h1>SignUp</h1>

                    <div className='input'>
                        <input type="text" name='name' placeholder='Name' onChange={(e) => setName(e.target.value)} required />
                        <FaUser className='icon' />
                    </div>
                    <div className='email'>
                        <input type="email" name='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} required />
                        <MdOutlineEmail className='icon' />
                    </div>
                    <div className="password-box">
                    <input type="password" name='password' onChange={(e) => {
                        setPassword(e.target.value);
                        checkSize(e.target.value);
                    }} placeholder='Password' required />
                     <FaLock className='icon' />
                    </div>

                    <div>
                    <select className="role-select" onChange={(e) => setRole(e.target.value)} value={role} required>
        <option value="">Select Role</option>
        <option value="Owner">Owner</option>
        <option value="Student">Student</option>
    </select>
                    </div>

                    <button type='submit' className='submit' onClick={onSubmit}>SignUp</button>

                </form>
                <p>
                    Already have an account?{' '}
                    <NavLink to="/login" >
                        Sign in
                    </NavLink>
                </p>
            </div>
            {accountcreated && (
                <div className="account-created-popup">
                    Account Created Successfully
                </div>
            )}
            {alreadyExist && (
                <div className="user-already-exist-popup">
                    User Already Exist
                </div>
            )}
            {minPassword && (
                <div className="min-password-popup">
                    Enter at least 6 character password
                </div>
            )}
        </div>
    );
};
