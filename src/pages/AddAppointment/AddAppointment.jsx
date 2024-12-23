import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { addAppointment, getAllDoctors } from "../../services/service";

const AddAppointment = () => {
  const initialAppointment = {
    patientName: "",
    doctorId: "",
    appointmentTime: "",
    status: "Scheduled",
  };
  const [appointment, setAppointment] = useState(initialAppointment);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    getAllDoctors().then((data) => {
      setDoctors(data.data);
      initialAppointment.doctorId = data.data[0].id;
      setAppointment(initialAppointment);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    addAppointment(appointment)
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
            <label htmlFor="patientName" className="form-label">
              Patient Name
            </label>
            <input
              required
              value={appointment.patientName}
              onChange={handleChange}
              type="text"
              className="form-control"
              id="patientName"
            />
          </div>
          <div className="my-4">
            <select
              required
              className="form-select"
              onChange={handleChange}
              id="doctorId"
            >
              {doctors.map((doctor) => (
                <option value={doctor.id}>
                  {doctor.firstName.trim() + " " + doctor.lastName.trim()}
                </option>
              ))}
            </select>
          </div>
          <div className="my-4">
            <label htmlFor="lastName" className="form-label">
              Appointment Time
            </label>
            <input
              required
              value={appointment.appointmentTime}
              onChange={handleChange}
              type="datetime-local"
              className="form-control"
              id="appointmentTime"
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
