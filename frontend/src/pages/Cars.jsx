import React, { useState, useEffect } from "react";
import { getCars } from "../services/carService";
import CarCard from "../components/CarCard";
import Loader from "../components/Loader";
import "../assets/styles/cars.css";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const response = await getCars();
        setCars(response.data.cars || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch cars");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="cars-page">
      <h1>Available Cars</h1>
      {error && <div className="error-message">{error}</div>}
      <div className="cars-container">
        {cars.length > 0 ? (
          cars.map((car) => <CarCard key={car._id} car={car} />)
        ) : (
          <p>No cars available</p>
        )}
      </div>
    </div>
  );
};

export default Cars;