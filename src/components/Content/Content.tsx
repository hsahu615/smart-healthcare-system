import React, { useState } from "react";
import "./Content.css";
import Appointments from "../Appointments/Appointments";
import Doctors from "../Doctors/Doctors";

const Content = () => {
  const [currentSection, setCurrentSection] = useState("Appointments");
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const handleSectionChange = (e) => {
    setCurrentSection(e.target.value);
    if (e.target.value === "Doctors") {
      try {
        fetchData("http://localhost:8081/doctor/all").then((data) =>
          setDoctors(data)
        );
      } catch (e) {
        console.log(e);
      }
    } else if (e.target.value === "Appointments") {
      try {
        fetchData("http://localhost:8080/appointment/all").then((data) =>
          setAppointments(data)
        );
      } catch (e) {
        console.log(e);
      }
    }
  };

  const fetchData = async (uri) => {
    const jsonData = await fetch(uri, { method: "GET" });
    const data = jsonData.json();
    return data;
  };

  return (
    <div className="content-wrapper row m-0 align-items-center justify-content-center">
      <div className="col-8">
        <select defaultValue={currentSection} onChange={handleSectionChange}>
          <option value="Doctors">Doctors</option>
          <option value="Appointments">Appointments</option>
        </select>
        {currentSection === "Doctors" ? (
          <Doctors doctors={doctors} />
        ) : (
          <Appointments appointments={appointments} />
        )}
      </div>
    </div>
  );
};

export default Content;
