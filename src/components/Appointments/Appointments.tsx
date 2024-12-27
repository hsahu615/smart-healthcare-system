import React, { useEffect, useState } from "react";
import "./Appointments.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faClock,
  faPencil,
  faUser,
  faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";
import {
  getAllAppointments,
  getAllAppointmentsByDoctor,
  getAllAppointmentsByPatient,
} from "../../services/service";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctor, setDoctor] = useState<any>({});
  const [updatedAppointment, setUpdatedAppointment] = useState<any>({
    appointmentTime: "",
    status: "pending",
    patientComments: "",
    doctorComments: "",
    patient: {
      firstName: "",
      lastName: "",
      age: 0,
    },
  });
  const [showModal, setShowModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [currentRole, setCurrentRole] = useState<any>("");

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setCurrentRole(role);
    if (role === "patient")
      getAllAppointmentsByPatient("676b0ab13d57d7157b1d33fc").then(
        (data: any) => {
          setAppointments(data.data);
        }
      );
    else if (role === "doctor")
      getAllAppointmentsByDoctor("676b0bcb0d0755655988cb42").then(
        (data: any) => {
          setAppointments(data.data);
        }
      );
    else
      getAllAppointments().then((data: any) => {
        setAppointments(data.data);
      });
  }, []);

  const handleShow = (doctor: any) => {
    setDoctor(doctor);
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  const updateModalShow = (appointment: any) => {
    setUpdatedAppointment(appointment);
    setUpdateModal(true);
  };
  const updateClose = () => setUpdateModal(false);

  const formatDate = (date) => {
    const dat = new Date(date);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(dat);
  };

  return (
    <div>
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
                  <FontAwesomeIcon icon={faUser} className="mx-1" />
                  {appointment.patient.firstName.trim() +
                    " " +
                    appointment.patient.lastName.trim()}
                </h5>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="card-text m-0">
                    <FontAwesomeIcon icon={faCalendar} className="mx-1" />{" "}
                    {formatDate(appointment.appointmentTime.split("T")[0])}{" "}
                    <br />
                    <FontAwesomeIcon icon={faClock} className="mx-1" />{" "}
                    {appointment.appointmentTime
                      .split("T")[1]
                      .split(":")
                      .slice(0, 2)
                      .join(":")}
                  </p>
                </div>
              </div>
              <div className="d-flex flex-column justify-content-between align-items-center">
                {showModal && (
                  <div
                    className="modal show d-block"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                  >
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">Doctor</h5>
                          <button
                            type="button"
                            className="btn-close"
                            onClick={handleClose}
                          ></button>
                        </div>
                        <div className="modal-body">
                          <div className="my-2">
                            <h4>
                              {doctor.firstName.trim() +
                                " " +
                                doctor.lastName.trim()}
                            </h4>
                            <em>{doctor.specialty}</em>
                          </div>
                          <p className="my-1">Email: {doctor.email}</p>
                          <p className="my-1">Phone: {doctor.phone}</p>
                          <p className="my-1">
                            Status:{" "}
                            {doctor.status[0].toUpperCase() +
                              doctor.status.substring(1)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {updateModal && (
                  <div
                    className="modal show d-block"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                  >
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">Appointment</h5>
                          <button
                            type="button"
                            className="btn-close"
                            onClick={updateClose}
                          ></button>
                        </div>
                        <div className="modal-body">
                          <form>
                            <div className="my-4">
                              <label
                                htmlFor="appointmentTime"
                                className="form-label"
                              >
                                Patient Name:
                              </label>
                              <input
                                required
                                value={
                                  appointment.patient.firstName +
                                  " " +
                                  appointment.patient.lastName
                                }
                                type="text"
                                className="form-control"
                                id="appointmentTime"
                                disabled
                              />
                            </div>
                            <div className="my-4">
                              <label
                                htmlFor="appointmentTime"
                                className="form-label"
                              >
                                Appointment Time
                              </label>
                              <input
                                required
                                value={appointment.appointmentTime}
                                type="datetime-local"
                                className="form-control"
                                id="appointmentTime"
                                disabled
                              />
                            </div>
                            <div className="my-4">
                              <label
                                htmlFor="appointmentTime"
                                className="form-label"
                              >
                                Doctor Comments:
                              </label>
                              <input
                                required
                                value={appointment.doctorComments}
                                type="text"
                                className="form-control"
                                id="appointmentTime"
                              />
                            </div>
                            <div className="my-4">
                              <label
                                htmlFor="appointmentTime"
                                className="form-label"
                              >
                                Status:
                              </label>
                              <input
                                required
                                value={appointment.doctorComments}
                                type="text"
                                className="form-control"
                                id="appointmentTime"
                              />
                            </div>
                            <div className="my-4 d-flex">
                              <button className="btn btn-success" type="submit">
                                Update
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentRole !== "doctor" && (
                  <button className="bg-transparent border-0 p-1">
                    <FontAwesomeIcon
                      icon={faUserDoctor}
                      className="mx-1"
                      onClick={() => handleShow(appointment.doctor)}
                    />
                  </button>
                )}
                {currentRole === "doctor" &&
                  appointment.status !== "pending" && (
                    <button className="bg-transparent border-0 p-1">
                      <FontAwesomeIcon
                        icon={faPencil}
                        className="mx-1"
                        onClick={() => updateModalShow(appointment)}
                      />
                    </button>
                  )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Appointments;
