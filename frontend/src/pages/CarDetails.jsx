import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCarById } from "../services/carService";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";
import "../assets/styles/carDetails.css";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);
        const response = await getCarById(id);
        setCar(response.data.car || response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch car details");
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  const handleBooking = () => {
    if (!user) {
      alert("Please login to book a car");
      navigate("/login");
    } else {
      navigate(`/booking/${id}`);
    }
  };

  if (loading) return <Loader />;

  if (!car) return <div className="error-message">{error || "Car not found"}</div>;

  return (
    <div className="car-details">
      <button onClick={() => navigate("/cars")} className="back-btn">
        Back to Cars
      </button>
      <div className="details-container">
        <div className="car-image">
          <div className="placeholder-image">{car.name}</div>
        </div>
        <div className="car-info">
          <h1>{car.name}</h1>
          <div className="car-specs">
            <p>
              <strong>Brand:</strong> {car.brand}
            </p>
            <p>
              <strong>Model:</strong> {car.model}
            </p>
            <p>
              <strong>Year:</strong> {car.year}
            </p>
            <p>
              <strong>Fuel Type:</strong> {car.fuelType}
            </p>
            <p>
              <strong>Transmission:</strong> {car.transmission}
            </p>
            <p>
              <strong>Seats:</strong> {car.seats}
            </p>
            <p>
              <strong>Price per Day:</strong> ₹{car.pricePerDay}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span className={car.available ? "available" : "unavailable"}>
                {car.available ? "Available" : "Not Available"}
              </span>
            </p>
          </div>
          <button
            onClick={handleBooking}
            disabled={!car.available}
            className="book-btn"
          >
            {car.available ? "Book Now" : "Not Available"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;