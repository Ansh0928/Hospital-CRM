
import PageHeader from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

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
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Audit Logs</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>2025-04-22: Admin login from new device - IP 192.168.1.22</li>
            <li>2025-04-20: Password changed for Dr. Smith</li>
            <li>2025-04-18: Lab report uploaded by Lab Technician</li>
          </ul>
        </div>
      </div>
      <div className="md:w-1/2">
        <h2 className="font-semibold mb-2">Security Settings</h2>
        <ul>
          {dummySettings.map((setting) => (
            <li key={setting.name} className="mb-2 flex items-center gap-2">
              <span>{setting.name}:</span>
              <Switch checked={setting.enabled} />
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Data Privacy</h3>
          <p className="text-gray-600 text-sm">
            Your data is encrypted according to best practices, maintained for HIPAA & GDPR compliance, and access is strictly controlled.
          </p>
        </div>
      </div>
    </div>
  </div>
);
export default SecurityPage;
