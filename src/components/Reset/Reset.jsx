import React,{useState} from 'react'
import './Reset.css'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../../Firebase';

export const Reset = () => {
    const [email, setEmail] = useState('');
    const handleSubmit=async(e)=>{
        e.preventDefault();
        sendPasswordResetEmail(auth,email).then((data)=>{
            alert("check your mail")
        }).catch((err)=>{
            alert(err.message)
        })
    }
    return (
        <div>
           
            <div className="container"><h1>Forgot My Password</h1>
           <div className='input-box'><input type="email" name='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} required /></div>
            <button type='submit' className='submit' onClick={handleSubmit}>Reset Password</button></div> 
            
           
        </div>
    )
}
