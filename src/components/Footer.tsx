import React from 'react'
const Footer = () => {
    return (
        <footer className='mt-auto'>
            <div className="footer-container">
                <div className="footer-section">
                    <h4>Explore</h4>
                    <ul>
                        <li><a href="#">Movies</a></li>
                        <li><a href="#">Events</a></li>
                        <li><a href="#">Plays</a></li>
                        <li><a href="#">Sports</a></li>
                        <li><a href="#">Activities</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Help</h4>
                    <ul>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">FAQs</a></li>
                        <li><a href="#">Terms and Conditions</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Connect With Us</h4>
                    <ul className="social-media">
                        <li><a href="#"><img src="facebook-icon.png" alt="Facebook"/></a></li>
                        <li><a href="#"><img src="twitter-icon.png" alt="Twitter"/></a></li>
                        <li><a href="#"><img src="instagram-icon.png" alt="Instagram"/></a></li>
                        <li><a href="#"><img src="youtube-icon.png" alt="YouTube"/></a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Partner With Us</h4>
                    <ul>
                        <li><a href="#">List Your Show</a></li>
                        <li><a href="#">Advertise</a></li>
                        <li><a href="#">Become an Affiliate</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2025 BookMyShow. All Rights Reserved.</p>
            </div>
        </footer>

    )
}

export default Footer
