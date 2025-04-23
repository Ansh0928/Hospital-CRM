
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface UsageTrackingProps {
  machineUsageData: Array<{
    name: string;
    active: number;
    idle: number;
    maintenance: number;
  }>;
}

const UsageTracking: React.FC<UsageTrackingProps> = ({ machineUsageData }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Machine Usage & Performance Tracking</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Machine Working Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={machineUsageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="active" stackId="a" name="Active Hours" fill="#3b82f6" />
                  <Bar dataKey="idle" stackId="a" name="Idle Hours" fill="#93c5fd" />
                  <Bar dataKey="maintenance" stackId="a" name="Maintenance" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Machine ON/OFF Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={machineUsageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="active" 
                    name="Run Time (hours)" 
                    stroke="#3b82f6" 
                    strokeWidth={2} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="idle" 
                    name="Idle Time (hours)" 
                    stroke="#93c5fd" 
                    strokeWidth={2} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UsageTracking;