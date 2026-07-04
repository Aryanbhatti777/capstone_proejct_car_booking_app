import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getUserBookings, updateBookingStatus } from "../services/bookingService";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";
import "../assets/styles/myBookings.css";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user || !user.id) {
        setError("Please login to view bookings");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await getUserBookings(user.id);
        setBookings(response.data.bookings || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        await updateBookingStatus(bookingId, "cancelled");
        setBookings((prev) =>
          prev.map((b) =>
            b._id === bookingId ? { ...b, status: "cancelled" } : b
          )
        );
        alert("Booking cancelled successfully");
      } catch (err) {
        alert(err.response?.data?.message || "Failed to cancel booking");
      }
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="my-bookings-page">
      <h1>My Bookings</h1>
      {error && <div className="error-message">{error}</div>}
      {bookings.length === 0 ? (
        <div className="no-bookings">
          <p>No bookings found</p>
          <button onClick={() => navigate("/cars")} className="shop-btn">
            Browse Cars
          </button>
        </div>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking) => (
            <div key={booking._id} className="booking-card">
              <div className="booking-info">
                <h3>{booking.car?.name || "Car"}</h3>
                <p>
                  <strong>Brand:</strong> {booking.car?.brand}
                </p>
                <p>
                  <strong>Model:</strong> {booking.car?.model}
                </p>
                <p>
                  <strong>Pickup Date:</strong>{" "}
                  {new Date(booking.pickupDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Return Date:</strong>{" "}
                  {new Date(booking.returnDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Total Price:</strong> ₹{booking.totalPrice}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`status-${booking.status}`}>
                    {booking.status.charAt(0).toUpperCase() +
                      booking.status.slice(1)}
                  </span>
                </p>
              </div>
              {booking.status === "booked" && (
                <button
                  onClick={() => handleCancelBooking(booking._id)}
                  className="cancel-btn"
                >
                  Cancel Booking
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;