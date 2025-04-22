
import PageHeader from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import StaffStatusDropdown from "@/components/StaffStatusDropdown";
import { useState } from "react";

const initialStaff = [
  { id: 1, name: "Dr. Sarah ", role: "Doctor", specialization: "Cardiology", status: "Active" },
  { id: 2, name: "Nina Patel", role: "Staff", specialization: "Nursing", status: "On Leave" },
  { id: 3, name: "Ashwin JSoeph", role: "Staff", specialization: "Reception", status: "Inactive" },
  { id: 4, name: "Surendra Kumar", role: "Doctor", specialization: "Pediatrics", status: "Active" }
];
const access = [
  { role: "Doctor", permissions: ["View EMR", "Prescribe", "View Lab Reports"] },
  { role: "Staff", permissions: ["View Patients", "Schedule Appointments"] }
];

export default function StaffPage() {
  const [staff, setStaff] = useState(initialStaff);

  const handleStatusChange = (id: number, newStatus: string) => {
    setStaff(staff.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  return (
    <div>
      <PageHeader title="Doctor & Staff Management" subtitle="Role-based dashboard and permissions control." />
      <div className="mb-6 flex flex-col lg:flex-row gap-6 flex-wrap">
        <div className="bg-white rounded-lg p-6 shadow flex-1 min-w-[320px]">
          <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
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
              {staff.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.role}</td>
                  <td className="py-2 px-4">{user.specialization}</td>
                  <td className="py-2 px-4">
                    <StaffStatusDropdown value={user.status} onChange={status => handleStatusChange(user.id, status)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white rounded-lg p-6 shadow flex-1 min-w-[320px]">
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
          <div className="mt-8">
            <h3 className="font-semibold mb-2">Staff Availability Overview</h3>
            <div className="flex gap-3 flex-wrap">
              <Badge variant="default">Active: {staff.filter(s => s.status === "Active").length}</Badge>
              <Badge variant="secondary">On Leave: {staff.filter(s => s.status === "On Leave").length}</Badge>
              <Badge variant="secondary">Inactive: {staff.filter(s => s.status === "Inactive").length}</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
