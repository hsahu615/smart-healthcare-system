import axios from "axios";

export const addAppointment = async (appointment) => {
  const res = await axios.post(
    "http://localhost:8080/api/v1/appointment",
    appointment
  );
  return res;
};

export const addDoctor = async (doctor) => {
  const res = await axios.post("http://localhost:8081/api/v1/doctor/", doctor);
  return res;
};

export const getAllDoctors = async () => {
  const jsonData = await axios.get("http://localhost:8081/api/v1/doctor/all");
  return jsonData;
};

export const getAllPatients = async () => {
  const jsonData = await axios.get("http://localhost:8082/api/v1/patient/all");
  return jsonData;
};

export const deleteDoctorById = async (doctorId) => {
  try {
    const dltrequest = await axios.delete(
      `http://localhost:8081/api/v1/doctor/${doctorId}`,
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
      `http://localhost:8080/api/v1/appointment/${appointmentId}`
    );
    return dltrequest;
  } catch (e) {
    console.log("error");
  }
}

export async function deletePatientById(patientId) {
  try {
    const dltrequest = await axios.delete(
      `http://localhost:8081/api/v1/patient/${patientId}`
    );
    return dltrequest;
  } catch (e) {
    console.log("error");
  }
}

export async function getDoctorById(doctorId) {
  try {
    const doctor = await axios.get(
      `http://localhost:8081/api/v1/doctor/${doctorId}`
    );
    return doctor;
  } catch (e) {
    console.log("error");
  }
}

export const getAllAppointments = async () => {
  const jsonData = await axios.get(
    "http://localhost:8080/api/v1/appointment/all"
  );
  return jsonData;
};

export async function getAllAppointmentsByDoctor(doctorId) {
  try {
    const doctors = await axios.get(
      `http://localhost:8080/api/v1/appointment/doctor/${doctorId}`
    );
    return doctors;
  } catch (e) {
    console.log("error");
  }
}

export async function getAllAppointmentsByPatient(patientId) {
  try {
    const patients = await axios.get(
      `http://localhost:8080/api/v1/appointment/patient/${patientId}`
    );
    return patients;
  } catch (e) {
    console.log("error");
  }
}

export async function updateAppointment(doctor) {
  try {
    const res = await axios.put(
      `http://localhost:8080/api/v1/appointment/`,
      doctor,
      { method: "PUT" }
    );
    return res;
  } catch (e) {
    console.log("error");
  }
}
