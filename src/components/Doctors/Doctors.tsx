import React, { useEffect } from "react";
import "./Doctors.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

// "id": "6744ba790d02e059160298fe",
// "firstName": "Anish",
// "lastName": "Bakshi",
// "email": "bakshi@gmail.com",
// "phone": "0123456789",
// "specialty": "Ortho",
// "yearsOfExperience": 15,
// "isAvailable": true

const Doctors = ({ doctors }) => {
  return (
    <div>
      {doctors.map((doctor) => (
        <div
          className="card my-2 w-100"
          style={{
            border: doctor.isAvailable ? "2px solid green" : "2px solid red",
          }}
        >
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <div>
                <h5 className="card-title">
                  {doctor.firstName.trim() + " " + doctor.lastName.trim()}
                </h5>

                {doctor.specialty ? (
                  <h6 className="card-subtitle mb-2 text-muted">
                    {doctor.specialty.trim()}
                  </h6>
                ) : (
                  ""
                )}
                <div className="d-flex justify-content-between align-items-center">
                  <p className="card-text m-0">
                    Email: {doctor.email} <br />
                    Phone: {doctor.phone}
                  </p>
                </div>
              </div>
              <div className="d-flex flex-column align-items-center justify-content-between">
                <span className="yoe-wrapper">{doctor.yearsOfExperience}</span>
                <button className="bg-transparent border-0">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Doctors;
