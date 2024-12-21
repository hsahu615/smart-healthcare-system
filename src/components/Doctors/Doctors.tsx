import React, { useEffect } from "react";
import "./Doctors.css";

const Doctors = ({ doctors }) => {
  return (
    <div>
      {doctors.map((doctor) => (
        <p>{JSON.stringify(doctor)}</p>
      ))}
    </div>
  );
};

export default Doctors;
