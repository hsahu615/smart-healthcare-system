import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import AddDoctor from "./pages/AddDoctor/AddDoctor";
import AddAppointment from "./pages/AddAppointment/AddAppointment";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/newdoctor" element={<AddDoctor />}></Route>
        <Route path="/newappointment" element={<AddAppointment />}></Route>
      </Routes>
    </>
  );
}

export default App;
