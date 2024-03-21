import React,{useState} from 'react'
import { MdOutlineEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from '../../../Firebase';

export const SignUp = () => {
  const navigate=useNavigate();
  const [name,setName]=useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onSubmit = async (e) => {
    e.preventDefault()
   
    await createUserWithEmailAndPassword(auth,email, password)
      .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigate("/login")
          // ...
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          // ..
      });

 
  }
  return (
    <div className='my-container'>
    <div className="wrapper">
 <form action="">
     <h1>SignUp</h1>
     <div className="input-box">
     <div className='input'>
         <input type="text" name='name' placeholder='Name'  onChange={(e)=>setName(e.target.value)}required/>
         <FaUser className='icon'/>
     </div>
     <div>
     <input type="email" name='email' placeholder='Email' onChange={(e)=>setEmail(e.target.value)} required/>
         <MdOutlineEmail className='icon'/>
     </div>
     <div className="password-box">
         <input type="password" name='password' onChange={(e)=>setPassword(e.target.value)} placeholder='Password' required/>
         <FaLock className='icon'/>
     </div>

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
 </div>)
}
