
import PageHeader from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const dummyMedicines = [
  { id: "MED001", name: "Amoxicillin", stock: 150, status: "In Stock", dosage: "500mg", supplier: "MedSupply Inc." },
  { id: "MED002", name: "Lisinopril", stock: 0, status: "Out of Stock", dosage: "10mg", supplier: "PharmaDirect" }
];
const dummyPrescriptions = [
  { id: 1, patient: "John Doe", medicine: "Amoxicillin", dosage: "500mg", date: "2025-04-16", status: "Dispensed" },
  { id: 2, patient: "Jane Smith", medicine: "Lisinopril", dosage: "10mg", date: "2025-04-19", status: "Pending" }
];

const PharmacyPage = () => (
  <div>
    <PageHeader title="Pharmacy & Medicine Management" subtitle="Medicine inventory, billing, and prescription integration." />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg p-6 shadow">
        <span className="font-semibold text-lg mb-4 block">Medicine Inventory</span>
        <table className="w-full text-left rounded">
          <thead>
            <tr>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Dosage</th>
              <th className="py-2 px-4">Stock</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Supplier</th>
            </tr>
          </thead>
          <tbody>
            {dummyMedicines.map((med) => (
              <tr key={med.id} className="border-t">
                <td className="py-2 px-4">{med.name}</td>
                <td className="py-2 px-4">{med.dosage}</td>
                <td className="py-2 px-4">{med.stock}</td>
                <td className="py-2 px-4">
                  <Badge variant={med.status === "In Stock" ? "default" : "secondary"}>
                    {med.status}
                  </Badge>
                </td>
                <td className="py-2 px-4">{med.supplier}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-white rounded-lg p-6 shadow">
        <span className="font-semibold text-lg mb-4 block">Recent Prescriptions</span>
        <ul className="space-y-3">
          {dummyPrescriptions.map((rx) => (
            <li key={rx.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <div>
                <span className="font-medium">{rx.patient}</span>{" "}
                <span className="ml-2 text-gray-500 text-xs">{rx.medicine} {rx.dosage}</span>
                <div className="text-xs text-gray-400">Date: {rx.date}</div>
              </div>
              <Badge variant={rx.status === "Dispensed" ? "default" : "secondary"}>{rx.status}</Badge>
            </li>
          ))}
        </ul>
        <Button className="w-full mt-4">Add Prescription</Button>
      </div>
    </div>
  </div>
);
export default PharmacyPage;
