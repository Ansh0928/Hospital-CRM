
import PageHeader from "@/components/ui/PageHeader";

const dummyEMR = [
  {
    patient: 'John Doe',
    date: '2025-04-15',
    prescription: 'Lisinopril 10mg daily',
    diagnosis: 'Hypertension',
    plan: 'Continue medication, monitor blood pressure',
  },
  {
    patient: 'Jane Smith',
    date: '2025-04-18',
    prescription: 'Amoxicillin 500mg TID',
    diagnosis: 'Bacterial infection',
    plan: 'Complete antibiotic course, follow-up in 2 weeks',
  },
];

const EMRPage = () => (
  <div>
    <PageHeader title="Electronic Medical Records (EMR)" subtitle="Manage digital prescriptions, treatments, and diagnostics." />
    <div className="bg-white rounded-lg p-6 shadow">
      <table className="w-full text-left rounded">
        <thead>
          <tr>
            <th className="py-2 px-4">Patient</th>
            <th className="py-2 px-4">Date</th>
            <th className="py-2 px-4">Diagnosis</th>
            <th className="py-2 px-4">Prescription</th>
            <th className="py-2 px-4">Plan</th>
          </tr>
        </thead>
        <tbody>
          {dummyEMR.map((item, idx) => (
            <tr key={idx} className="border-t">
              <td className="py-2 px-4">{item.patient}</td>
              <td className="py-2 px-4">{item.date}</td>
              <td className="py-2 px-4">{item.diagnosis}</td>
              <td className="py-2 px-4">{item.prescription}</td>
              <td className="py-2 px-4">{item.plan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default EMRPage;
