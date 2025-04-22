
import PageHeader from "@/components/ui/PageHeader";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { format } from "date-fns";

const appointDates = [
  {
    date: "2025-04-23",
    weekday: "Wednesday",
    appointments: [
      {
        time: "09:00",
        patient: "Olivia Garcia",
        patientId: "P-1116",
        reason: "Follow-up",
        duration: "30 min",
        doctor: "Dr. Sarah Johnson",
        doctorRole: "Cardiologist"
      },
      {
        time: "09:00",
        patient: "Ethan Martin",
        patientId: "P-1931",
        reason: "Follow-up",
        duration: "60 min",
        doctor: "Dr. Michael Chen",
        doctorRole: "Neurologist"
      },
      {
        time: "09:15",
        patient: "Daniel Johnson",
        patientId: "P-1570",
        reason: "Lab Results",
        duration: "30 min",
        doctor: "Dr. David Rodriguez",
        doctorRole: "Orthopedic Surgeon"
      },
      {
        time: "09:15",
        patient: "James Wilson",
        patientId: "P-1397",
        reason: "Consultation",
        duration: "15 min",
        doctor: "Dr. Emily Williams",
        doctorRole: "Pediatrician"
      }
    ]
  }
];

const allDoctors = [
  "All Doctors",
  "Dr. Sarah Johnson",
  "Dr. Michael Chen",
  "Dr. David Rodriguez",
  "Dr. Emily Williams"
];

export default function AppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date("2025-04-23"));
  const [doctorFilter, setDoctorFilter] = useState(allDoctors[0]);

  // Get appointments for selected date
  const data = appointDates.find(d => d.date === format(selectedDate, "yyyy-MM-dd"));
  const dayAppointments = data?.appointments ?? [];

  // Optionally filter by doctor
  const filteredAppointments = doctorFilter === "All Doctors"
    ? dayAppointments
    : dayAppointments.filter(appt => appt.doctor === doctorFilter);

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
                <SelectItem key={doc} value={doc}>{doc}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white mt-2">
            + New Appointment
          </Button>
        </div>
        {/* Appointments For Date */}
        <div className="bg-white rounded-lg p-6 shadow flex-1 min-w-[340px]">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-lg">
              Appointments for {format(selectedDate, "MMMM d, yyyy")}
            </span>
            <span className="text-xs bg-violet-100 text-violet-600 px-2 py-1 rounded-full">Weekday</span>
          </div>
          <ul className="space-y-2">
            {filteredAppointments.length === 0 && (
              <li className="text-gray-400 py-8 text-center">No appointments scheduled.</li>
            )}
            {filteredAppointments.map((appt, idx) => (
              <li key={idx} className="bg-gray-50 rounded flex justify-between items-center p-4">
                <div>
                  <span className="font-medium">{appt.patient}</span>{" "}
                  <span className="bg-gray-200 px-2 py-0.5 text-xs rounded ml-1 font-mono">{appt.patientId}</span>
                  <div className="text-gray-500 text-xs">{appt.reason} • {appt.duration}</div>
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
    </div>
  );
}
