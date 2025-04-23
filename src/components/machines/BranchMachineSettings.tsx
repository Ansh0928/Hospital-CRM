import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Play, Pause, AlertCircle, Clock, ChevronDown } from "lucide-react";
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
}

interface Branch {
  id: string;
  name: string;
  machines: MachineStatus[];
}

const branchData: Branch[] = [
  {
    id: "pune-001",
    name: "Pune 001",
    machines: [
      {
        id: "mri-001",
        name: "MRI Scanner",
        status: "active",
        runtime: 156,
        downtime: 12,
        lastUpdated: "2024-04-23T10:00:00",
      },
      {
        id: "ct-001",
        name: "CT Scanner",
        status: "maintenance",
        runtime: 98,
        downtime: 24,
        lastUpdated: "2024-04-23T09:30:00",
      },
    ],
  },
  {
    id: "pune-002",
    name: "Pune 002",
    machines: [
      {
        id: "mri-002",
        name: "MRI Scanner",
        status: "active",
        runtime: 145,
        downtime: 8,
        lastUpdated: "2024-04-23T10:15:00",
      },
    ],
  },
  {
    id: "mumbai-001",
    name: "Mumbai 001",
    machines: [
      {
        id: "ct-002",
        name: "CT Scanner",
        status: "inactive",
        runtime: 78,
        downtime: 36,
        lastUpdated: "2024-04-23T08:45:00",
      },
    ],
  },
];

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

const BranchMachineSettings = () => {
  const [selectedBranch, setSelectedBranch] = useState(branchData[0].id);

  const currentBranch = branchData.find(branch => branch.id === selectedBranch);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Branch Machine Settings</h2>
        <Select value={selectedBranch} onValueChange={setSelectedBranch}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select branch" />
          </SelectTrigger>
          <SelectContent>
            {branchData.map((branch) => (
              <SelectItem key={branch.id} value={branch.id}>
                {branch.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {currentBranch && (
        <Card key={currentBranch.id} className="shadow-md">
          <CardHeader>
            <CardTitle>{currentBranch.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Machine</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Runtime (hrs)</TableHead>
                  <TableHead>Downtime (hrs)</TableHead>
                  <TableHead>Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentBranch.machines.map((machine) => (
                  <TableRow key={machine.id}>
                    <TableCell className="font-medium">{machine.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(machine.status)}
                        <span className="capitalize">{machine.status}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-500" />
                        {machine.runtime}
                      </div>
                    </TableCell>
                    <TableCell className="text-red-500">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {machine.downtime}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-500">
                      {new Date(machine.lastUpdated).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BranchMachineSettings;