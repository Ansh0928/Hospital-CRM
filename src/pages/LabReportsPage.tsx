
import PageHeader from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const initialDummyLabReports = [
  { id: "LAB001", patient: "John Doe", test: "Blood Glucose", date: "2025-04-16", status: "Complete" },
  { id: "LAB002", patient: "Jane Smith", test: "Lipid Panel", date: "2025-04-19", status: "Pending" },
  { id: "LAB003", patient: "Robert Johnson", test: "Hemoglobin", date: "2025-04-20", status: "In Review" }
];

export default function LabReportsPage() {
  const [reports, setReports] = useState(initialDummyLabReports);
  const [form, setForm] = useState({ patient: "", test: "", date: "", file: "" });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setReports(r => [
      ...r,
      {
        id: `LAB${(r.length + 1).toString().padStart(3, "0")}`,
        patient: form.patient,
        test: form.test,
        date: form.date,
        status: "Pending"
      }
    ]);
    setForm({ patient: "", test: "", date: "", file: "" });
  };

  return (
    <div>
      <PageHeader title="Lab & Diagnostic Reports" subtitle="Upload lab reports and link to patient records." />
      <div className="flex flex-col lg:flex-row gap-8 flex-wrap mb-4">
        <div className="bg-white rounded-lg p-6 shadow flex-1 min-w-[320px]">
          <div className="flex justify-between items-center mb-5">
            <span className="text-lg font-semibold">Recent Lab Reports</span>
            <Button size="sm">Export</Button>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-separate min-w-[540px]">
              <thead>
                <tr>
                  <th className="py-3 px-4 bg-gray-50">Report ID</th>
                  <th className="py-3 px-4 bg-gray-50">Patient</th>
                  <th className="py-3 px-4 bg-gray-50">Test</th>
                  <th className="py-3 px-4 bg-gray-50">Date</th>
                  <th className="py-3 px-4 bg-gray-50">Status</th>
                  <th className="py-3 px-4 bg-gray-50">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id} className="border-t hover:bg-gray-50 transition">
                    <td className="py-2 px-4">{report.id}</td>
                    <td className="py-2 px-4">{report.patient}</td>
                    <td className="py-2 px-4">{report.test}</td>
                    <td className="py-2 px-4">{report.date}</td>
                    <td className="py-2 px-4">
                      <Badge variant={report.status === "Complete" ? "default" : report.status === "Pending" ? "secondary" : "outline"}>{report.status}</Badge>
                    </td>
                    <td className="py-2 px-4 flex gap-2">
                      <Button size="sm" variant="outline">View</Button>
                      <Button size="sm">Download</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow flex-1 min-w-[320px]">
          <h3 className="font-semibold mb-4 text-lg">Upload New Report</h3>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleAdd}>
            <input className="border rounded px-3 py-2" type="text" placeholder="Patient Name" value={form.patient} onChange={e => setForm(f => ({ ...f, patient: e.target.value }))} required />
            <input className="border rounded px-3 py-2" type="text" placeholder="Test Type" value={form.test} onChange={e => setForm(f => ({ ...f, test: e.target.value }))} required />
            <input className="border rounded px-3 py-2" type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required />
            <input className="border rounded px-3 py-2" type="file" value={form.file} onChange={e => setForm(f => ({ ...f, file: e.target.value }))} />
            <Button className="col-span-1 md:col-span-2">Upload Report</Button>
          </form>
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Lab Test Trends</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>↑ Increase in lipid panels ordered last week</li>
              <li>↑ Glucose tests for diabetic patients</li>
              <li>→ Stable hemoglobin orders</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
