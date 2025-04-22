
import PageHeader from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/badge";

const dummyPatients = [
  {
    id: "PT-2025-12345",
    name: "Aryan",
    dob: "1985-05-15",
    gender: "Male",
    status: "Active",
    bloodType: "O+",
    contact: "+1 555-1234"
  },
  {
    id: "PT-2025-23456",
    name: "Smith",
    dob: "1990-10-20",
    gender: "Female",
    status: "Active",
    bloodType: "A-",
    contact: "+1 555-2345"
  },
  {
    id: "PT-2025-34567",
    name: "Preeti Nair",
    dob: "1978-03-08",
    gender: "Male",
    status: "Inactive",
    bloodType: "B+",
    contact: "+1 555-3456"
  }
];

const recentActivity = [
  {
    patientId: "PT-2025-12345",
    doctor: "Dr. Sarah ",
    diagnosis: "Unstable angina",
    date: "2025-04-15",
    notes: "Chest pain and shortness of breath",
    department: "Cardiology"
  },
  {
    patientId: "PT-2025-23456",
    doctor: "Dr. Sarah ",
    diagnosis: "Coronary artery disease",
    date: "2025-04-20",
    notes: "Follow-up for unstable angina",
    department: "Cardiology"
  }
];

const PatientCard = ({ patient }: { patient: typeof dummyPatients[0] }) => (
  <div className="bg-white shadow-soft rounded-lg p-5 flex flex-col md:flex-row items-center gap-4">
    <div className="w-16 h-16 rounded-full bg-medical-blue flex items-center justify-center font-bold text-lg text-medical-dark">
      {patient.name[0]}
    </div>
    <div className="flex-1">
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="mr-8">
          <div className="font-medium text-lg">{patient.name}</div>
          <div className="text-gray-500 text-sm">{patient.gender}, {patient.dob}</div>
        </div>
        <div className="text-gray-500 text-sm space-x-4">
          <span>ID: <b>{patient.id}</b></span>
          <span>Blood: {patient.bloodType}</span>
          <span>Contact: {patient.contact}</span>
        </div>
      </div>
      <Badge variant={patient.status === "Active" ? "default" : "secondary"} className="mt-2">
        {patient.status}
      </Badge>
    </div>
  </div>
);

const PatientsPage = () => (
  <div>
    <PageHeader title="Patient Management" subtitle="Manage patient registration, records, and status." />
    <div className="mb-6">
      {dummyPatients.map((p) => <PatientCard key={p.id} patient={p} />)}
    </div>
    <div className="bg-white rounded-lg p-6 shadow">
      <h2 className="font-semibold mb-4 text-lg">Recent Activity</h2>
      <table className="w-full text-left rounded">
        <thead>
          <tr>
            <th className="py-2 px-4">Patient</th>
            <th className="py-2 px-4">Doctor</th>
            <th className="py-2 px-4">Diagnosis</th>
            <th className="py-2 px-4">Date</th>
            <th className="py-2 px-4">Department</th>
          </tr>
        </thead>
        <tbody>
          {recentActivity.map((item, idx) => {
            const patient = dummyPatients.find(p => p.id === item.patientId);
            return (
              <tr key={idx} className="border-t">
                <td className="py-2 px-4">{patient?.name ?? '-'}</td>
                <td className="py-2 px-4">{item.doctor}</td>
                <td className="py-2 px-4">{item.diagnosis}</td>
                <td className="py-2 px-4">{item.date}</td>
                <td className="py-2 px-4">{item.department}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);
export default PatientsPage;
