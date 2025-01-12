import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCancel, faCheck, faClock, faPencil, faStickyNote, faTrash, faUser, faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import { getAllAppointments, getAllAppointmentsByDoctor, getAllAppointmentsByPatient, updateAppointment } from "../../services/service";
import Swal from "sweetalert2";
import { spinnerContext } from "../Spinner/spinnerContext";

// Appointments Component: Handles fetching, displaying, and managing appointments
const Appointments = () => {
	// State hooks for managing appointments, doctor details, modals, and user role
	const [appointments, setAppointments] = useState<any>([]);
	const [doctor, setDoctor] = useState<any>({});
	const [showModal, setShowModal] = useState(false);
	const [updateModal, setUpdateModal] = useState(false);
	const [currentRole, setCurrentRole] = useState<any>("");
	const { setShowSpinner } = useContext(spinnerContext);
	const user: any = JSON.parse(localStorage.getItem("user") || "{}");

	// Fetch appointments data on component mount
	useEffect(() => {
		fetchData();
	}, []);

	// Fetch data based on user role (Patient, Doctor, or Admin)
	const fetchData = () => {
		const role = localStorage.getItem("userRole");
		setCurrentRole(role);
		setShowSpinner(true);

		// Fetch appointments for patients
		if (role === "ROLE_PATIENT") {
			if (user && user.id) {
				getAllAppointmentsByPatient(user.id)
					.then((res: any) => {
						setShowSpinner(false);
						const aps = res?.data?.data || [];
						setAppointments(aps);
					})
					.catch((err) => {
						setShowSpinner(false);
						console.log(err);
					});
			} else {
				setShowSpinner(false);
			}
		}
		// Fetch appointments for doctors
		else if (role === "ROLE_DOCTOR") {
			if (user && user.id) {
				getAllAppointmentsByDoctor(user.id)
					.then((res: any) => {
						setShowSpinner(false);
						const aps = res?.data?.data || [];
						setAppointments(aps);
					})
					.catch((err) => {
						setShowSpinner(false);
						console.log(err);
					});
			} else {
				setShowSpinner(false);
			}
		}
		// Fetch all appointments for admins
		else {
			getAllAppointments()
				.then((res: any) => {
					setShowSpinner(false);
					const aps = res?.data?.data || [];
					setAppointments(aps);
				})
				.catch((err) => {
					setShowSpinner(false);
					console.log(err);
				});
		}
	};

	// Show doctor details popup
	const handleShow = (doctor: any) => {
		setDoctor(doctor);
		setShowModal(true);
	};

	// Close doctor details popup
	const handleClose = () => setShowModal(false);

	// Show appointment update popup
	const updateModalShow = () => {
		setUpdateModal(true);
	};

	// Close appointment update popup
	const updateClose = () => setUpdateModal(false);

	// Format date to DD MMM YYYY format
	const formatDate = (date) => {
		const dat = new Date(date);
		return new Intl.DateTimeFormat("en-GB", {
			day: "2-digit",
			month: "short",
			year: "numeric",
		}).format(dat);
	};

	// Check if the appointment is in the past
	const isPast = (time) => {
		const appointmentTime = new Date(time);
		const currentTime = new Date();
		return currentTime > appointmentTime;
	};

	// Update appointment status (e.g., Confirmed, Rejected)
	const updateAppointmentStatus = (appointment, status) => {
		appointment.status = status;
		setShowSpinner(true);
		updateAppointment(appointment)
			.then((res: any) => {
				setShowSpinner(false);
				if (res.status === 200) fetchData();
				else
					Swal.fire({
						title: "Error",
						text: "Failed to update",
						icon: "error",
					});
			})
			.catch((err) => {
				setShowSpinner(false);
				console.log(err);
			});
	};

	// Update appointment details after checkup
	const updateAfterCheckup = (appointment, e) => {
		e.preventDefault();
		appointment.doctorComments = e.target[3].value;
		setShowSpinner(true);
		updateAppointment(appointment)
			.then((res: any) => {
				setShowSpinner(false);
				if (res.status === 200) {
					fetchData();
					updateClose();
				} else
					Swal.fire({
						title: "Error",
						text: "Failed to update",
						icon: "error",
					});
			})
			.catch((err) => {
				setShowSpinner(false);
				console.log(err);
			});
	};

	// Reject an appointment
	const deleteAppointment = (appointment) => {
		appointment.status = "REJECTED";
		setShowSpinner(true);
		updateAppointment(appointment)
			.then((res: any) => {
				setShowSpinner(false);
				if (res.status === 200) {
					fetchData();
				} else
					Swal.fire({
						title: "Error",
						text: "Failed to update",
						icon: "error",
					});
			})
			.catch((err) => {
				setShowSpinner(false);
				console.log(err);
			});
	};

	return (
		<div>
			{/* Map through appointments and render each appointment card */}
			{appointments.map((appointment: any) => (
				<div
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
									<span>
										<FontAwesomeIcon icon={faStickyNote} className="mx-1" />
									</span>
									{appointment.notes.slice(0, 40)}
								</p>
							</div>
							<div className="d-flex flex-column justify-content-between align-items-center">
								{showModal && (
									<div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
										<div className="modal-dialog modal-dialog-centered">
											<div className="modal-content">
												<div className="modal-header">
													<h5 className="modal-title">Doctor</h5>
													<button type="button" className="btn-close" onClick={handleClose}></button>
												</div>
												<div className="modal-body">
													<div className="my-2">
														<h4>{doctor.firstName.trim() + " " + doctor.lastName.trim()}</h4>
														<em>{doctor.specialty}</em>
													</div>
													<p className="my-1">Email: {doctor.email}</p>
													<p className="my-1">Phone: {doctor.phone}</p>
													<p className="my-1">Status: {doctor.status.toLowerCase() === "available" ? "Available" : doctor.status.toLowerCase() === "not_available" ? "Not Available" : "Left the hospital"}</p>
												</div>
											</div>
										</div>
									</div>
								)}

								{updateModal && (
									<div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
										<div className="modal-dialog modal-dialog-centered">
											<div className="modal-content">
												<div className="modal-header">
													<h5 className="modal-title">Appointment</h5>
													<button type="button" className="btn-close" onClick={updateClose}></button>
												</div>
												<div className="modal-body">
													<form onSubmit={(e) => updateAfterCheckup(appointment, e)}>
														<div className="my-4">
															<label htmlFor="patientName" className="form-label">
																Patient Name:
															</label>
															<input required value={appointment.patient.firstName + " " + appointment.patient.lastName} type="text" className="form-control" id="patientName" disabled />
														</div>
														<div className="my-4">
															<label htmlFor="appointmentTime" className="form-label">
																Appointment Time
															</label>
															<input required value={appointment.appointmentTime} type="datetime-local" className="form-control" id="appointmentTime" disabled />
														</div>
														<div className="my-4">
															<label htmlFor="notes" className="form-label">
																Patient Comments:
															</label>
															<textarea required value={appointment.notes} rows={3} className="form-control" id="notes" disabled />
														</div>
														<div className="my-4">
															<label htmlFor="doctorComments" className="form-label">
																Doctor Comments:
															</label>
															<input required name="doctorComments" type="text" className="form-control" id="doctorComments" />
														</div>
														<div className="my-4 d-flex">
															<button className="btn btn-success" type="submit">
																Update
															</button>
														</div>
													</form>
												</div>
											</div>
										</div>
									</div>
								)}
								{/* Show Doctor button for non doctor roles to view doctor details */}
								{currentRole !== "ROLE_DOCTOR" && (
									<button className="bg-transparent border-0 p-1">
										<FontAwesomeIcon icon={faUserDoctor} className="mx-1" onClick={() => handleShow(appointment.doctor)} />
									</button>
								)}
								{currentRole === "ROLE_PATIENT" && !isPast(appointment.appointmentTime) && appointment.status !== "REJECTED" && (
									<button className="bg-transparent border-0 p-1">
										<FontAwesomeIcon icon={faTrash} className="mx-1" onClick={() => deleteAppointment(appointment)} />
									</button>
								)}
								{/* At the time of patient screening doctor leaves comments */}
								{currentRole === "ROLE_DOCTOR" && !isPast(appointment.appointmentTime) && appointment.status === "CONFIRMED" && appointment?.doctorComments?.length === 0 && (
									<button className="bg-transparent border-0 p-1">
										<FontAwesomeIcon icon={faPencil} className="mx-1" onClick={() => updateModalShow()} />
									</button>
								)}
								{/* Receiving new appointment (Confirm or reject) */}
								{currentRole === "ROLE_DOCTOR" && !isPast(appointment.appointmentTime) && appointment.status === "PENDING" && (
									<div>
										<button className="bg-transparent border-0 p-1">
											<FontAwesomeIcon icon={faCancel} className="mx-1" onClick={() => updateAppointmentStatus(appointment, "REJECTED")} />
										</button>
										<button className="bg-transparent border-0 p-1">
											<FontAwesomeIcon icon={faCheck} className="mx-1" onClick={() => updateAppointmentStatus(appointment, "CONFIRMED")} />
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default Appointments;
