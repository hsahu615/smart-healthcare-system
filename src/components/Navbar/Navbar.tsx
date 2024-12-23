import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar-wrapper d-flex justify-content-between align-items-center bg-dark px-3">
      <div>
        <h3 className="text-white">Smart Healthcare System</h3>
      </div>
      <div>
        <Link to="/" className="text-decoration-none text-white mx-2">
          Home
        </Link>
        <Link to="/newdoctor" className="text-decoration-none text-white mx-2">
          New Doctor
        </Link>
        <Link
          to="/newappointment"
          className="text-decoration-none text-white mx-2"
        >
          New Appointment
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
