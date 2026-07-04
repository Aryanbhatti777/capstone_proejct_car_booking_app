import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getCars, addCar, updateCar, deleteCar } from "../services/carService";
import { getBookings, updateBookingStatus } from "../services/bookingService";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";
import "../assets/styles/admin.css";


const Admin = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("cars");
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddCar, setShowAddCar] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingCarId, setEditingCarId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    model: "",
    year: "",
    pricePerDay: "",
    fuelType: "Petrol",
    transmission: "Automatic",
    seats: "",
    available: true,
  });

  useEffect(() => {
    if (user?.role !== "admin") {
      navigate("/");
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const [carsResponse, bookingsResponse] = await Promise.all([
          getCars(),
          getBookings(),
        ]);
        setCars(carsResponse.data.cars || []);
        setBookings(bookingsResponse.data.bookings || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddCar = async (e) => {
    e.preventDefault();
    try {
      const response = await addCar({
        ...formData,
        year: parseInt(formData.year),
        pricePerDay: parseFloat(formData.pricePerDay),
        seats: parseInt(formData.seats),
      });
      if (response.status === 201) {
        alert("Car added successfully");
        setFormData({
          name: "",
          brand: "",
          model: "",
          year: "",
          pricePerDay: "",
          fuelType: "Petrol",
          transmission: "Automatic",
          seats: "",
          available: true,
        });
        setShowAddCar(false);
        const carsResponse = await getCars();
        setCars(carsResponse.data.cars || []);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add car");
    }
  };

  const handleStartEdit = (car) => {
    setEditingCarId(car._id);
    setFormData({
      name: car.name,
      brand: car.brand,
      model: car.model,
      year: car.year,
      pricePerDay: car.pricePerDay,
      fuelType: car.fuelType,
      transmission: car.transmission,
      seats: car.seats,
      available: car.available,
    });
    setShowEditForm(true);
  };

  const handleEditCar = async (e) => {
    e.preventDefault();
    try {
      const response = await updateCar(editingCarId, {
        ...formData,
        year: parseInt(formData.year),
        pricePerDay: parseFloat(formData.pricePerDay),
        seats: parseInt(formData.seats),
      });
      if (response.status === 200 || response.status === 201) {
        alert("Car updated successfully");
        setFormData({
          name: "",
          brand: "",
          model: "",
          year: "",
          pricePerDay: "",
          fuelType: "Petrol",
          transmission: "Automatic",
          seats: "",
          available: true,
        });
        setShowEditForm(false);
        setEditingCarId(null);
        const carsResponse = await getCars();
        setCars(carsResponse.data.cars || []);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update car");
    }
  };

  const handleDeleteCar = async (carId) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        await deleteCar(carId);
        alert("Car deleted successfully");
        setCars(cars.filter((c) => c._id !== carId));
      } catch (err) {
        alert(err.response?.data?.message || "Failed to delete car");
      }
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      {error && <div className="error-message">{error}</div>}

      <div className="admin-tabs">
        <button
          onClick={() => setActiveTab("cars")}
          className={activeTab === "cars" ? "active" : ""}
        >
          Manage Cars
        </button>
        <button
          onClick={() => setActiveTab("bookings")}
          className={activeTab === "bookings" ? "active" : ""}
        >
          View Bookings
        </button>
      </div>

      {activeTab === "cars" && (
        <div className="cars-section">
          <button
            onClick={() => {
              setShowAddCar(!showAddCar);
              setShowEditForm(false);
              setEditingCarId(null);
              setFormData({
                name: "",
                brand: "",
                model: "",
                year: "",
                pricePerDay: "",
                fuelType: "Petrol",
                transmission: "Automatic",
                seats: "",
                available: true,
              });
            }}
            className="add-car-btn"
          >
            {showAddCar ? "Cancel" : "Add New Car"}
          </button>

          {showAddCar && (
            <form onSubmit={handleAddCar} className="add-car-form">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Model</label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Year</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Price per Day</label>
                <input
                  type="number"
                  name="pricePerDay"
                  value={formData.pricePerDay}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Fuel Type</label>
                <select
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleChange}
                >
                  <option>Petrol</option>
                  <option>Diesel</option>
                  <option>Electric</option>
                  <option>Hybrid</option>
                </select>
              </div>
              <div className="form-group">
                <label>Transmission</label>
                <select
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleChange}
                >
                  <option>Manual</option>
                  <option>Automatic</option>
                </select>
              </div>
              <div className="form-group">
                <label>Seats</label>
                <input
                  type="number"
                  name="seats"
                  value={formData.seats}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    name="available"
                    checked={formData.available}
                    onChange={handleChange}
                  />
                  Available
                </label>
              </div>
              <button type="submit" className="submit-btn">
                Add Car
              </button>
            </form>
          )}

          {showEditForm && (
            <form onSubmit={handleEditCar} className="add-car-form edit-car-form">
              <h3>Edit Car</h3>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Model</label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Year</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Price per Day</label>
                <input
                  type="number"
                  name="pricePerDay"
                  value={formData.pricePerDay}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Fuel Type</label>
                <select
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleChange}
                >
                  <option>Petrol</option>
                  <option>Diesel</option>
                  <option>Electric</option>
                  <option>Hybrid</option>
                </select>
              </div>
              <div className="form-group">
                <label>Transmission</label>
                <select
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleChange}
                >
                  <option>Manual</option>
                  <option>Automatic</option>
                </select>
              </div>
              <div className="form-group">
                <label>Seats</label>
                <input
                  type="number"
                  name="seats"
                  value={formData.seats}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    name="available"
                    checked={formData.available}
                    onChange={handleChange}
                  />
                  Available
                </label>
              </div>
              <div className="form-buttons">
                <button type="submit" className="submit-btn">
                  Update Car
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEditForm(false);
                    setEditingCarId(null);
                    setFormData({
                      name: "",
                      brand: "",
                      model: "",
                      year: "",
                      pricePerDay: "",
                      fuelType: "Petrol",
                      transmission: "Automatic",
                      seats: "",
                      available: true,
                    });
                  }}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="cars-list">
            {cars.map((car) => (
              <div key={car._id} className="car-item">
                <div className="car-details">
                  <h3>{car.name}</h3>
                  <p>{car.brand} {car.model} ({car.year})</p>
                  <p>₹{car.pricePerDay}/day - {car.seats} seats</p>
                  <p>{car.fuelType} - {car.transmission}</p>
                  <p>Status: {car.available ? "Available" : "Not Available"}</p>
                </div>
                <div className="car-actions">
                  <button
                    onClick={() => handleStartEdit(car)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCar(car._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "bookings" && (
        <div className="bookings-section">
          <div className="bookings-list">
            {bookings.map((booking) => (
              <div key={booking._id} className="booking-item">
                <div className="booking-details">
                  <h3>{booking.car?.name}</h3>
                  <p>
                    <strong>User:</strong> {booking.user?.name || "Unknown"}
                  </p>
                  <p>
                    <strong>Email:</strong> {booking.user?.email || "N/A"}
                  </p>
                  <p>
                    <strong>Pickup:</strong>{" "}
                    {new Date(booking.pickupDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Return:</strong>{" "}
                    {new Date(booking.returnDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Total Price:</strong> ₹{booking.totalPrice}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span className={`status-${booking.status}`}>
                      {booking.status}
                    </span>
                  </p>
                </div>

                {booking.status === "booked" && (
                  <div className="booking-actions">
                    <button
                      className="complete-btn"
                      onClick={async () => {
                        try {
                          await updateBookingStatus(booking._id, "completed");
                          setBookings((prev) =>
                            prev.map((b) =>
                              b._id === booking._id
                                ? { ...b, status: "completed" }
                                : b
                            )
                          );
                          alert("Booking marked as completed");
                        } catch (err) {
                          alert(
                            err.response?.data?.message ||
                              "Failed to update booking status"
                          );
                        }
                      }}
                    >
                    Mark Completed
                    </button>


                    <button
                      className="cancel-btn"
                      onClick={async () => {
                        if (
                          !window.confirm(
                            "Are you sure you want to cancel this booking?"
                          )
                        )
                          return;

                        try {
                          await updateBookingStatus(booking._id, "cancelled");
                          setBookings((prev) =>
                            prev.map((b) =>
                              b._id === booking._id
                                ? { ...b, status: "cancelled" }
                                : b
                            )
                          );
                          alert("Booking cancelled");
                        } catch (err) {
                          alert(
                            err.response?.data?.message ||
                              "Failed to update booking status"
                          );
                        }
                      }}
                    >
                      Cancel Booking
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default Admin;