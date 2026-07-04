import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCarById } from "../services/carService";
import { createBooking } from "../services/bookingService";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";
import "../assets/styles/booking.css";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    pickupDate: "",
    returnDate: "",
  });
  const [totalPrice, setTotalPrice] = useState(0);

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

  useEffect(() => {
    if (formData.pickupDate && formData.returnDate && car) {
      const pickup = new Date(formData.pickupDate);
      const returnDate = new Date(formData.returnDate);
      const timeDiff = returnDate.getTime() - pickup.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

      if (daysDiff > 0) {
        setTotalPrice(daysDiff * car.pricePerDay);
      } else {
        setTotalPrice(0);
      }
    }
  }, [formData.pickupDate, formData.returnDate, car]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    if (!user) {
      setError("Please login to book a car");
      setSubmitting(false);
      return;
    }

    try {
      const bookingData = {
        user: user.id,
        pickupDate: formData.pickupDate,
        returnDate: formData.returnDate,
        totalPrice: totalPrice,
      };

      const response = await createBooking(id, bookingData);
      if (response.status === 201) {
        const bookingId = response.data.booking._id;
        const numberOfDays = Math.ceil(
          (new Date(formData.returnDate).getTime() -
            new Date(formData.pickupDate).getTime()) /
            (1000 * 60 * 60 * 24)
        );

        // Navigate to payment page with booking details
        navigate(`/payment/${id}`, {
          state: {
            bookingId,
            totalPrice,
            bookingData: {
              carName: car.name,
              pickupDate: formData.pickupDate,
              returnDate: formData.returnDate,
              numberOfDays,
            },
          },
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;

  if (!car) return <div className="error-message">{error || "Car not found"}</div>;

  return (
    <div className="booking-page">
      <button onClick={() => navigate(`/car/${id}`)} className="back-btn">
        Back to Car Details
      </button>
      <div className="booking-container">
        <h1>Book {car.name}</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="booking-form">
          <div className="car-summary">
            <p>
              <strong>Price per day:</strong> ₹{car.pricePerDay}
            </p>
          </div>
          <div className="form-group">
            <label htmlFor="pickupDate">Pickup Date</label>
            <input
              type="date"
              id="pickupDate"
              name="pickupDate"
              value={formData.pickupDate}
              onChange={handleChange}
              required
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="returnDate">Return Date</label>
            <input
              type="date"
              id="returnDate"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleChange}
              required
              min={
                formData.pickupDate || new Date().toISOString().split("T")[0]
              }
            />
          </div>
          {totalPrice > 0 && (
            <div className="price-summary">
              <h3>Booking Summary</h3>
              <p>
                <strong>Price per day:</strong> ₹{car.pricePerDay}
              </p>
              <p>
                <strong>Number of days:</strong>{" "}
                {Math.ceil(
                  (new Date(formData.returnDate).getTime() -
                    new Date(formData.pickupDate).getTime()) /
                    (1000 * 60 * 60 * 24)
                )}
              </p>
              <p className="total">
                <strong>Total Price:</strong> ₹{totalPrice}
              </p>
            </div>
          )}
          <button
            type="submit"
            disabled={submitting || !formData.pickupDate || !formData.returnDate}
            className="submit-btn"
          >
            {submitting ? "Processing..." : "Proceed to Payment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;