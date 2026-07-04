import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Car Rental</h1>
          <p>Rent your favorite car at the best prices</p>
          <button onClick={() => navigate("/cars")} className="cta-btn">
            Browse Cars
          </button>
        </div>
      </section>

      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Wide Selection</h3>
            <p>Choose from our wide range of vehicles for every occasion</p>
          </div>
          <div className="feature-card">
            <h3>Affordable Prices</h3>
            <p>Competitive pricing on all our rental vehicles</p>
          </div>
          <div className="feature-card">
            <h3>Easy Booking</h3>
            <p>Quick and simple booking process</p>
          </div>
          <div className="feature-card">
            <h3>24/7 Support</h3>
            <p>Customer support available round the clock</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Rent?</h2>
        <p>Browse our collection and find the perfect car for your needs</p>
        <button onClick={() => navigate("/cars")} className="cta-btn">
          Start Browsing
        </button>
      </section>
    </div>
  );
};

export default Home;