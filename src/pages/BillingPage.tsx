
import PageHeader from "@/components/ui/PageHeader";

const dummyBills = [
  { id: 'INV001', patient: 'John Doe', amount: "$470", status: "Paid", date: "2025-04-16" },
  { id: 'INV002', patient: 'Jane Smith', amount: "$310", status: "Pending", date: "2025-04-19" }
];

const BillingPage = () => (
  <div>
    <PageHeader title="Billing & Payment" subtitle="Automated invoices and insurance claim tracking." />
    <div className="bg-white rounded-lg p-6 shadow">
      <table className="w-full text-left rounded">
        <thead>
          <tr>
            <th className="py-2 px-4">Invoice ID</th>
            <th className="py-2 px-4">Patient</th>
            <th className="py-2 px-4">Amount</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Date</th>
          </tr>
        </thead>
        <tbody>
          {dummyBills.map((bill) => (
            <tr key={bill.id} className="border-t">
              <td className="py-2 px-4">{bill.id}</td>
              <td className="py-2 px-4">{bill.patient}</td>
              <td className="py-2 px-4">{bill.amount}</td>
              <td className="py-2 px-4">{bill.status}</td>
              <td className="py-2 px-4">{bill.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default BillingPage;
