import React, { useState } from "react";
import "./AddDoctor.css";
import axios from "axios";
import Swal from "sweetalert2";
import { addDoctor } from "../../services/service";

const AddDoctor = () => {
  const initialDoctor = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialty: "",
    yearsOfExperience: 0,
  };
  const [doctor, setDoctor] = useState(initialDoctor);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(doctor);
    addDoctor(doctor)
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            title: "Success",
            text: "Doctor added",
            icon: "info",
          });
        }
        handleReset();
      })
      .catch(() => {
        Swal.fire({
          title: "Failed",
          text: "Error encountered",
          icon: "error",
        });
      });
  };

  const handleReset = () => {
    setDoctor(initialDoctor);
  };

  const handleChange = (event) => {
    const { id, value, type, checked } = event.target;
    setDoctor((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value, // Update only the changed field
    }));
  };
  return (
    <div className="content-wrapper row m-0 justify-content-center align-items-content">
      <div className="col-4 my-5">
        <h2>Add Doctor</h2>
        <form onSubmit={handleSubmit} onReset={handleReset}>
          <div className="my-4">
            <label for="firstName" className="form-label">
              First Name
            </label>
            <input
              required
              value={doctor.firstName}
              onChange={handleChange}
              type="text"
              className="form-control"
              id="firstName"
            />
          </div>
          <div className="my-4">
            <label for="lastName" className="form-label">
              Last Name
            </label>
            <input
              required
              value={doctor.lastName}
              onChange={handleChange}
              type="text"
              className="form-control"
              id="lastName"
            />
          </div>
          <div className="my-4">
            <label for="email" className="form-label">
              Email
            </label>
            <input
              required
              value={doctor.email}
              onChange={handleChange}
              type="email"
              className="form-control"
              id="email"
            />
          </div>
          <div className="my-4">
            <label for="phone" className="form-label">
              Phone
            </label>
            <input
              required
              value={doctor.phone}
              onChange={handleChange}
              type="text"
              className="form-control"
              id="phone"
            />
          </div>
          <div className="my-4">
            <label for="speciality" className="form-label">
              Speciality
            </label>
            <input
              required
              value={doctor.specialty}
              onChange={handleChange}
              type="text"
              className="form-control"
              id="specialty"
            />
          </div>
          <div className="my-4">
            <label for="yearsOfExperience" className="form-label">
              Years of Experience
            </label>
            <input
              required
              value={doctor.yearsOfExperience}
              onChange={handleChange}
              type="number"
              className="form-control"
              min={0}
              id="yearsOfExperience"
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

export default AddDoctor;
