
import PageHeader from "@/components/ui/PageHeader";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const dummyAnalytics = [
  { month: "January", patients: 185, trends: "Diabetes ↑" },
  { month: "February", patients: 200, trends: "Flu →" },
  { month: "March", patients: 210, trends: "Diabetes →" },
  { month: "April", patients: 220, trends: "Hypertension ↑" }
];

const barData = [
  { name: "Jan", value: 100 },
  { name: "Feb", value: 140 },
  { name: "Mar", value: 160 },
  { name: "Apr", value: 220 }
];

const AnalyticsPage = () => (
  <div>
    <PageHeader title="Reports & Analytics" subtitle="Monthly statistics and disease trend analysis." />
    <div className="mb-6 bg-white rounded-lg p-6 shadow">
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#2C7BE5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    <div className="bg-white rounded-lg p-6 shadow">
      <h2 className="font-semibold mb-4 text-lg">Monthly Patient Statistics</h2>
      <table className="w-full text-left rounded">
        <thead>
          <tr>
            <th className="py-2 px-4">Month</th>
            <th className="py-2 px-4"># Patients</th>
            <th className="py-2 px-4">Top Trend</th>
          </tr>
        </thead>
        <tbody>
          {dummyAnalytics.map((row) => (
            <tr key={row.month} className="border-t">
              <td className="py-2 px-4">{row.month}</td>
              <td className="py-2 px-4">{row.patients}</td>
              <td className="py-2 px-4">{row.trends}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
export default AnalyticsPage;
