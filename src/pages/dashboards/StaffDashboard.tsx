
import React from 'react';
import { withAuth } from '@/contexts/AuthContext';
import PageHeader from '@/components/ui/PageHeader';
import StatsCard from '@/components/ui/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Calendar, CreditCard, ChartBar } from 'lucide-react';
import { appointments, patients, invoices } from '@/data/sampleData';
import { useAuth } from '@/contexts/AuthContext';

const StaffDashboard: React.FC = () => {
  const { authState } = useAuth();
  
  // Get today's data
  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter(app => app.date === today);
  
  // Calculate pending invoices
  const pendingInvoices = invoices.filter(inv => inv.status === 'pending');
  const totalPendingAmount = pendingInvoices.reduce((sum, inv) => sum + inv.total, 0);
  
  return (
    <>
      <PageHeader 
        title="Staff Dashboard" 
        subtitle={`Welcome, ${authState.user?.name}`}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard
          title="Total Patients"
          value={patients.length}
          icon={User}
        />
        <StatsCard
          title="Today's Appointments"
          value={todayAppointments.length}
          icon={Calendar}
        />
        <StatsCard
          title="Pending Invoices"
          value={pendingInvoices.length}
          icon={CreditCard}
        />
        <StatsCard
          title="Pending Amount"
          value={`$${totalPendingAmount.toLocaleString()}`}
          icon={ChartBar}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Today's Appointments</CardTitle>
            <Button variant="outline" size="sm">View All</Button>
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
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {todayAppointments.map((appointment) => {
                    const patient = patients.find(p => p.id === appointment.patientId);
                    return (
                      <tr key={appointment.id}>
                        <td>{appointment.time}</td>
                        <td className="font-medium">{patient?.name}</td>
                        <td>Dr. {appointment.doctorId}</td>
                        <td>
                          <span className={`status-${appointment.status === 'scheduled' ? 'active' : 'inactive'}`}>
                            {appointment.status}
                          </span>
                        </td>
                        <td>
                          <Button size="sm" variant="outline">Check In</Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                <h3 className="text-lg font-medium">No Appointments Today</h3>
                <p className="mt-1">There are no scheduled appointments for today.</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Recent Patients</CardTitle>
            <Button variant="outline" size="sm">Register New</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {patients.slice(0, 5).map((patient) => (
                <div key={patient.id} className="flex items-center p-3 border rounded-lg hover:bg-gray-50">
                  <div className="h-10 w-10 rounded-full bg-medical-primary text-white flex items-center justify-center mr-3">
                    <User size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{patient.name}</p>
                    <p className="text-sm text-gray-500">ID: {patient.uniqueId}</p>
                  </div>
                  <div className="text-right">
                    <span className={`status-${patient.status}`}>
                      {patient.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{patient.contactNumber}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">Pending Invoices</CardTitle>
          <Button variant="outline" size="sm">View All</Button>
        </CardHeader>
        <CardContent>
          {pendingInvoices.length > 0 ? (
            <table className="medical-table">
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Patient</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingInvoices.map((invoice) => {
                  const patient = patients.find(p => p.id === invoice.patientId);
                  return (
                    <tr key={invoice.id}>
                      <td className="font-mono text-xs">{`INV-${invoice.id}`}</td>
                      <td className="font-medium">{patient?.name}</td>
                      <td>{invoice.date}</td>
                      <td className="font-medium">${invoice.total.toLocaleString()}</td>
                      <td>
                        <div className="flex space-x-2">
                          <Button size="sm">Process</Button>
                          <Button size="sm" variant="outline">View</Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <CreditCard className="mx-auto h-12 w-12 text-gray-400 mb-3" />
              <h3 className="text-lg font-medium">No Pending Invoices</h3>
              <p className="mt-1">All invoices have been processed.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default withAuth(StaffDashboard, ['staff']);
