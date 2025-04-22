
import PageHeader from "@/components/ui/PageHeader";

const dummyPatients = [
  { id: "PT-2025-12345", name: "John Doe", dob: "1985-05-15", gender: "Male", status: "Active" },
  { id: "PT-2025-23456", name: "Jane Smith", dob: "1990-10-20", gender: "Female", status: "Active" },
  { id: "PT-2025-34567", name: "Robert Johnson", dob: "1978-03-08", gender: "Male", status: "Inactive" }
];

const PatientsPage = () => (
  <div>
    <PageHeader title="Patient Management" subtitle="Manage patient registration, records, and status." />
    <div className="bg-white rounded-lg p-6 shadow">
      <table className="w-full text-left rounded">
        <thead>
          <tr>
            <th className="py-2 px-4">Patient ID</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">DOB</th>
            <th className="py-2 px-4">Gender</th>
            <th className="py-2 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {dummyPatients.map((patient) => (
            <tr key={patient.id} className="border-t">
              <td className="py-2 px-4">{patient.id}</td>
              <td className="py-2 px-4">{patient.name}</td>
              <td className="py-2 px-4">{patient.dob}</td>
              <td className="py-2 px-4">{patient.gender}</td>
              <td className="py-2 px-4">{patient.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default PatientsPage;
