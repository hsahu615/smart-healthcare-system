import React, { useState } from "react";
import "./Home.css";
import Appointments from "../../components/Appointments/Appointments";
import Doctors from "../../components/Doctors/Doctors";

const Home = () => {
  const [currentSection, setCurrentSection] = useState("Doctors");

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
          <option value="Doctors">Doctors</option>
          <option value="Appointments">Appointments</option>
        </select>
        {currentSection === "Doctors" ? <Doctors /> : <Appointments />}
      </div>
    </div>
  );
};
export default Home;
