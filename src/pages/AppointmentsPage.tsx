
import PageHeader from "@/components/ui/PageHeader";

const dummyAppointments = [
  { id: 1, doctor: "Dr. Sarah Johnson", patient: "John Doe", date: "2025-04-25", time: "10:00", status: "Scheduled" },
  { id: 2, doctor: "Dr. David Lee", patient: "Jane Smith", date: "2025-04-23", time: "14:30", status: "Scheduled" },
  { id: 3, doctor: "Dr. Maria Rodriguez", patient: "Robert Johnson", date: "2025-04-22", time: "11:15", status: "Completed" }
];

const AppointmentsPage = () => (
  <div>
    <PageHeader title="Appointment Scheduling" subtitle="View and manage doctor-wise appointment slots." />
    <div className="bg-white rounded-lg p-6 shadow">
      <table className="w-full text-left rounded">
        <thead>
          <tr>
            <th className="py-2 px-4">Doctor</th>
            <th className="py-2 px-4">Patient</th>
            <th className="py-2 px-4">Date</th>
            <th className="py-2 px-4">Time</th>
            <th className="py-2 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {dummyAppointments.map((appt) => (
            <tr key={appt.id} className="border-t">
              <td className="py-2 px-4">{appt.doctor}</td>
              <td className="py-2 px-4">{appt.patient}</td>
              <td className="py-2 px-4">{appt.date}</td>
              <td className="py-2 px-4">{appt.time}</td>
              <td className="py-2 px-4">{appt.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default AppointmentsPage;
