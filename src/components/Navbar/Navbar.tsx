import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";

const Navbar = () => {
  const [currentRole, setCurrentRole] = useState<any>("");
  const { user, logout } = useContext<any>(AuthContext);
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
        {currentRole === "ROLE_ADMIN" && (
          <Link
            to="/newdoctor"
            className="text-decoration-none text-white mx-2"
          >
            New Doctor
          </Link>
        )}
        {currentRole === "ROLE_PATIENT" && (
          <Link
            to="/newappointment"
            className="text-decoration-none text-white mx-2"
          >
            New Appointment
          </Link>
        )}
        {currentRole === "ROLE_ADMIN" && (
          <span className="text-white">Hi, Admin</span>
        )}
        {currentRole !== "ROLE_ADMIN" && (
          <span className="text-white">Hi, {user?.firstName}</span>
        )}
        <button className="bg-white text-black p-2 btn mx-4" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
