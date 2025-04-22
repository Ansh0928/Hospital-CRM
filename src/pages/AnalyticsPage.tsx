
import PageHeader from "@/components/ui/PageHeader";

const dummyAnalytics = [
  { month: "April", patients: 220, trends: "Hypertension ↑" },
  { month: "March", patients: 210, trends: "Diabetes →" }
];

const AnalyticsPage = () => (
  <div>
    <PageHeader title="Reports & Analytics" subtitle="Monthly statistics and disease trend analysis." />
    <div className="bg-white rounded-lg p-6 shadow">
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
