import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { addAppointment, getAllDoctors } from "../../services/service";
import { getCurrentTime } from "../../services/util.service";

const AddAppointment = () => {
  const initialAppointment = {
    doctorId: "",
    patientId: "75265e11-337a-4054-a1d1-7b416d5ddec6",
    appointmentTime: "",
    status: "PENDING",
    notes: "",
    doctorComments: "",
  };
  const [appointment, setAppointment] = useState(initialAppointment);
  const [doctors, setDoctors] = useState([]);
  const [currentTime, setCurrentTime] = useState("2024-12-27T01:19");

  useEffect(() => {
    setCurrentTime(getCurrentTime());
    getAllDoctors().then((res) => {
      const aps = res?.data?.data === undefined ? [] : res?.data?.data;
      setDoctors(aps);
      if (aps?.length > 0) initialAppointment.doctorId = aps[0].id;
      setAppointment(initialAppointment);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const appointmentTemp = appointment;
    appointmentTemp.patientId = "75265e11-337a-4054-a1d1-7b416d5ddec6";
    addAppointment(appointmentTemp)
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            title: "Success",
            text: "Appointment added",
            icon: "info",
          });
        }
        handleReset();
      })
      .catch((e) => {
        Swal.fire({
          title: "Failed",
          text: "Error encountered",
          icon: "error",
        });
      });
  };

  const handleReset = () => {
    setAppointment(initialAppointment);
  };

  const handleChange = (event) => {
    const { id, value, type, checked } = event.target;
    setAppointment((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value, // Update only the changed field
    }));
  };
  return (
    <div className="content-wrapper row m-0 justify-content-center align-items-content">
      <div className="col-4 my-5">
        <h2>Add appointment</h2>
        <form onSubmit={handleSubmit} onReset={handleReset}>
          <div className="my-4">
            <label htmlFor="doctorId" className="form-label">
              Doctor
            </label>
            <select
              required
              className="form-select"
              onChange={handleChange}
              id="doctorId"
            >
              {doctors.map(
                (doctor) =>
                  doctor.status.toLowerCase() === "available" && (
                    <option value={doctor.id}>
                      {doctor.firstName.trim() + " " + doctor.lastName.trim()}
                    </option>
                  )
              )}
            </select>
          </div>
          <div className="my-4">
            <label htmlFor="appointmentTime" className="form-label">
              Appointment Time
            </label>
            <input
              required
              value={appointment.appointmentTime}
              onChange={handleChange}
              type="datetime-local"
              className="form-control"
              id="appointmentTime"
              min={currentTime}
            />
          </div>
          <div className="my-4">
            <label htmlFor="notes" className="form-label">
              Notes
            </label>
            <input
              required
              value={appointment.notes}
              onChange={handleChange}
              type="text"
              className="form-control"
              id="notes"
            />
          </div>
          <div className="my-4 d-flex">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
            <button className="btn btn-danger mx-2" type="reset">
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAppointment;
