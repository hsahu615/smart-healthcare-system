import React, { useEffect, useState } from "react";
import "./Appointments.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faCancel,
  faCheck,
  faClock,
  faCross,
  faPencil,
  faStickyNote,
  faTrash,
  faUser,
  faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";
import {
  getAllAppointments,
  getAllAppointmentsByDoctor,
  getAllAppointmentsByPatient,
  updateAppointment,
} from "../../services/service";
import Swal from "sweetalert2";

const Appointments = () => {
  const [appointments, setAppointments] = useState<any>([]);
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
    fetchData();
  }, []);

  const fetchData = () => {
    const role = localStorage.getItem("userRole");
    setCurrentRole(role);
    if (role === "patient")
      getAllAppointmentsByPatient("75265e11-337a-4054-a1d1-7b416d5ddec6").then(
        (res: any) => {
          const aps = res?.data?.data === undefined ? [] : res?.data?.data;
          setAppointments(aps);
        }
      );
    else if (role === "doctor")
      getAllAppointmentsByDoctor("7f57e292-7eb1-4fdc-9c3c-359eb7fbcea3").then(
        (res: any) => {
          const aps = res?.data?.data === undefined ? [] : res?.data?.data;
          setAppointments(aps);
        }
      );
    else
      getAllAppointments().then((res: any) => {
        const aps = res?.data?.data === undefined ? [] : res?.data?.data;
        setAppointments(aps);
      });
  };

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

  const isPast = (time) => {
    const appointmentTime = new Date(time);
    const currentTime = new Date();
    return currentTime > appointmentTime;
  };

  const updateAppointmentStatus = (appointment, status) => {
    appointment.status = status;
    updateAppointment(appointment).then((res: any) => {
      if (res.status === 200) fetchData();
      else
        Swal.fire({
          title: "Error",
          text: "Failed to update",
          icon: "error",
        });
    });
  };

  const updateAfterCheckup = (appointment, e) => {
    e.preventDefault();
    appointment.doctorComments = e.target[3].value;
    updateAppointment(appointment).then((res: any) => {
      if (res.status === 200) {
        fetchData();
        updateClose();
      } else
        Swal.fire({
          title: "Error",
          text: "Failed to update",
          icon: "error",
        });
    });
  };

  const deleteAppointment = (appointment) => {
    appointment.status = "REJECTED";
    updateAppointment(appointment).then((res: any) => {
      if (res.status === 200) {
        fetchData();
      } else
        Swal.fire({
          title: "Error",
          text: "Failed to update",
          icon: "error",
        });
    });
  };

  return (
    <div>
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
                <p className="card-text m-0">
                  <span>
                    <FontAwesomeIcon icon={faStickyNote} className="mx-1" />
                  </span>
                  {appointment.notes.slice(0, 40)}
                </p>
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
                            {doctor.status.toLowerCase() === "available"
                              ? "Available"
                              : doctor.status.toLowerCase() === "not_available"
                              ? "Not Available"
                              : "Left the hospital"}
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
                          <form
                            onSubmit={(e) => updateAfterCheckup(appointment, e)}
                          >
                            <div className="my-4">
                              <label
                                htmlFor="patientName"
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
                                id="patientName"
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
                              <label htmlFor="notes" className="form-label">
                                Patient Comments:
                              </label>
                              <textarea
                                required
                                value={appointment.notes}
                                rows={3}
                                className="form-control"
                                id="notes"
                                disabled
                              />
                            </div>
                            <div className="my-4">
                              <label
                                htmlFor="doctorComments"
                                className="form-label"
                              >
                                Doctor Comments:
                              </label>
                              <input
                                required
                                name="doctorComments"
                                type="text"
                                className="form-control"
                                id="doctorComments"
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
                {/* Show Doctor button for non doctor roles to view doctor details */}
                {currentRole !== "doctor" && (
                  <button className="bg-transparent border-0 p-1">
                    <FontAwesomeIcon
                      icon={faUserDoctor}
                      className="mx-1"
                      onClick={() => handleShow(appointment.doctor)}
                    />
                  </button>
                )}
                {currentRole === "patient" &&
                  !isPast(appointment.appointmentTime) &&
                  appointment.status !== "REJECTED" && (
                    <button className="bg-transparent border-0 p-1">
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="mx-1"
                        onClick={() => deleteAppointment(appointment)}
                      />
                    </button>
                  )}
                {/* At the time of patient screening doctor leaves comments */}
                {currentRole === "doctor" &&
                  !isPast(appointment.appointmentTime) &&
                  appointment.status === "CONFIRMED" &&
                  appointment?.doctorComments?.length === 0 && (
                    <button className="bg-transparent border-0 p-1">
                      <FontAwesomeIcon
                        icon={faPencil}
                        className="mx-1"
                        onClick={() => updateModalShow(appointment)}
                      />
                    </button>
                  )}
                {/* Receiving new appointment (Confirm or reject) */}
                {currentRole === "doctor" &&
                  !isPast(appointment.appointmentTime) &&
                  appointment.status === "PENDING" && (
                    <div>
                      <button className="bg-transparent border-0 p-1">
                        <FontAwesomeIcon
                          icon={faCancel}
                          className="mx-1"
                          onClick={() =>
                            updateAppointmentStatus(appointment, "REJECTED")
                          }
                        />
                      </button>
                      <button className="bg-transparent border-0 p-1">
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="mx-1"
                          onClick={() =>
                            updateAppointmentStatus(appointment, "CONFIRMED")
                          }
                        />
                      </button>
                    </div>
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
