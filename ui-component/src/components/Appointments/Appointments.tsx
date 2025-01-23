import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCancel, faCheck, faClock, faPencil, faStickyNote, faTrash, faUser, faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import { getAllAppointments, getAllAppointmentsByDoctor, getAllAppointmentsByPatient, updateAppointment } from "../../services/service";
import Swal from "sweetalert2";
import { spinnerContext } from "../Spinner/spinnerContext";

const Appointments = () => {
    const [appointments, setAppointments] = useState<any>([]);
    const [doctor, setDoctor] = useState<any>({});
    const [showModal, setShowModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [currentRole, setCurrentRole] = useState<any>("");
    const { setShowSpinner } = useContext(spinnerContext);
    const user: any = JSON.parse(localStorage.getItem("user") || "{}");
    console.log(user);

    useEffect(() => {
        console.log("Component mounted. Fetching data...");
        fetchData();
    }, []);

    const fetchData = () => {
        const role = localStorage.getItem("userRole");
        console.log("User Role:", role);
        console.log("User Data:", user);
        setCurrentRole(role);
        setShowSpinner(true);

        if (role === "ROLE_PATIENT") {
            console.log(user);
            if (user && user.id) {
                console.log("Fetching appointments for patient...");
                getAllAppointmentsByPatient(user.id)
                    .then((res: any) => {
                        console.log(res);
                        setShowSpinner(false);
                        const aps = res?.data|| [];
                        console.log("Appointments fetched for patient:", aps);
                        setAppointments(aps);
                    })
                    .catch((err) => {
                        setShowSpinner(false);
                        console.error("Error fetching patient appointments:", err);
                    });
            } else {
                console.warn("User ID not found for ROLE_PATIENT.");
                setShowSpinner(false);
            }
        } else if (role === "ROLE_DOCTOR") {
            if (user && user.id) {
                console.log("Fetching appointments for doctor...");
                getAllAppointmentsByDoctor(user.id)
                    .then((res: any) => {
                        setShowSpinner(false);
                        const aps = res?.data || [];
                        console.log("Appointments fetched for doctor:", aps);
                        setAppointments(aps);
                    })
                    .catch((err) => {
                        setShowSpinner(false);
                        console.error("Error fetching doctor appointments:", err);
                    });
            } else {
                console.warn("User ID not found for ROLE_DOCTOR.");
                setShowSpinner(false);
            }
        } else {
            console.log("Fetching all appointments for admin...");
            getAllAppointments()
                .then((res: any) => {
                    setShowSpinner(false);
                    const aps = res?.data?.data || [];
                    console.log("All appointments fetched for admin:", aps);
                    setAppointments(aps);
                })
                .catch((err) => {
                    setShowSpinner(false);
                    console.error("Error fetching all appointments:", err);
                });
        }
    };

    const handleShow = (doctor: any) => {
        console.log("Displaying doctor details:", doctor);
        setDoctor(doctor);
        setShowModal(true);
    };

    const handleClose = () => {
        console.log("Closing doctor details modal.");
        setShowModal(false);
    };

    const updateModalShow = () => {
        console.log("Opening update modal.");
        setUpdateModal(true);
    };

    const updateClose = () => {
        console.log("Closing update modal.");
        setUpdateModal(false);
    };

    const formatDate = (date) => {
        const formattedDate = new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }).format(new Date(date));
        console.log("Formatted date:", formattedDate);
        return formattedDate;
    };

    const isPast = (time) => {
        const isPastDate = new Date() > new Date(time);
        console.log(`Is ${time} in the past?`, isPastDate);
        return isPastDate;
    };

    const updateAppointmentStatus = (appointment, status) => {
        console.log("Updating appointment status:", { appointment, status });
        appointment.status = status;
        setShowSpinner(true);
        updateAppointment(appointment)
            .then((res: any) => {
                setShowSpinner(false);
                if (res.status === 200) {
                    console.log("Appointment status updated successfully.");
                    fetchData();
                } else {
                    console.error("Failed to update appointment status.");
                    Swal.fire({ title: "Error", text: "Failed to update", icon: "error" });
                }
            })
            .catch((err) => {
                setShowSpinner(false);
                console.error("Error updating appointment status:", err);
            });
    };

    const updateAfterCheckup = (appointment, e) => {
        e.preventDefault();
        console.log("Updating appointment after checkup:", appointment);
        appointment.doctorComments = e.target[3].value;
        setShowSpinner(true);
        updateAppointment(appointment)
            .then((res: any) => {
                setShowSpinner(false);
                if (res.status === 200) {
                    console.log("Appointment updated successfully after checkup.");
                    fetchData();
                    updateClose();
                } else {
                    console.error("Failed to update appointment after checkup.");
                    Swal.fire({ title: "Error", text: "Failed to update", icon: "error" });
                }
            })
            .catch((err) => {
                setShowSpinner(false);
                console.error("Error updating appointment after checkup:", err);
            });
    };

    const deleteAppointment = (appointment) => {
        console.log("Rejecting appointment:", appointment);
        appointment.status = "REJECTED";
        setShowSpinner(true);
        updateAppointment(appointment)
            .then((res: any) => {
                setShowSpinner(false);
                if (res.status === 200) {
                    console.log("Appointment rejected successfully.");
                    fetchData();
                } else {
                    console.error("Failed to reject appointment.");
                    Swal.fire({ title: "Error", text: "Failed to update", icon: "error" });
                }
            })
            .catch((err) => {
                setShowSpinner(false);
                console.error("Error rejecting appointment:", err);
            });
    };

    return (
        <div>
            {appointments.map((appointment: any) => (
                <div
                    key={appointment.id}
                    className="card my-2 w-100"
                    style={{
                        border: isPast(appointment.appointmentTime) ? "2px solid blue" : appointment.status.toLowerCase() === "pending" ? "2px solid yellow" : appointment.status.toLowerCase() === "confirmed" ? "2px solid green" : "2px solid red",
                    }}
                >
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <div>
                                <h5 className="card-title">
                                    <FontAwesomeIcon icon={faUser} className="mx-1" />
                                    {appointment.patient.firstName.trim() + " " + appointment.patient.lastName.trim()}
                                </h5>
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="card-text m-0">
                                        <FontAwesomeIcon icon={faCalendar} className="mx-1" /> {formatDate(appointment.appointmentTime.split("T")[0])} <br />
                                        <FontAwesomeIcon icon={faClock} className="mx-1" /> {appointment.appointmentTime.split("T")[1].split(":").slice(0, 2).join(":")}
                                    </p>
                                </div>
                                <p className="card-text m-0">
                                    <FontAwesomeIcon icon={faStickyNote} className="mx-1" />
                                    {appointment.notes.slice(0, 40)}
                                </p>
                            </div>
                            {/* Buttons and Modals */}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Appointments;
