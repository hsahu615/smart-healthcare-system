import React, { useEffect, useState } from "react";
import "./Doctors.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPerson,
  faPersonBooth,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";
import { deleteDoctorById, getAllDoctors } from "../../services/service";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    getAllDoctors().then((data: any) => {
      setDoctors(data.data);
    });
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Confirm",
      text: "Do you want to delete",
      icon: "question",
      confirmButtonText: "Go Ahead",
      showCancelButton: true,
    }).then((value) => {
      if (value.isConfirmed) {
        deleteDoctorById(id).then(() => {
          getAllDoctors().then((data: any) => {
            setDoctors(data.data);
          });
        });
      }
    });
  };

  return (
    <div>
      {doctors.map((doctor: any) => (
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
                  <FontAwesomeIcon icon={faUser} className="mx-1" />
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
                <button
                  className="bg-transparent border-0"
                  onClick={() => handleDelete(doctor.id)}
                >
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
