
import PageHeader from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const dummyLabReports = [
  { id: "LAB001", patient: "John Doe", test: "Blood Glucose", date: "2025-04-16", status: "Complete" },
  { id: "LAB002", patient: "Jane Smith", test: "Lipid Panel", date: "2025-04-19", status: "Pending" }
];

const LabReportsPage = () => (
  <div>
    <PageHeader title="Lab & Diagnostic Reports" subtitle="Upload lab reports and link to patient records." />
    <div className="bg-white rounded-lg p-6 shadow">
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-semibold">Recent Lab Reports</span>
        <Button size="sm">Add Report</Button>
      </div>
      <table className="w-full text-left rounded">
        <thead>
          <tr>
            <th className="py-2 px-4">Report ID</th>
            <th className="py-2 px-4">Patient</th>
            <th className="py-2 px-4">Test</th>
            <th className="py-2 px-4">Date</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dummyLabReports.map((report) => (
            <tr key={report.id} className="border-t">
              <td className="py-2 px-4">{report.id}</td>
              <td className="py-2 px-4">{report.patient}</td>
              <td className="py-2 px-4">{report.test}</td>
              <td className="py-2 px-4">{report.date}</td>
              <td className="py-2 px-4">
                <Badge variant={report.status === "Complete" ? "default" : "secondary"}>{report.status}</Badge>
              </td>
              <td className="py-2 px-4">
                <Button size="sm" variant="outline">View</Button>
                <Button size="sm" className="ml-2">Download</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Upload New Report</h3>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="border rounded px-3 py-2" type="text" placeholder="Patient Name" required />
          <input className="border rounded px-3 py-2" type="text" placeholder="Test Type" required />
          <input className="border rounded px-3 py-2" type="date" />
          <input className="border rounded px-3 py-2" type="file" />
          <Button className="col-span-1 md:col-span-2">Upload Report</Button>
        </form>
      </div>
    </div>
  </div>
);
export default LabReportsPage;
