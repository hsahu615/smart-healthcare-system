import React, { useEffect, useState } from "react";
import "./Home.css";
import Appointments from "../../components/Appointments/Appointments";
import Doctors from "../../components/Doctors/Doctors";
import Patients from "../../components/Patients/Patients";

const Home = () => {
  const [currentSection, setCurrentSection] = useState("Appointments");
  const [currentRole, setCurrentRole] = useState<any>("");

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setCurrentRole(role);
  }, []);

  const handleSectionChange = (e) => {
    setCurrentSection(e.target.value);
  };

  return (
    <div className="content-wrapper row m-0 align-items-center justify-content-center">
      <div className="col-8">
        <select
          className="form-select w-25"
          style={{ border: "2px solid skyblue" }}
          defaultValue={currentSection}
          onChange={handleSectionChange}
        >
          {currentRole === "admin" && <option value="Doctors">Doctors</option>}
          <option value="Appointments">Appointments</option>
          {currentRole === "admin" && (
            <option value="Patients">Patients</option>
          )}
        </select>
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
