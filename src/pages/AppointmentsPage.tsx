import React, { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";

const initialAppointments = [
  {
    date: "2025-04-23",
    weekday: "Wednesday",
    appointments: [
      {
        time: "09:00",
        patient: "Aakansha Sharma",
        patientId: "P-1116",
        reason: "Follow-up",
        duration: "30 min",
        doctor: "Dr. Sarah",
        doctorRole: "Cardiologist",
      },
      {
        time: "09:00",
        patient: "Apurv Kumar",
        patientId: "P-1931",
        reason: "Follow-up",
        duration: "60 min",
        doctor: "Dr. Anshumaan Saraf",
        doctorRole: "Neurologist",
      },
      {
        time: "09:15",
        patient: "Venkatesh Aiyer",
        patientId: "P-1570",
        reason: "Lab Results",
        duration: "30 min",
        doctor: "Dr. Sarah",
        doctorRole: "Orthopedic Surgeon",
      },
      {
        time: "09:15",
        patient: "James",
        patientId: "P-1397",
        reason: "Consultation",
        duration: "15 min",
        doctor: "Dr. Sarag",
        doctorRole: "Pediatrician",
      },
    ],
  },
];

const allDoctors = [
  "All Doctors",
  "Dr. Sarah",
  "Dr. Aakansha Sharma",
  "Dr. Anshumaan Saraf",
  "Dr. Sarag",
];

export default function AppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date("2025-04-23"));
  const [doctorFilter, setDoctorFilter] = useState(allDoctors[0]);
  const [appointmentsData, setAppointmentsData] = useState(initialAppointments);

  // Modal/form state
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    patient: "",
    patientId: "",
    reason: "",
    duration: "",
    doctor: allDoctors[1], // default to first doctor (not "All Doctors")
    doctorRole: "",
    time: "",
  });

  // Find appointments for selected date
  const dateStr = format(selectedDate, "yyyy-MM-dd");
  let dayData = appointmentsData.find((d) => d.date === dateStr);
  const dayAppointments = dayData?.appointments ?? [];

  // Filter appointments by doctor with normalized string compare
  const filteredAppointments =
    doctorFilter === "All Doctors"
      ? dayAppointments
      : dayAppointments.filter(
          (appt) => appt.doctor.trim().toLowerCase() === doctorFilter.trim().toLowerCase()
        );

  // Sort appointments by time ascending
  filteredAppointments.sort((a, b) => a.time.localeCompare(b.time));

  function handleFormChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSave() {
    if (
      !form.patient ||
      !form.patientId ||
      !form.reason ||
      !form.duration ||
      !form.doctor ||
      !form.doctorRole ||
      !form.time
    ) {
      alert("Please fill all fields");
      return;
    }

    // Normalize doctor name from allDoctors to avoid mismatch
    const normalizedDoctor = allDoctors.find(
      (d) => d.toLowerCase() === form.doctor.trim().toLowerCase()
    ) || form.doctor.trim();

    const newAppt = {
      time: form.time,
      patient: form.patient,
      patientId: form.patientId,
      reason: form.reason,
      duration: form.duration,
      doctor: normalizedDoctor,
      doctorRole: form.doctorRole,
    };

    setAppointmentsData((prev) => {
      const index = prev.findIndex((d) => d.date === dateStr);
      if (index >= 0) {
        // Append appointment to existing date
        const updatedAppointments = [...prev[index].appointments, newAppt];
        // Sort by time
        updatedAppointments.sort((a, b) => a.time.localeCompare(b.time));

        const updated = [...prev];
        updated[index] = {
          ...prev[index],
          appointments: updatedAppointments,
        };
        return updated;
      } else {
        // New date with one appointment
        return [...prev, { date: dateStr, weekday: format(selectedDate, "EEEE"), appointments: [newAppt] }];
      }
    });

    // Reset form and close modal
    setForm({
      patient: "",
      patientId: "",
      reason: "",
      duration: "",
      doctor: allDoctors[1],
      doctorRole: "",
      time: "",
    });
    setShowModal(false);
  }

  return (
    <div>
      <PageHeader title="Appointment Scheduling" subtitle="Manage patient appointments and scheduling" />
      <div className="flex flex-col md:flex-row gap-6">
        {/* Calendar and Filter Pane */}
        <div className="bg-white rounded-lg p-6 shadow w-full md:max-w-sm mb-4 flex flex-col">
          <h3 className="font-semibold mb-1">Calendar</h3>
          <p className="mb-3 text-gray-500 text-sm">Select a date to view appointments</p>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            month={selectedDate}
            onMonthChange={setSelectedDate}
            className="mb-3 pointer-events-auto border border-gray-200 rounded"
          />
          <Select value={doctorFilter} onValueChange={setDoctorFilter}>
            <SelectTrigger className="w-full mt-2 mb-2">
              <SelectValue placeholder="All Doctors" />
            </SelectTrigger>
            <SelectContent className="z-30 bg-white">
              {allDoctors.map((doc) => (
                <SelectItem key={doc} value={doc}>
                  {doc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            className="w-full bg-[#3771e4] text-white mt-2"
            onClick={() => setShowModal(true)}
          >
            + New Appointment
          </Button>
        </div>

        {/* Appointments For Date */}
        <div className="bg-white rounded-lg p-6 shadow flex-1 min-w-[340px]">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-lg">
              Appointments for {format(selectedDate, "MMMM d, yyyy")}
            </span>
            <span className="text-xs bg-[#3771e4] text-white px-2 py-1 rounded-full">
              {format(selectedDate, "EEEE")}
            </span>
          </div>
          <ul className="space-y-2">
            {filteredAppointments.length === 0 && (
              <li className="text-gray-400 py-8 text-center">No appointments scheduled.</li>
            )}
            {filteredAppointments.map((appt, idx) => (
              <li key={idx} className="bg-gray-50 rounded flex justify-between items-center p-4">
                <div>
                  <span className="font-medium">{appt.patient}</span>{" "}
                  <span className="bg-gray-200 px-2 py-0.5 text-xs rounded ml-1 font-mono">
                    {appt.patientId}
                  </span>
                  <div className="text-gray-500 text-xs">
                    {appt.reason} • {appt.duration}
                  </div>
                </div>
                <div className="text-right">
                  <span className="block font-medium">{appt.doctor}</span>
                  <span className="text-gray-500 text-xs">{appt.doctorRole}</span>
                </div>
                <div className="pl-4 text-medical-dark font-bold flex items-center">
                  <CalendarIcon size={16} className="mr-1" />
                  {appt.time}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal for New Appointment */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">New Appointment</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              <div className="space-y-3">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="patient" className="text-right">
                    Patient Name
                  </label>
                  <input
                    id="patient"
                    type="text"
                    value={form.patient}
                    onChange={(e) => handleFormChange("patient", e.target.value)}
                    className="col-span-3 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3771e4] focus:border-transparent"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="patientId" className="text-right">
                    Patient ID
                  </label>
                  <input
                    id="patientId"
                    type="text"
                    value={form.patientId}
                    onChange={(e) => handleFormChange("patientId", e.target.value)}
                    className="col-span-3 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3771e4] focus:border-transparent"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="reason" className="text-right">
                    Reason
                  </label>
                  <input
                    id="reason"
                    type="text"
                    value={form.reason}
                    onChange={(e) => handleFormChange("reason", e.target.value)}
                    className="col-span-3 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3771e4] focus:border-transparent"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="duration" className="text-right">
                    Duration
                  </label>
                  <input
                    id="duration"
                    type="text"
                    value={form.duration}
                    onChange={(e) => handleFormChange("duration", e.target.value)}
                    placeholder="e.g., 30 min"
                    className="col-span-3 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3771e4] focus:border-transparent"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="doctor" className="text-right">
                    Doctor
                  </label>
                  <select
                    id="doctor"
                    value={form.doctor}
                    onChange={(e) => handleFormChange("doctor", e.target.value)}
                    className="col-span-3 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3771e4] focus:border-transparent"
                    required
                  >
                    {allDoctors
                      .filter((doc) => doc !== "All Doctors")
                      .map((doc) => (
                        <option key={doc} value={doc}>
                          {doc}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="doctorRole" className="text-right">
                    Doctor Role
                  </label>
                  <input
                    id="doctorRole"
                    type="text"
                    value={form.doctorRole}
                    onChange={(e) => handleFormChange("doctorRole", e.target.value)}
                    placeholder="e.g., Cardiologist"
                    className="col-span-3 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3771e4] focus:border-transparent"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="time" className="text-right">
                    Time
                  </label>
                  <input
                    id="time"
                    type="time"
                    step="900"
                    value={form.time}
                    onChange={(e) => handleFormChange("time", e.target.value)}
                    className="col-span-3 rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3771e4] focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
