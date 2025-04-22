
import PageHeader from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AddMedicineModal from "@/components/AddMedicineModal";
import { useState } from "react";

const initialMedicines = [
  { id: "MED001", name: "Amoxicillin", stock: 150, status: "In Stock", dosage: "500mg", supplier: "MedSupply Inc." },
  { id: "MED002", name: "Lisinopril", stock: 0, status: "Out of Stock", dosage: "10mg", supplier: "PharmaDirect" },
  { id: "MED003", name: "Metformin", stock: 75, status: "In Stock", dosage: "850mg", supplier: "HealthMeds" }
];
const dummyPrescriptions = [
  { id: 1, patient: "John Doe", medicine: "Amoxicillin", dosage: "500mg", date: "2025-04-16", status: "Dispensed" },
  { id: 2, patient: "Jane Smith", medicine: "Lisinopril", dosage: "10mg", date: "2025-04-19", status: "Pending" }
];

export default function PharmacyPage() {
  const [medicines, setMedicines] = useState(initialMedicines);

  const handleAddMedicine = (data: any) => {
    setMedicines([
      ...medicines,
      {
        id: `MED${(medicines.length + 1).toString().padStart(3, "0")}`,
        name: data.name,
        dosage: data.dosage,
        stock: data.stock,
        status: data.stock > 0 ? "In Stock" : "Out of Stock",
        supplier: data.supplier
      }
    ]);
  };

  return (
    <div>
      <PageHeader title="Pharmacy & Medicine Management" subtitle="Medicine inventory, billing, and prescription integration." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-wrap mb-4">
        <div className="bg-white rounded-lg p-6 shadow flex-1 min-w-[320px]">
          <span className="font-semibold text-lg mb-4 block">Medicine Inventory</span>
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-separate rounded-lg min-w-[520px]">
              <thead>
                <tr>
                  <th className="py-3 px-4 bg-gray-50">Name</th>
                  <th className="py-3 px-4 bg-gray-50">Dosage</th>
                  <th className="py-3 px-4 bg-gray-50">Stock</th>
                  <th className="py-3 px-4 bg-gray-50">Status</th>
                  <th className="py-3 px-4 bg-gray-50">Supplier</th>
                </tr>
              </thead>
              <tbody>
                {medicines.map((med) => (
                  <tr key={med.id} className="border-t hover:bg-gray-50 transition">
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
          <div className="mt-4">
            <AddMedicineModal onAdd={handleAddMedicine} />
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow flex-1 min-w-[320px]">
          <span className="font-semibold text-lg mb-4 block">Recent Prescriptions</span>
          <ul className="space-y-3">
            {dummyPrescriptions.map((rx) => (
              <li key={rx.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border">
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
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Billing Summary</h3>
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
              <span>Total Dispensed: <b>{dummyPrescriptions.filter(r => r.status === "Dispensed").length}</b></span>
              <span>Pending: <b>{dummyPrescriptions.filter(r => r.status !== "Dispensed").length}</b></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
