
import PageHeader from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const dummyStaff = [
  { id: 1, name: "Dr. Sarah Johnson", role: "Doctor", specialization: "Cardiology", status: "Active" },
  { id: 2, name: "Nina Patel", role: "Staff", specialization: "Nursing", status: "On Leave" }
];
const access = [
  { role: "Doctor", permissions: ["View EMR", "Prescribe", "View Lab Reports"] },
  { role: "Staff", permissions: ["View Patients", "Schedule Appointments"] }
];

const StaffPage = () => (
  <div>
    <PageHeader title="Doctor & Staff Management" subtitle="Role-based dashboard and permissions control." />
    <div className="mb-6 flex gap-6 flex-col md:flex-row">
      <div className="bg-white rounded-lg p-6 shadow flex-1">
        <div className="flex justify-between items-center mb-3">
          <span className="text-lg font-semibold">Staff Directory</span>
          <Button size="sm">Add Staff</Button>
        </div>
        <table className="w-full text-left rounded">
          <thead>
            <tr>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Role</th>
              <th className="py-2 px-4">Specialization</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {dummyStaff.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.role}</td>
                <td className="py-2 px-4">{user.specialization}</td>
                <td className="py-2 px-4">
                  <Badge variant={user.status === "Active" ? "default" : "secondary"}>{user.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-white rounded-lg p-6 shadow flex-1">
        <span className="text-lg font-semibold mb-3 block">Role-Based Access</span>
        <ul>
          {access.map((a) => (
            <li key={a.role} className="mb-3">
              <div className="font-medium">{a.role}</div>
              <ul className="list-disc ml-4 text-sm text-gray-700">
                {a.permissions.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);
export default StaffPage;
