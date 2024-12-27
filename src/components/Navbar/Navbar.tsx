import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [currentRole, setCurrentRole] = useState<any>("");
  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    setCurrentRole(userRole);
  }, []);
  return (
    <div className="navbar-wrapper d-flex justify-content-between align-items-center bg-dark px-3">
      <div>
        <h3 className="text-white">Smart Healthcare System</h3>
      </div>
      <div>
        <Link to="/" className="text-decoration-none text-white mx-2">
          Home
        </Link>
        {currentRole === "admin" && (
          <Link
            to="/newdoctor"
            className="text-decoration-none text-white mx-2"
          >
            New Doctor
          </Link>
        )}
        {currentRole === "patient" && (
          <Link
            to="/newappointment"
            className="text-decoration-none text-white mx-2"
          >
            New Appointment
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
