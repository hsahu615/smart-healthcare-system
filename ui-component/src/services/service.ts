import axiosInstance from "./axiosInstance";

export const signIn = async (username, password) => {
  const response = await axiosInstance.post(
    "http://localhost:8080/api/auth/signin",
    {
      username: username,
      password: password,
    }
  );
  return response;
};

export const addAppointment = async (appointment) => {
  const res = await axiosInstance.post(
    "http://localhost:8080/api/v1/appointment",
    appointment
  );
  return res;
};

export const addDoctor = async (doctor) => {
  const res = await axiosInstance.post(
    "http://localhost:8081/api/v1/doctor/",
    doctor
  );
  return res;
};

export const getAllDoctors = async () => {
  const jsonData = await axiosInstance.get(
    "http://localhost:8081/api/v1/doctor/all"
  );
  return jsonData;
};

export const getAllPatients = async () => {
  const jsonData = await axiosInstance.get(
    "http://localhost:8082/api/v1/patient/all"
  );
  return jsonData;
};

export const deleteDoctorById = async (doctorId) => {
  try {
    const dltrequest = await axiosInstance.delete(
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
    const dltrequest = await axiosInstance.delete(
      `http://localhost:8080/api/v1/appointment/${appointmentId}`
    );
    return dltrequest;
  } catch (e) {
    console.log("error");
  }
}

export async function deletePatientById(patientId) {
  try {
    const dltrequest = await axiosInstance.delete(
      `http://localhost:8081/api/v1/patient/${patientId}`
    );
    return dltrequest;
  } catch (e) {
    console.log("error");
  }
}

export async function getDoctorById(doctorId) {
  try {
    const doctor = await axiosInstance.get(
      `http://localhost:8081/api/v1/doctor/${doctorId}`
    );
    return doctor;
  } catch (e) {
    console.log("error");
  }
}

export async function getDoctorByEmail(email: any) {
  try {
    const res = await axiosInstance.get(
      `http://localhost:8081/api/v1/doctor/email/${email}`
    );
    return res;
  } catch (e) {
    console.log(e);
  }
}

export async function getPatientByEmail(email: any) {
  try {
    const res = await axiosInstance.get(
      `http://localhost:8082/api/v1/patient/email/${email}`
    );
    return res;
  } catch (e) {
    console.log(e);
  }
}

export const getAllAppointments = async () => {
  const jsonData = await axiosInstance.get(
    "http://localhost:8080/api/v1/appointment/all"
  );
  return jsonData;
};

export async function getAllAppointmentsByDoctor(doctorId) {
  try {
    const doctors = await axiosInstance.get(
      `http://localhost:8080/api/v1/appointment/doctor/${doctorId}`
    );
    return doctors;
  } catch (e) {
    console.log("error");
  }
}

export async function getAllAppointmentsByPatient(patientId) {
  try {
    const patients = await axiosInstance.get(
      `http://localhost:8080/api/v1/appointment/patient/${patientId}`
    );
    return patients;
  } catch (e) {
    console.log("error");
  }
}

export async function updateAppointment(appointment) {
  try {
    const data = {
      id: appointment.id,
      appointmentTime: appointment.appointmentTime,
      status: appointment.status,
      notes: appointment.notes,
      doctorComments: appointment.doctorComments,
      patientId: appointment.patient.id,
      doctorId: appointment.doctor.id,
    };
    const res = await axiosInstance.put(
      `http://localhost:8080/api/v1/appointment/`,
      data,
      { method: "PUT" }
    );
    return res;
  } catch (e) {
    console.log("error");
  }
}

export async function updateDoctor(doctor, id) {
  try {
    const res = await axiosInstance.patch(
      `http://localhost:8081/api/v1/doctor/${id}`,
      doctor,
      { method: "PUT" }
    );
    return res;
  } catch (e) {
    console.log("error");
  }
}
