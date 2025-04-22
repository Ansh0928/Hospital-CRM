
import PageHeader from "@/components/ui/PageHeader";

const dummyMedicines = [
  { id: "MED001", name: "Amoxicillin", stock: 150, status: "In Stock" },
  { id: "MED002", name: "Lisinopril", stock: 0, status: "Out of Stock" }
];

const PharmacyPage = () => (
  <div>
    <PageHeader title="Pharmacy & Medicine Management" subtitle="Medicine inventory, billing, and prescription integration." />
    <div className="bg-white rounded-lg p-6 shadow">
      <table className="w-full text-left rounded">
        <thead>
          <tr>
            <th className="py-2 px-4">Medicine Name</th>
            <th className="py-2 px-4">Stock</th>
            <th className="py-2 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {dummyMedicines.map((med) => (
            <tr key={med.id} className="border-t">
              <td className="py-2 px-4">{med.name}</td>
              <td className="py-2 px-4">{med.stock}</td>
              <td className="py-2 px-4">{med.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default PharmacyPage;
