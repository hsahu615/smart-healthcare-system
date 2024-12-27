import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import AddDoctor from "./pages/AddDoctor/AddDoctor";
import AddAppointment from "./pages/AddAppointment/AddAppointment";
import Login from "./pages/Login/Login";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute roles={["admin", "doctor", "patient"]}>
              <Home />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/unauthorized" element={<Unauthorized />}></Route>
        <Route
          path="/newdoctor"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AddDoctor />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/newappointment"
          element={
            <ProtectedRoute roles={["patient"]}>
              <AddAppointment />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
