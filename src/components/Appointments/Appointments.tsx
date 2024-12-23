import React, { useEffect, useState } from "react";
import "./Appointments.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faClock,
  faHospital,
  faTrash,
  faUser,
  faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import {
  deleteAppointmentById,
  getAllAppointments,
  getDoctorById,
} from "../../services/service";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctor, setDoctor] = useState<any>({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getAllAppointments().then((data: any) => {
      setAppointments(data.data);
    });
  }, []);

  const handleShow = (doctorId) => {
    getDoctorById(doctorId).then((res: any) => {
      if (res.status === 200) {
        setDoctor(res.data);
        setShowModal(true);
      }
    });
  };
  const handleClose = () => setShowModal(false);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Confirm",
      text: "Do you want to delete",
      icon: "question",
      confirmButtonText: "Go Ahead",
      showCancelButton: true,
    }).then((value) => {
      if (value.isConfirmed) {
        deleteAppointmentById(id).then((res: any) => {
          if (res.status === 200)
            getAllAppointments().then((data) => setAppointments(data.data));
        });
      }
    });
  };

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
              appointment.status === "Scheduled"
                ? "2px solid green"
                : "2px solid red",
          }}
        >
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <div>
                <h5 className="card-title">
                  <FontAwesomeIcon icon={faUser} className="mx-1" />
                  {appointment.patientName.trim()}
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
                            Available: {doctor.isAvailable ? "Yes" : "No"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <button className="bg-transparent border-0 p-1">
                  <FontAwesomeIcon
                    icon={faUserDoctor}
                    className="mx-1"
                    onClick={() => handleShow(appointment.doctorId)}
                  />
                </button>
                <button
                  className="bg-transparent border-0"
                  onClick={() => handleDelete(appointment.id)}
                >
                  <FontAwesomeIcon icon={faTrash} className="mx-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Appointments;
