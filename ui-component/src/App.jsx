import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import AddDoctor from "./pages/AddDoctor/AddDoctor";
import AddAppointment from "./pages/AddAppointment/AddAppointment";
import Login from "./pages/Login/Login";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { Route, Routes } from "react-router-dom";
import AuthProvider from "./auth/AuthProvider";
import SpinnerProvider from "./components/Spinner/spinnerProvider";

function App() {
  return (
    <>
      <SpinnerProvider>
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  roles={["ROLE_ADMIN", "ROLE_PATIENT", "ROLE_DOCTOR"]}
                >
                  <Navbar />
                  <Home />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/unauthorized" element={<Unauthorized />}></Route>
            <Route
              path="/newdoctor"
              element={
                <ProtectedRoute roles={["ROLE_ADMIN"]}>
                  <Navbar />
                  <AddDoctor />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/newappointment"
              element={
                <ProtectedRoute roles={["ROLE_PATIENT"]}>
                  <Navbar />
                  <AddAppointment />
                </ProtectedRoute>
              }
            ></Route>
          </Routes>
        </AuthProvider>
      </SpinnerProvider>
    </>
  );
}

export default App;
