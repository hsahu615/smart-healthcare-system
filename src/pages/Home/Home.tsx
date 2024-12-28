import React, { useEffect, useState } from "react";
import "./Home.css";
import Appointments from "../../components/Appointments/Appointments";
import Doctors from "../../components/Doctors/Doctors";
import Patients from "../../components/Patients/Patients";
import { updateDoctor } from "../../services/service";
import Swal from "sweetalert2";

const Home = () => {
  const [currentSection, setCurrentSection] = useState("Appointments");
  const [currentRole, setCurrentRole] = useState<any>("");
  const [user, setUser] = useState<any>(null);
  const [doctorAvailability, setDoctorAvailability] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    const jsonUser = localStorage.getItem("user");
    const user: any = JSON.parse(jsonUser ? jsonUser : "{}");
    setCurrentRole(role);
    setUser(user);
    if (role === "doctor") setDoctorAvailability(user.status === "AVAILABLE");
  }, []);

  const handleSectionChange = (e) => {
    setCurrentSection(e.target.value);
  };

  const handleDoctorStatus = () => {
    const doctorPayload = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      speciality: user.speciality,
      yearsOfExperience: user.yearsOfExperience,
      status: doctorAvailability ? "NOT_AVAILABLE" : "AVAILABLE",
    };
    updateDoctor(doctorPayload, user.id).then((res: any) => {
      if (res.status === 200) {
        setDoctorAvailability(!doctorAvailability);
      } else {
        Swal.fire({
          title: "Error",
          text: "Not Updated!",
          icon: "error",
        });
      }
    });
  };

  return (
    <div className="content-wrapper d-flex m-0 align-items-center justify-content-center">
      <div className="w-50">
        <div className="d-flex m-0 align-items-center justify-content-between">
          <select
            className="form-select w-25"
            style={{ border: "2px solid skyblue" }}
            defaultValue={currentSection}
            onChange={handleSectionChange}
          >
            {currentRole === "admin" && (
              <option value="Doctors">Doctors</option>
            )}
            <option value="Appointments">Appointments</option>
            {currentRole === "admin" && (
              <option value="Patients">Patients</option>
            )}
          </select>
          {currentRole === "doctor" && (
            <div className="form-check d-inline">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="availableCheck"
                onChange={handleDoctorStatus}
                checked={doctorAvailability}
              />
              <label className="form-check-label" htmlFor="availableCheck">
                Available
              </label>
            </div>
          )}
        </div>
        {currentSection === "Doctors" ? (
          <Doctors />
        ) : currentSection === "Patients" ? (
          <Patients />
        ) : (
          <Appointments />
        )}
      </div>
    </div>
  );
};
export default Home;
