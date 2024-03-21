import React from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'

export const Navbar = () => {
  return (
    <div> <nav>
    <ul className='content'>
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
    <ul className='auth'>
        <li>
<Link to="/login">Login</Link>
        </li>
        <li>
<Link to="/signup">SignUp</Link>
        </li>
    </ul>
  </nav></div>
  )
}
