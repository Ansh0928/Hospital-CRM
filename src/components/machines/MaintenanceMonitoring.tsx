
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, PieChart, Pie, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface MaintenanceData {
  name: string;
  events: number;
  hours: number;
  downtime: number;
}

interface MaintenanceMonitoringProps {
  maintenanceData: MaintenanceData[];
}

const MaintenanceMonitoring: React.FC<MaintenanceMonitoringProps> = ({ maintenanceData }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Maintenance Phase Monitoring</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Maintenance Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={maintenanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="events" name="Maintenance Events" fill="#3b82f6" />
                  <Bar dataKey="hours" name="Maintenance Hours" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Downtime Percentage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex flex-col">
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={maintenanceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="downtime"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {maintenanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index % 4]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center mt-4">
                <p className="text-sm text-gray-500">Average Downtime: 4.1%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MaintenanceMonitoring;