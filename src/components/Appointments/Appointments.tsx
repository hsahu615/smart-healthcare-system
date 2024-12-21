import React, { useEffect } from "react";
import "./Appointments.css";

const Appointments = ({ appointments }) => {
  return (
    <div>
      {appointments.map((appointment) => (
        <p>{JSON.stringify(appointment)}</p>
      ))}
    </div>
  );
};

export default Appointments;
