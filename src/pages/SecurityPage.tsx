
import PageHeader from "@/components/ui/PageHeader";

const dummyCompliance = [
  { name: "HIPAA", status: "Compliant", color: "text-green-600" },
  { name: "GDPR", status: "Compliant", color: "text-green-600" }
];

const dummySettings = [
  { name: "Two-Factor Auth", enabled: true },
  { name: "Role-based Access", enabled: true }
];

const SecurityPage = () => (
  <div>
    <PageHeader title="Security & Data Privacy" subtitle="Compliance and secure access management UI." />
    <div className="bg-white rounded-lg p-6 shadow flex flex-col md:flex-row gap-6">
      <div className="md:w-1/2">
        <h2 className="font-semibold mb-2">Compliance Status</h2>
        <ul>
          {dummyCompliance.map((rule) => (
            <li key={rule.name} className="flex items-center gap-2 mb-2">
              <span>{rule.name}:</span>
              <span className={`${rule.color} font-bold`}>{rule.status}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="md:w-1/2">
        <h2 className="font-semibold mb-2">Security Settings</h2>
        <ul>
          {dummySettings.map((setting) => (
            <li key={setting.name} className="mb-2 flex items-center gap-2">
              <span>{setting.name}:</span>
              <span className="font-bold">{setting.enabled ? "Enabled" : "Disabled"}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export default SecurityPage;
