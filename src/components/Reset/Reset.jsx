import React from 'react'
import './Reset.css'

export const Reset = () => {
    return (
        <div>
           <div className="container"><h1>Forgot My Password</h1>
           <div className='input-box'><input type="email" name='email' placeholder='Email' required /></div>
            <button type='submit' className='submit' >Reset Password</button></div> 
        </div>
    )
}
