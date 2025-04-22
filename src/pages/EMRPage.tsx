
import PageHeader from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const dummyEMR = [
  {
    patient: 'James Wilson',
    dob: '1980-05-15',
    gender: 'Male',
    id: 'P-1234',
    age: 43,
    bloodType: 'O+',
    allergies: ['Penicillin', 'Sulfa drugs'],
    chronic: ['Hypertension', 'Type 2 Diabetes'],
    recent: [
      {
        doctor: 'Dr. Sarah Johnson',
        date: '2023-04-15',
        diagnosis: 'Unstable angina',
        notes: 'Chest pain and shortness of breath',
        department: 'Cardiology'
      },
      {
        doctor: 'Dr. Sarah Johnson',
        date: '2023-05-20',
        diagnosis: 'Coronary artery disease',
        notes: 'Follow-up for unstable angina',
        department: 'Cardiology'
      }
    ]
  }
];

const dummyMedications = [
  { prescribedId: "RI24014", medication: "Zerodel SP", start: "22/07/2024", end: "23/07/2024", instructions: "-" },
  { prescribedId: "RI24015", medication: "Atorvastatin", start: "15/03/2024", end: "15/04/2024", instructions: "Take after food" },
];

export default function EMRPage() {
  const [tab, setTab] = useState<"medications" | "medical" | "dental" | "family" | "social">("medications");

  return (
    <div>
      <PageHeader title="Electronic Medical Records (EMR)" subtitle="Manage digital prescriptions, treatments, and diagnostics." />
      <div className="bg-white rounded-lg p-6 shadow mb-8">
        <div className="flex items-center gap-5 mb-6">
          <div className="w-20 h-20 rounded-full bg-medical-blue flex items-center justify-center text-3xl font-bold text-medical-dark">
            JW
          </div>
          <div>
            <div className="font-bold text-xl">{dummyEMR[0].patient}</div>
            <div className="text-gray-600 text-sm">
              {dummyEMR[0].age} yrs, {dummyEMR[0].gender} • DOB: {dummyEMR[0].dob} • <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">{dummyEMR[0].id}</span>
            </div>
          </div>
          <div className="ml-auto flex gap-2">
            <Button variant="outline">Print Record</Button>
            <Button variant="outline">Export</Button>
            <Button>Add Record</Button>
          </div>
        </div>
        <nav className="flex space-x-8 border-b mb-4">
          {[
            { key: "medications", label: "Medications" },
            { key: "medical", label: "Medical History" },
            { key: "dental", label: "Dental History" },
            { key: "family", label: "Family History" },
            { key: "social", label: "Social History" }
          ].map(({ key, label }) => (
            <button
              key={key}
              className={`px-4 py-2 border-b-2 ${tab === key ? "border-medical-primary font-semibold text-medical-primary bg-white" : "text-gray-500"}`}
              onClick={() => setTab(key as any)}
            >
              {label}
            </button>
          ))}
        </nav>
        {tab === "medications" && (
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left border-separate min-w-[700px]">
              <thead>
                <tr>
                  <th className="py-3 px-4 bg-gray-50">Prescribed Item ID</th>
                  <th className="py-3 px-4 bg-gray-50">Medication</th>
                  <th className="py-3 px-4 bg-gray-50">Period Start</th>
                  <th className="py-3 px-4 bg-gray-50">Period End</th>
                  <th className="py-3 px-4 bg-gray-50">Additional Instructions</th>
                </tr>
              </thead>
              <tbody>
                {dummyMedications.map((rec, idx) => (
                  <tr key={idx} className="border-t hover:bg-gray-50 transition">
                    <td className="py-2 px-4 text-medical-primary underline cursor-pointer">{rec.prescribedId}</td>
                    <td className="py-2 px-4">{rec.medication}</td>
                    <td className="py-2 px-4">{rec.start}</td>
                    <td className="py-2 px-4">{rec.end}</td>
                    <td className="py-2 px-4">{rec.instructions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {tab !== "medications" && (
          <div className="p-5 text-gray-500">No records for this tab yet.</div>
        )}
      </div>
      <div className="bg-white rounded-lg p-6 shadow">
        <span className="font-semibold mb-4 block text-lg">Recent Activity</span>
        <ul className="space-y-4">
          {dummyEMR[0].recent.map((item, idx) => (
            <li key={idx} className="p-4 bg-gray-50 rounded flex justify-between items-center">
              <div>
                <span className="font-medium">{item.doctor}</span> <span className="text-gray-500 text-xs">{item.date}</span>
                <div className="font-semibold">{item.diagnosis}</div>
                <div className="text-gray-500 text-sm">{item.notes}</div>
              </div>
              <Badge variant="secondary">{item.department}</Badge>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
