import React from "react";
import "../assets/styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Car Rental</h3>
          <p>Your trusted partner for car rentals</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/cars">Cars</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: info@carrental.com</p>
          <p>Phone: +1-800-CAR-RENT</p>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} Car Rental. All rights reserved.
      </div>
    </footer>
  );
}

