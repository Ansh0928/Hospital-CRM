
import PageHeader from "@/components/ui/PageHeader";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
// Appointments Calendar and List like in your screenshots
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
      }
    ]
  }
];

const AppointmentsPage = () => (
  <div>
    <PageHeader title="Appointment Scheduling" subtitle="Manage patient appointments and scheduling" />
    <div className="flex flex-col md:flex-row gap-6">
      <div className="bg-white rounded-lg p-6 shadow w-full md:w-1/3 mb-4">
        <h3 className="font-semibold mb-4">Calendar</h3>
        <div className="flex flex-col items-center">
          <Calendar size={36} className="text-medical-primary mb-2" />
          <input type="month" className="mb-3 border px-3 py-1 rounded text-gray-700" value="2025-04" readOnly/>
          <Button className="w-full mb-2">+ New Appointment</Button>
        </div>
        <select className="w-full mt-2 border px-2 py-2 rounded">
          <option>All Doctors</option>
          <option>Dr. Sarah Johnson</option>
          <option>Dr. Michael Chen</option>
        </select>
      </div>
      <div className="bg-white rounded-lg p-6 shadow flex-1">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-lg">
            Appointments for April 23, 2025
          </span>
          <span className="text-xs bg-violet-100 text-violet-600 px-2 py-1 rounded-full">Weekday</span>
        </div>
        <ul className="space-y-2">
          {appointDates[0].appointments.map((appt, idx) => (
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
              <div className="pl-4 text-medical-dark font-bold">{appt.time}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);
export default AppointmentsPage;
