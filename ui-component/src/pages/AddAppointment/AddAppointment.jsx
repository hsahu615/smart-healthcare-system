import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { addAppointment, getAllDoctors } from "../../services/service";
import { getCurrentTime } from "../../services/util.service";
import { AuthContext } from "../../auth/AuthContext";
import { spinnerContext } from "../../components/Spinner/spinnerContext";

const AddAppointment = () => {
  const { setShowSpinner } = useContext(spinnerContext);
  const [doctors, setDoctors] = useState([]);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const { user } = useContext(AuthContext);
  const initialAppointment = {
    doctorId: "",
    patientId: user?.id,
    appointmentTime: "",
    status: "PENDING",
    notes: "",
    doctorComments: "",
  };
  const [appointment, setAppointment] = useState(initialAppointment);

  useEffect(() => {
    setCurrentTime(getCurrentTime());
    setShowSpinner(true);
    getAllDoctors()
      .then((res) => {
        setShowSpinner(false);
        const aps = res?.data?.data === undefined ? [] : res?.data?.data;
        setDoctors(aps.filter((doctor) => doctor.status === "AVAILABLE"));
        if (aps?.length > 0) initialAppointment.doctorId = aps[0].id;
        setAppointment(initialAppointment);
      })
      .catch((e) => {
        setShowSpinner(false);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (doctors.length === 0) {
      Swal.fire({
        title: "Sorry, No Doctors available",
        timer: 2000,
        icon: "info",
      });
      return;
    }
    const appointmentTemp = appointment;
    appointmentTemp.patientId = user?.id;
    setShowSpinner(true);
    addAppointment(appointmentTemp)
      .then((res) => {
        setShowSpinner(false);
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
        setShowSpinner(false);
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
              disabled={doctors.length === 0}
            >
              {doctors.length > 0 &&
                doctors.map(
                  (doctor) =>
                    doctor.status.toLowerCase() === "available" && (
                      <option value={doctor.id}>
                        {doctor.firstName.trim() + " " + doctor.lastName.trim()}
                      </option>
                    )
                )}

              {doctors.length === 0 && (
                <option unselectable="on">Sorry, No Doctors available</option>
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
