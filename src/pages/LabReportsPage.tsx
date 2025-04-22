
import PageHeader from "@/components/ui/PageHeader";

const dummyLabReports = [
  { id: "LAB001", patient: "John Doe", test: "Blood Glucose", date: "2025-04-16", status: "Complete" },
  { id: "LAB002", patient: "Jane Smith", test: "Lipid Panel", date: "2025-04-19", status: "Pending" }
];

const LabReportsPage = () => (
  <div>
    <PageHeader title="Lab & Diagnostic Reports" subtitle="Upload lab reports and link to patient records." />
    <div className="bg-white rounded-lg p-6 shadow">
      <table className="w-full text-left rounded">
        <thead>
          <tr>
            <th className="py-2 px-4">Report ID</th>
            <th className="py-2 px-4">Patient</th>
            <th className="py-2 px-4">Test</th>
            <th className="py-2 px-4">Date</th>
            <th className="py-2 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {dummyLabReports.map((report) => (
            <tr key={report.id} className="border-t">
              <td className="py-2 px-4">{report.id}</td>
              <td className="py-2 px-4">{report.patient}</td>
              <td className="py-2 px-4">{report.test}</td>
              <td className="py-2 px-4">{report.date}</td>
              <td className="py-2 px-4">{report.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default LabReportsPage;
