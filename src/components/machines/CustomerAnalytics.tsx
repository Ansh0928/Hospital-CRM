
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, PieChart, Pie, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface CustomerUsageData {
  name: string;
  value: number;
  color: string;
}

interface CustomerAnalyticsProps {
  customerUsageData: CustomerUsageData[];
}

const CustomerAnalytics: React.FC<CustomerAnalyticsProps> = ({ customerUsageData }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Customer Usage Analytics</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Usage by Machine</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerUsageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {customerUsageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Peak Usage Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { time: '8-10 AM', visits: 45 },
                  { time: '10-12 PM', visits: 78 },
                  { time: '12-2 PM', visits: 53 },
                  { time: '2-4 PM', visits: 67 },
                  { time: '4-6 PM', visits: 82 },
                  { time: '6-8 PM', visits: 34 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="visits" name="Customer Visits" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerAnalytics;