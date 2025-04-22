
import PageHeader from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const dummyBills = [
  { id: 'INV001', patient: 'John Doe', amount: "$470", status: "Paid", date: "2025-04-16", insurance: "Aetna" },
  { id: 'INV002', patient: 'Jane Smith', amount: "$310", status: "Pending", date: "2025-04-19", insurance: "BlueCross" }
];

const BillingPage = () => (
  <div>
    <PageHeader title="Billing & Payment" subtitle="Automated invoices and insurance claim tracking." />
    <div className="bg-white rounded-lg p-6 shadow">
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-semibold">Recent Invoices</span>
        <Button size="sm">Add Invoice</Button>
      </div>
      <table className="w-full text-left rounded">
        <thead>
          <tr>
            <th className="py-2 px-4">Invoice ID</th>
            <th className="py-2 px-4">Patient</th>
            <th className="py-2 px-4">Amount</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Insurance</th>
            <th className="py-2 px-4">Date</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dummyBills.map((bill) => (
            <tr key={bill.id} className="border-t">
              <td className="py-2 px-4">{bill.id}</td>
              <td className="py-2 px-4">{bill.patient}</td>
              <td className="py-2 px-4">{bill.amount}</td>
              <td className="py-2 px-4">
                <Badge variant={bill.status === "Paid" ? "default" : "secondary"}>{bill.status}</Badge>
              </td>
              <td className="py-2 px-4">{bill.insurance}</td>
              <td className="py-2 px-4">{bill.date}</td>
              <td className="py-2 px-4">
                <Button size="sm" variant="outline">View</Button>
                <Button size="sm" className="ml-2">Print</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Insurance Claims</h3>
        <ul className="space-y-2">
          <li className="p-3 bg-gray-100 rounded flex justify-between items-center">
            <div>
              Claim #CL-001 • Patient: John Doe • Submitted: 2025-04-16
            </div>
            <Badge variant="default">Processed</Badge>
          </li>
          <li className="p-3 bg-gray-100 rounded flex justify-between items-center">
            <div>
              Claim #CL-002 • Patient: Anshumaan Saraf • Submitted: 2025-04-19
            </div>
            <Badge variant="secondary">Pending</Badge>
          </li>
        </ul>
      </div>
    </div>
  </div>
);
export default BillingPage;
