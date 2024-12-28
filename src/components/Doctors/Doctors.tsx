import React, { useEffect, useState } from "react";
import "./Doctors.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faClock,
  faList,
  faTrash,
  faUser,
  faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import {
  deleteDoctorById,
  getAllAppointmentsByDoctor,
  getAllDoctors,
} from "../../services/service";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getAllDoctors().then((res: any) => {
      const aps = res?.data?.data === undefined ? [] : res?.data?.data;
      setDoctors(aps);
    });
  }, []);

  const handleShow = (doctorId) => {
    getAllAppointmentsByDoctor(doctorId).then((res: any) => {
      const aps = res?.data?.data === undefined ? [] : res?.data?.data;
      setAppointments(aps);
    });
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  const formatDate = (date) => {
    const dat = new Date(date);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(dat);
  };

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
          getAllDoctors().then((res: any) => {
            const aps = res?.data?.data === undefined ? [] : res?.data?.data;
            setDoctors(aps);
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
            border:
              doctor.status.toLowerCase() == "available"
                ? "2px solid green"
                : doctor.status.toLowerCase() == "unavailable"
                ? "2px solid yellow"
                : "2px solid red",
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
                <button
                  className="bg-transparent border-0"
                  onClick={() => handleShow(doctor.id)}
                >
                  <FontAwesomeIcon icon={faList} />
                </button>
                {doctor.status !== "disabled" && (
                  <button
                    className="bg-transparent border-0"
                    onClick={() => handleDelete(doctor.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                )}
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
                          border:
                            appointment.status === "pending"
                              ? "2px solid yellow"
                              : appointment.status === "confirmed"
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

export default Doctors;
