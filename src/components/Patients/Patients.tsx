import React, { useEffect, useState } from "react";
import "./Patients.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { deletePatientById, getAllPatients } from "../../services/service";

const Patients = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    getAllPatients().then((data: any) => {
      setPatients(data.data);
    });
  }, []);

  return (
    <div>
      {patients.map((patient: any) => (
        <div
          className="card my-2 w-100"
          style={{
            border: "2px solid green",
          }}
        >
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <div>
                <h5 className="card-title">
                  <FontAwesomeIcon icon={faUser} className="mx-1" />
                  {patient.firstName.trim() + " " + patient.lastName.trim()}
                </h5>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="card-text m-0">
                    Email: {patient.email} <br />
                    Phone: {patient.phone} <br />
                    Age: {patient.age}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Patients;
