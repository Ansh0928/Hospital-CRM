
import PageHeader from "@/components/ui/PageHeader";

const dummyStaff = [
  { id: 1, name: "Dr. Sarah Johnson", role: "Doctor", specialization: "Cardiology" },
  { id: 2, name: "Nina Patel", role: "Staff", specialization: "Nursing" }
];

const StaffPage = () => (
  <div>
    <PageHeader title="Doctor & Staff Management" subtitle="Role-based dashboard and permissions control." />
    <div className="bg-white rounded-lg p-6 shadow">
      <table className="w-full text-left rounded">
        <thead>
          <tr>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Role</th>
            <th className="py-2 px-4">Specialization</th>
          </tr>
        </thead>
        <tbody>
          {dummyStaff.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="py-2 px-4">{user.name}</td>
              <td className="py-2 px-4">{user.role}</td>
              <td className="py-2 px-4">{user.specialization}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default StaffPage;
