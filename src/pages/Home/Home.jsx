import React from 'react'
import { Link } from 'react-router-dom'
import homeimg from '../../assets/images/background-img-2.png'
import './Home.css'

export const Home = () => {
  return (
    <div> 
        <section className="hero">
          <h1><span>CampusNest Finder</span></h1>
          <h3><span>Discover Your Nest Away from Home with CampusNest Finder</span></h3>
          <div className="search1">
          <Link to="/search"> <button className='search'>Search PG</button></Link>
          </div>
          
        </section>
        <section className='description'>
        <div class="container">
    <h2>Why Choose CampusNest Finder?</h2>
    <div class="features">
      <div className="feature1">
      <div class="feature">
        <h3>Ease of Use</h3>
        <p>Quickly search for PGs, rooms, flats, or hostels in your college area.</p>
      </div>
      <div class="feature">
        <h3>Compare Options</h3>
        <p>Compare rates, amenities, and reviews to find the best residence for you.</p>
      </div>
      </div>
      <div className="feature1">
      <div class="feature">
        <h3>Real-Time Vacancy Status</h3>
        <p>Get instant updates on PG vacancy status maintained by owners.</p>
      </div>
      <div class="feature">
        <h3>Secure Bookings</h3>
        <p>Securely book your accommodation hassle-free.</p>
      </div>
      </div>
    </div>
  </div>
        </section>
        <footer class="footer">
  <div class="container">
    <div class="footer-content">
      <div class="footer-column">
        <h4>About Us</h4>
        <p>This project built by students of PCCOE Pune for the students in the Akurdi Area for PG/Room  searching purpose.</p>
      </div>
      <div class="footer-column">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/search">Search</a></li>
          <li><a href="/book-room">Book Room</a></li>
          <li><a href="#">Contact Us</a></li>
        </ul>
      </div>
      <div class="footer-column">
        <h4>Contact Info</h4>
        <p>Email: info@campusnestfinder.com</p>
        <p>Phone: +918605256138</p>
      </div>
      
    </div>
    <div class="copyright">
      <p>&copy; 2024 CampusNest Finder. All rights reserved.</p>
    </div>
  </div>
</footer>

      </div>
  )
}
