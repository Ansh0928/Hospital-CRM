// import React, { useState } from 'react';
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Play, Pause, AlertCircle, Clock, ChevronDown } from "lucide-react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// interface MachineStatus {
//   id: string;
//   name: string;
//   status: 'active' | 'inactive' | 'maintenance';
//   runtime: number;
//   downtime: number;
//   lastUpdated: string;
// }

// interface Branch {
//   id: string;
//   name: string;
//   machines: MachineStatus[];
// }

// const branchData: Branch[] = [
//   {
//     id: "pune-001",
//     name: "Pune 001",
//     machines: [
//       {
//         id: "mri-001",
//         name: "MRI Scanner",
//         status: "active",
//         runtime: 156,
//         downtime: 12,
//         lastUpdated: "2024-04-23T10:00:00",
//       },
//       {
//         id: "ct-001",
//         name: "CT Scanner",
//         status: "maintenance",
//         runtime: 98,
//         downtime: 24,
//         lastUpdated: "2024-04-23T09:30:00",
//       },
//     ],
//   },
//   {
//     id: "pune-002",
//     name: "Pune 002",
//     machines: [
//       {
//         id: "mri-002",
//         name: "MRI Scanner",
//         status: "active",
//         runtime: 145,
//         downtime: 8,
//         lastUpdated: "2024-04-23T10:15:00",
//       },
//     ],
//   },
//   {
//     id: "mumbai-001",
//     name: "Mumbai 001",
//     machines: [
//       {
//         id: "ct-002",
//         name: "CT Scanner",
//         status: "inactive",
//         runtime: 78,
//         downtime: 36,
//         lastUpdated: "2024-04-23T08:45:00",
//       },
//     ],
//   },
// ];

// const getStatusIcon = (status: string) => {
//   switch (status) {
//     case 'active':
//       return <Play className="h-4 w-4 text-green-500" />;
//     case 'inactive':
//       return <Pause className="h-4 w-4 text-gray-500" />;
//     case 'maintenance':
//       return <AlertCircle className="h-4 w-4 text-amber-500" />;
//     default:
//       return null;
//   }
// };

// const BranchMachineSettings = () => {
//   const [selectedBranch, setSelectedBranch] = useState(branchData[0].id);

//   const currentBranch = branchData.find(branch => branch.id === selectedBranch);

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold">Branch Machine Settings</h2>
//         <Select value={selectedBranch} onValueChange={setSelectedBranch}>
//           <SelectTrigger className="w-[200px]">
//             <SelectValue placeholder="Select branch" />
//           </SelectTrigger>
//           <SelectContent>
//             {branchData.map((branch) => (
//               <SelectItem key={branch.id} value={branch.id}>
//                 {branch.name}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>
      
//       {currentBranch && (
//         <Card key={currentBranch.id} className="shadow-md">
//           <CardHeader>
//             <CardTitle>{currentBranch.name}</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Machine</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Runtime (mins)</TableHead>
//                   <TableHead>Downtime (mins)</TableHead>
//                   <TableHead>Last Updated</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {currentBranch.machines.map((machine) => (
//                   <TableRow key={machine.id}>
//                     <TableCell className="font-medium">{machine.name}</TableCell>
//                     <TableCell>
//                       <div className="flex items-center gap-2">
//                         {getStatusIcon(machine.status)}
//                         <span className="capitalize">{machine.status}</span>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <div className="flex items-center gap-2">
//                         <Clock className="h-4 w-4 text-blue-500" />
//                         {machine.runtime}
//                       </div>
//                     </TableCell>
//                     <TableCell className="text-red-500">
//                       <div className="flex items-center gap-2">
//                         <Clock className="h-4 w-4" />
//                         {machine.downtime}
//                       </div>
//                     </TableCell>
//                     <TableCell className="text-gray-500">
//                       {new Date(machine.lastUpdated).toLocaleString()}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// };

// export default BranchMachineSettings;

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Play, 
  Pause, 
  AlertCircle, 
  Clock, 
  Power, 
  Settings, 
  Save,
  RotateCcw,
  MapPin
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MachineStatus {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'maintenance';
  runtime: number;
  downtime: number;
  lastUpdated: string;
  zone: string;
  autoRestart: boolean;
  maintenanceSchedule: string;
}

interface Branch {
  id: string;
  name: string;
  city: string;
  machines: MachineStatus[];
}

interface ZoneSettings {
  [key: string]: {
    autoMaintenance: boolean;
    operatingHours: string;
    emergencyShutdown: boolean;
  };
}

const initialBranchData: Branch[] = [
  {
    id: "pune-001",
    name: "Pune 001",
    city: "Pune",
    machines: [
      {
        id: "mri-001",
        name: "MRI Scanner",
        status: "active",
        runtime: 156,
        downtime: 12,
        lastUpdated: "2024-04-23T10:00:00",
        zone: "Zone A",
        autoRestart: true,
        maintenanceSchedule: "Weekly"
      },
      {
        id: "ct-001",
        name: "CT Scanner",
        status: "maintenance",
        runtime: 98,
        downtime: 24,
        lastUpdated: "2024-04-23T09:30:00",
        zone: "Zone A",
        autoRestart: false,
        maintenanceSchedule: "Bi-weekly"
      },
    ],
  },
  {
    id: "pune-002",
    name: "Pune 002",
    city: "Pune",
    machines: [
      {
        id: "mri-002",
        name: "MRI Scanner",
        status: "active",
        runtime: 145,
        downtime: 8,
        lastUpdated: "2024-04-23T10:15:00",
        zone: "Zone B",
        autoRestart: true,
        maintenanceSchedule: "Weekly"
      },
    ],
  },
  {
    id: "mumbai-001",
    name: "Mumbai 001",
    city: "Mumbai",
    machines: [
      {
        id: "ct-002",
        name: "CT Scanner",
        status: "inactive",
        runtime: 78,
        downtime: 36,
        lastUpdated: "2024-04-23T08:45:00",
        zone: "Zone C",
        autoRestart: false,
        maintenanceSchedule: "Monthly"
      },
    ],
  },
];

const initialZoneSettings: ZoneSettings = {
  "Zone A": {
    autoMaintenance: true,
    operatingHours: "24/7",
    emergencyShutdown: false
  },
  "Zone B": {
    autoMaintenance: false,
    operatingHours: "8AM-8PM",
    emergencyShutdown: false
  },
  "Zone C": {
    autoMaintenance: true,
    operatingHours: "6AM-10PM",
    emergencyShutdown: false
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'active':
      return <Play className="h-4 w-4 text-green-500" />;
    case 'inactive':
      return <Pause className="h-4 w-4 text-gray-500" />;
    case 'maintenance':
      return <AlertCircle className="h-4 w-4 text-amber-500" />;
    default:
      return null;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'text-green-600 bg-green-50';
    case 'inactive':
      return 'text-gray-600 bg-gray-50';
    case 'maintenance':
      return 'text-amber-600 bg-amber-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
};

const BranchMachineControl = () => {
  const [branchData, setBranchData] = useState(initialBranchData);
  const [zoneSettings, setZoneSettings] = useState(initialZoneSettings);
  const [selectedBranch, setSelectedBranch] = useState(branchData[0].id);
  const [selectedZone, setSelectedZone] = useState("all");
  const [showZoneSettings, setShowZoneSettings] = useState(false);

  const currentBranch = branchData.find(branch => branch.id === selectedBranch);
  
  // Get unique zones from current branch
  const zones = currentBranch ? [...new Set(currentBranch.machines.map(m => m.zone))] : [];
  
  // Filter machines by zone
  const filteredMachines = currentBranch?.machines.filter(machine => 
    selectedZone === "all" || machine.zone === selectedZone
  ) || [];

  const updateMachineStatus = (machineId: string, newStatus: 'active' | 'inactive' | 'maintenance') => {
    setBranchData(prevData => 
      prevData.map(branch => 
        branch.id === selectedBranch 
          ? {
              ...branch,
              machines: branch.machines.map(machine => 
                machine.id === machineId 
                  ? { 
                      ...machine, 
                      status: newStatus,
                      lastUpdated: new Date().toISOString()
                    }
                  : machine
              )
            }
          : branch
      )
    );
  };

  const bulkZoneControl = (zone: string, action: 'start' | 'stop' | 'maintenance') => {
    const statusMap = {
      'start': 'active' as const,
      'stop': 'inactive' as const,
      'maintenance': 'maintenance' as const
    };
    
    setBranchData(prevData =>
      prevData.map(branch =>
        branch.id === selectedBranch
          ? {
              ...branch,
              machines: branch.machines.map(machine =>
                machine.zone === zone
                  ? {
                      ...machine,
                      status: statusMap[action],
                      lastUpdated: new Date().toISOString()
                    }
                  : machine
              )
            }
          : branch
      )
    );
  };

  const updateZoneSettings = (zone: string, setting: string, value: any) => {
    setZoneSettings(prev => ({
      ...prev,
      [zone]: {
        ...prev[zone],
        [setting]: value
      }
    }));
  };

  const StatusButton = ({ status, onClick, disabled = false }: any) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
        disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'hover:opacity-80 cursor-pointer'
      } ${getStatusColor(status)}`}
    >
      <div className="flex items-center gap-1">
        {getStatusIcon(status)}
        <span className="capitalize">{status}</span>
      </div>
    </button>
  );

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      {/* Header Controls */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Machine Control Center</h2>
        <div className="flex gap-4">
          <Select value={selectedBranch} onValueChange={setSelectedBranch}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select branch" />
            </SelectTrigger>
            <SelectContent>
              {branchData.map((branch) => (
                <SelectItem key={branch.id} value={branch.id}>
                  {branch.name} - {branch.city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedZone} onValueChange={setSelectedZone}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="All Zones" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Zones</SelectItem>
              {zones.map((zone) => (
                <SelectItem key={zone} value={zone}>
                  {zone}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <button
            onClick={() => setShowZoneSettings(!showZoneSettings)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            Zone Settings
          </button>
        </div>
      </div>

      {/* Zone Control Panel */}
      {selectedZone !== "all" && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <MapPin className="h-5 w-5" />
              {selectedZone} Control Panel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <button
                onClick={() => bulkZoneControl(selectedZone, 'start')}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                <Play className="h-4 w-4" />
                Start All
              </button>
              <button
                onClick={() => bulkZoneControl(selectedZone, 'stop')}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
              >
                <Pause className="h-4 w-4" />
                Stop All
              </button>
              <button
                onClick={() => bulkZoneControl(selectedZone, 'maintenance')}
                className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors flex items-center gap-2"
              >
                <AlertCircle className="h-4 w-4" />
                Maintenance Mode
              </button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Zone Settings Panel */}
      {showZoneSettings && (
        <Card>
          <CardHeader>
            <CardTitle>Zone Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {zones.map(zone => (
                <div key={zone} className="border rounded-lg p-4 space-y-4">
                  <h4 className="font-semibold text-lg">{zone}</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Auto Maintenance</label>
                      <input
                        type="checkbox"
                        checked={zoneSettings[zone]?.autoMaintenance || false}
                        onChange={(e) => updateZoneSettings(zone, 'autoMaintenance', e.target.checked)}
                        className="w-4 h-4"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium block mb-1">Operating Hours</label>
                      <Select 
                        value={zoneSettings[zone]?.operatingHours || "24/7"}
                        onValueChange={(value) => updateZoneSettings(zone, 'operatingHours', value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="24/7">24/7</SelectItem>
                          <SelectItem value="8AM-8PM">8AM - 8PM</SelectItem>
                          <SelectItem value="6AM-10PM">6AM - 10PM</SelectItem>
                          <SelectItem value="9AM-5PM">9AM - 5PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Emergency Shutdown</label>
                      <input
                        type="checkbox"
                        checked={zoneSettings[zone]?.emergencyShutdown || false}
                        onChange={(e) => updateZoneSettings(zone, 'emergencyShutdown', e.target.checked)}
                        className="w-4 h-4"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Machine Table */}
      {currentBranch && (
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{currentBranch.name}</span>
              <span className="text-sm font-normal text-gray-500">
                {filteredMachines.length} machine(s) {selectedZone !== "all" && `in ${selectedZone}`}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Machine</th>
                    <th className="text-left p-3 font-medium">Zone</th>
                    <th className="text-left p-3 font-medium">Status</th>
                    <th className="text-left p-3 font-medium">Runtime</th>
                    <th className="text-left p-3 font-medium">Downtime</th>
                    <th className="text-left p-3 font-medium">Auto Restart</th>
                    <th className="text-left p-3 font-medium">Actions</th>
                    <th className="text-left p-3 font-medium">Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMachines.map((machine) => (
                    <tr key={machine.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium">{machine.name}</td>
                      <td className="p-3">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          {machine.zone}
                        </span>
                      </td>
                      <td className="p-3">
                        <StatusButton status={machine.status} disabled />
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-blue-500" />
                          {machine.runtime} mins
                        </div>
                      </td>
                      <td className="p-3 text-red-500">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {machine.downtime} mins
                        </div>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          machine.autoRestart ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {machine.autoRestart ? 'Enabled' : 'Disabled'}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-1">
                          <button
                            onClick={() => updateMachineStatus(machine.id, 'active')}
                            disabled={machine.status === 'active'}
                            className="p-1 text-green-600 hover:bg-green-50 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Start"
                          >
                            <Play className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => updateMachineStatus(machine.id, 'inactive')}
                            disabled={machine.status === 'inactive'}
                            className="p-1 text-gray-600 hover:bg-gray-50 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Stop"
                          >
                            <Pause className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => updateMachineStatus(machine.id, 'maintenance')}
                            disabled={machine.status === 'maintenance'}
                            className="p-1 text-amber-600 hover:bg-amber-50 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Maintenance"
                          >
                            <AlertCircle className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                      <td className="p-3 text-gray-500 text-sm">
                        {new Date(machine.lastUpdated).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BranchMachineControl;