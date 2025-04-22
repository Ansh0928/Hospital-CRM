
import PageHeader from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

const EMRPage = () => (
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
        <button className="px-4 py-2 border-b-2 border-medical-primary font-semibold text-medical-primary bg-white">Summary</button>
        <button className="px-4 py-2 text-gray-500">Visits</button>
        <button className="px-4 py-2 text-gray-500">Prescriptions</button>
        <button className="px-4 py-2 text-gray-500">Lab Results</button>
        <button className="px-4 py-2 text-gray-500">Documents</button>
      </nav>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-5 rounded">
          <span className="font-semibold text-lg mb-2 block">Patient Information</span>
          <div className="grid grid-cols-2 gap-y-1 text-sm">
            <div>Age: <b>{dummyEMR[0].age} years</b></div>
            <div>Gender: <b>{dummyEMR[0].gender}</b></div>
            <div>Blood Type: <b>{dummyEMR[0].bloodType}</b></div>
            <div>Patient ID: <b>{dummyEMR[0].id}</b></div>
          </div>
        </div>
        <div className="bg-gray-50 p-5 rounded">
          <span className="font-semibold text-lg mb-2 block">Health Alerts</span>
          <div>
            <strong>Allergies:</strong>
            {dummyEMR[0].allergies.map((a, i) => (
              <Badge key={i} variant="secondary" className="ml-2">{a}</Badge>
            ))}
          </div>
          <div className="mt-2">
            <strong>Chronic Conditions:</strong>
            {dummyEMR[0].chronic.map((c, i) => (
              <Badge key={i} className="ml-2 bg-yellow-100 text-yellow-700">{c}</Badge>
            ))}
          </div>
        </div>
      </div>
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
export default EMRPage;
