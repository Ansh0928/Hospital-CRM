
import React from 'react';
import { withAuth } from '@/contexts/AuthContext';
import PageHeader from '@/components/ui/PageHeader';
import StatsCard from '@/components/ui/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Calendar, Receipt, ChartBar, Pill, CreditCard } from 'lucide-react';
import { dashboardStats, patients, appointments } from '@/data/sampleData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const AdminDashboard: React.FC = () => {
  // Calculate active appointments for today
  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter(app => app.date === today);
  
  // Active and inactive patients
  const activePatients = patients.filter(p => p.status === 'active').length;
  const inactivePatients = patients.filter(p => p.status === 'inactive').length;
  
  return (
    <>
      <PageHeader 
        title="Admin Dashboard" 
        subtitle="Welcome to the VitaCare Medical System"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard
          title="Total Patients"
          value={dashboardStats.totalPatients}
          icon={User}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Appointments Today"
          value={dashboardStats.appointmentsToday}
          icon={Calendar}
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard
          title="Pending Lab Reports"
          value={dashboardStats.pendingLabReports}
          icon={Receipt}
          trend={{ value: 3, isPositive: false }}
        />
        <StatsCard
          title="Monthly Revenue"
          value={`$${dashboardStats.revenue.monthly.toLocaleString()}`}
          icon={CreditCard}
          trend={{ value: 8, isPositive: true }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Appointment Trends (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={dashboardStats.appointmentsTrend}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(date) => {
                      const d = new Date(date);
                      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    }} 
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value} appointments`, 'Count']}
                    labelFormatter={(date) => {
                      const d = new Date(date);
                      return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                    }}
                  />
                  <Line type="monotone" dataKey="count" stroke="#2C7BE5" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Patients by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dashboardStats.patientsByDepartment}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} patients`, 'Count']} />
                  <Bar dataKey="count" fill="#2C7BE5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Patient Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="medical-card bg-green-50 flex flex-col items-center justify-center p-4">
                <p className="text-3xl font-bold text-green-600">{activePatients}</p>
                <p className="text-sm text-green-700 mt-1">Active Patients</p>
              </div>
              <div className="medical-card bg-gray-50 flex flex-col items-center justify-center p-4">
                <p className="text-3xl font-bold text-gray-600">{inactivePatients}</p>
                <p className="text-sm text-gray-700 mt-1">Inactive Patients</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Today's Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            {todayAppointments.length > 0 ? (
              <table className="medical-table">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Patient</th>
                    <th>Doctor</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {todayAppointments.map((appointment) => {
                    const patient = patients.find(p => p.id === appointment.patientId);
                    return (
                      <tr key={appointment.id}>
                        <td>{appointment.time}</td>
                        <td>{patient?.name || 'Unknown'}</td>
                        <td>Dr. {appointment.doctorId}</td>
                        <td>
                          <span className={`status-${appointment.status === 'scheduled' ? 'active' : 'inactive'}`}>
                            {appointment.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-6 text-gray-500">
                No appointments scheduled for today.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default withAuth(AdminDashboard, ['admin']);
