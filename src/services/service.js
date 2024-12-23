import axios from "axios";

export const addAppointment = async (appointment) => {
  const res = await axios.post(
    "http://localhost:8080/appointment",
    appointment
  );
  return res;
};

export const addDoctor = async (doctor) => {
  const res = await axios.post("http://localhost:8081/doctor/", doctor);
  return res;
};

export const getAllDoctors = async () => {
  const jsonData = await axios.get("http://localhost:8081/doctor/all");
  return jsonData;
};

export const deleteDoctorById = async (doctorId) => {
  try {
    const dltrequest = await axios.delete(
      `http://localhost:8081/doctor/${doctorId}`,
      {
        method: "DELETE",
      }
    );
  } catch (e) {
    console.log("error");
  }
};

export async function deleteAppointmentById(appointmentId) {
  try {
    const dltrequest = await axios.delete(
      `http://localhost:8080/appointment/${appointmentId}`
    );
    return dltrequest;
  } catch (e) {
    console.log("error");
  }
}

export async function getDoctorById(doctorId) {
  try {
    const doctor = await axios.get(`http://localhost:8081/doctor/${doctorId}`);
    return doctor;
  } catch (e) {
    console.log("error");
  }
}

export const getAllAppointments = async () => {
  const jsonData = await axios.get("http://localhost:8080/appointment/all");
  return jsonData;
};
