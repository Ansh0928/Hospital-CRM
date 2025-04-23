import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import BranchMachineSettings from "../../components/machines/BranchMachineSettings";
import AutomatedTriggers from "../../components/machines/AutomatedTriggers";
import UsageTracking from "../../components/machines/UsageTracking";
import MaintenanceMonitoring from "../../components/machines/MaintenanceMonitoring";
import CustomerAnalytics from "../../components/machines/CustomerAnalytics";
import UtilizationRatio from "../../components/machines/UtilizationRatio";

const MachineManagement = () => {
  // Mock data for charts
  const machineUsageData = [
    { name: "Mon", active: 4, idle: 1, maintenance: 0.5 },
    { name: "Tue", active: 5, idle: 1.5, maintenance: 0 },
    { name: "Wed", active: 3, idle: 2, maintenance: 1 },
    { name: "Thu", active: 6, idle: 1, maintenance: 0 },
    { name: "Fri", active: 4.5, idle: 2, maintenance: 0.5 },
    { name: "Sat", active: 3, idle: 1, maintenance: 0 },
    { name: "Sun", active: 2, idle: 0.5, maintenance: 3.5 },
  ];

  const maintenanceData = [
    { name: "MRI Scanner", events: 3, hours: 8.5, downtime: 5.3 },
    { name: "CT Scanner", events: 2, hours: 5, downtime: 3.1 },
    { name: "X-Ray Machine", events: 4, hours: 10, downtime: 6.2 },
    { name: "Ultrasound", events: 1, hours: 3, downtime: 1.9 },
  ];

  const customerUsageData = [
    { name: "MRI Scanner", value: 145, color: "#0088FE" },
    { name: "CT Scanner", value: 210, color: "#00C49F" },
    { name: "X-Ray Machine", value: 320, color: "#FFBB28" },
    { name: "Ultrasound", value: 240, color: "#FF8042" },
  ];

  const utilizationRatioData = [
    { name: "MRI Scanner", hours: 145, customers: 62, ratio: 2.34 },
    { name: "CT Scanner", hours: 210, customers: 85, ratio: 2.47 },
    { name: "X-Ray Machine", hours: 320, customers: 156, ratio: 2.05 },
    { name: "Ultrasound", hours: 240, customers: 98, ratio: 2.45 },
  ];

  return (
    <DashboardLayout>
      <div>
        {/* Branch Machine Settings Section */}
        <div className="mb-8">
          <BranchMachineSettings />
        </div>

        {/* Automated Machine On/Off System */}
        <AutomatedTriggers />

        {/* Machine Usage & Performance Tracking */}
        <UsageTracking machineUsageData={machineUsageData} />

        {/* Maintenance Monitoring */}
        <MaintenanceMonitoring maintenanceData={maintenanceData} />

        {/* Customer Usage Analytics */}
        <CustomerAnalytics customerUsageData={customerUsageData} />

        {/* Utilization Ratio
        <UtilizationRatio utilizationRatioData={utilizationRatioData} /> */}
      </div>
    </DashboardLayout>
  );
};

export default MachineManagement;
