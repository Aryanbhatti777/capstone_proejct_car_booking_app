import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import stripePromise from "./config/stripe";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes";
import "./App.css";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Elements stripe={stripePromise}>
          <div className="app-container">
            <Navbar />
            <main className="main-content">
              <AppRoutes />
            </main>
            <Footer />
          </div>
        </Elements>
      </AuthProvider>
    </Router>
  );
};

export default App;