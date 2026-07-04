import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/carCard.css";

const CarCard = ({ car }) => {
  const navigate = useNavigate();

  return (
    <div className="car-card">
      <div className="car-image">
        <div className="image-placeholder">{car.name}</div>
      </div>
      <div className="car-info">
        <h3>{car.name}</h3>
        <p className="brand-model">
          {car.brand} {car.model}
        </p>
        <p className="year">Year: {car.year}</p>
        <div className="car-specs">
          <span className="spec">{car.fuelType}</span>
          <span className="spec">{car.transmission}</span>
          <span className="spec">{car.seats} Seats</span>
        </div>
        <div className="car-footer">
          <p className="price">₹{car.pricePerDay}/day</p>
          <button
            onClick={() => navigate(`/car/${car._id}`)}
            className="view-details-btn"
          >
            View Details
          </button>
        </div>
        <p className={`availability ${car.available ? "available" : "unavailable"}`}>
          {car.available ? "Available" : "Not Available"}
        </p>
      </div>
    </div>
  );
};

export default CarCard;