import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import Appointments from "../../components/Appointments/Appointments";
import Doctors from "../../components/Doctors/Doctors";
import Patients from "../../components/Patients/Patients";
import { updateDoctor } from "../../services/service";
import Swal from "sweetalert2";
import { AuthContext } from "../../auth/AuthContext";
import { spinnerContext } from "../../components/Spinner/spinnerContext";

const Home = () => {
  const [currentSection, setCurrentSection] = useState("Appointments");
  const [doctorAvailability, setDoctorAvailability] = useState(false);
  const { user, currentRole } = useContext<any>(AuthContext);
  const { setShowSpinner } = useContext(spinnerContext);

  useEffect(() => {
    if (currentRole === "ROLE_DOCTOR")
      setDoctorAvailability(user?.status === "AVAILABLE");
  }, [currentRole, user]);

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
    setShowSpinner(true);
    updateDoctor(doctorPayload, user.id)
      .then((res: any) => {
        setShowSpinner(false);
        if (res.status === 200) {
          setDoctorAvailability(!doctorAvailability);
        } else {
          Swal.fire({
            title: "Error",
            text: "Not Updated!",
            icon: "error",
          });
        }
      })
      .catch((err) => {
        setShowSpinner(false);
        console.log(err);
      });
  };

  return (
    <div className="content-wrapper d-flex m-0 align-items-center justify-content-center">
      <div className="w-50" style={{ maxHeight: "80vh", overflowY: "auto" }}>
        <div className="d-flex m-0 align-items-center justify-content-between">
          <select
            className="form-select w-25"
            style={{ border: "2px solid skyblue" }}
            defaultValue={currentSection}
            onChange={handleSectionChange}
          >
            {currentRole === "ROLE_ADMIN" && (
              <option value="Doctors">Doctors</option>
            )}
            <option value="Appointments">Appointments</option>
            {currentRole === "ROLE_ADMIN" && (
              <option value="Patients">Patients</option>
            )}
          </select>
          {currentRole === "ROLE_DOCTOR" && (
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
