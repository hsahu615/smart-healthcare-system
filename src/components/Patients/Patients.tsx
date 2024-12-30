import React, { useContext, useEffect, useState } from "react";
import "./Patients.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faClock,
  faList,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import {
  getAllAppointmentsByPatient,
  getAllPatients,
} from "../../services/service";
import { spinnerContext } from "../Spinner/spinnerContext";
import { formatDate, isPast } from "../../services/util.service";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const { setShowSpinner } = useContext(spinnerContext);

  useEffect(() => {
    setShowSpinner(true);
    getAllPatients()
      .then((res: any) => {
        setShowSpinner(false);
        const aps = res?.data?.data === undefined ? [] : res?.data?.data;
        setPatients(aps);
      })
      .catch((err) => {
        setShowSpinner(false);
        console.log(err);
      });
  }, []);

  const handleShow = (patientId) => {
    setShowSpinner(true);
    getAllAppointmentsByPatient(patientId)
      .then((res: any) => {
        setShowSpinner(false);
        const aps = res?.data?.data === undefined ? [] : res?.data?.data;
        setAppointments(aps);
      })
      .catch((err) => {
        setShowSpinner(false);
        console.log(err);
      });
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

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
              <div className="d-flex flex-column align-items-center justify-content-between">
                <button
                  className="bg-transparent border-0"
                  onClick={() => handleShow(patient.id)}
                >
                  <FontAwesomeIcon icon={faList} />
                </button>
              </div>
            </div>
          </div>
          {showModal && (
            <div
              className="modal show d-block"
              style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Appointment</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={handleClose}
                    ></button>
                  </div>
                  <div className="modal-body">
                    {appointments.map((appointment: any) => (
                      <div
                        className="card my-2 w-100"
                        style={{
                          border: isPast(appointment.appointmentTime)
                            ? "2px solid blue"
                            : appointment.status.toLowerCase() === "pending"
                            ? "2px solid yellow"
                            : appointment.status.toLowerCase() === "confirmed"
                            ? "2px solid green"
                            : "2px solid red",
                        }}
                      >
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <div>
                              <h5 className="card-title">
                                <FontAwesomeIcon
                                  icon={faUser}
                                  className="mx-1"
                                />
                                {appointment.patient.firstName.trim() +
                                  " " +
                                  appointment.patient.lastName.trim()}
                              </h5>
                              <div className="d-flex justify-content-between align-items-center">
                                <p className="card-text m-0">
                                  <FontAwesomeIcon
                                    icon={faCalendar}
                                    className="mx-1"
                                  />{" "}
                                  {formatDate(
                                    appointment.appointmentTime.split("T")[0]
                                  )}{" "}
                                  <br />
                                  <FontAwesomeIcon
                                    icon={faClock}
                                    className="mx-1"
                                  />{" "}
                                  {appointment.appointmentTime
                                    .split("T")[1]
                                    .split(":")
                                    .slice(0, 2)
                                    .join(":")}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Patients;
