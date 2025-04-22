
import React from 'react';
import { withAuth } from '@/contexts/AuthContext';
import PageHeader from '@/components/ui/PageHeader';
import StatsCard from '@/components/ui/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Receipt, FileText, Clock, ChartBar } from 'lucide-react';
import { labReports, patients } from '@/data/sampleData';
import { useAuth } from '@/contexts/AuthContext';

const LabDashboard: React.FC = () => {
  const { authState } = useAuth();
  
  // Filter the most recent lab reports for the dashboard
  const recentReports = [...labReports].sort((a, b) => {
    return new Date(b.reportDate).getTime() - new Date(a.reportDate).getTime();
  }).slice(0, 5);
  
  // Pending reports (this would be based on test date vs report date in a real app)
  const pendingReports = labReports.length;
  
  return (
    <>
      <PageHeader 
        title="Lab Dashboard" 
        subtitle={`Welcome, ${authState.user?.name}`}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard
          title="Reports Generated"
          value={labReports.length}
          icon={Receipt}
        />
        <StatsCard
          title="Tests Completed"
          value={labReports.length + 2} // Just for demo, normally this would be different
          icon={FileText}
        />
        <StatsCard
          title="Pending Reports"
          value={pendingReports}
          icon={Clock}
        />
        <StatsCard
          title="Monthly Tests"
          value={labReports.length + 8} // Just for demo
          icon={ChartBar}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Recent Lab Reports</CardTitle>
            <Button variant="outline" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            <table className="medical-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Test Type</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentReports.map((report) => {
                  const patient = patients.find(p => p.id === report.patientId);
                  return (
                    <tr key={report.id}>
                      <td className="font-medium">{patient?.name}</td>
                      <td>{report.testType}</td>
                      <td>{report.reportDate}</td>
                      <td>
                        <span className="status-active">Completed</span>
                      </td>
                      <td>
                        <Button size="sm">View</Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Waiting for Tests</CardTitle>
            <Button variant="outline" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {patients.slice(0, 3).map((patient) => (
                <div key={patient.id} className="flex items-center p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <p className="font-medium">{patient.name}</p>
                    <p className="text-sm text-gray-500">ID: {patient.uniqueId}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-blue-600">Complete Blood Count</p>
                    <Button size="sm" className="mt-2">Process</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Upload New Test Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Patient ID</label>
                <input
                  type="text"
                  placeholder="Enter patient ID"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-medical-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Test Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-medical-primary">
                  <option value="">Select test type</option>
                  <option value="cbc">Complete Blood Count</option>
                  <option value="lipid">Lipid Panel</option>
                  <option value="thyroid">Thyroid Function</option>
                  <option value="glucose">Blood Glucose</option>
                  <option value="urine">Urinalysis</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-medical-primary">
                  <option value="">Select referring doctor</option>
                  <option value="1">Dr. Sarah Johnson</option>
                  <option value="2">Dr. David Lee</option>
                  <option value="3">Dr. Maria Rodriguez</option>
                </select>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Test Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-medical-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Results</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Receipt className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-medical-primary hover:text-medical-primary/80"
                      >
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
                  </div>
                </div>
              </div>
              <Button className="w-full mt-4">Upload Results</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default withAuth(LabDashboard, ['lab']);
