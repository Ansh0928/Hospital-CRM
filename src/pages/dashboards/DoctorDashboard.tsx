
import React from 'react';
import { withAuth } from '@/contexts/AuthContext';
import PageHeader from '@/components/ui/PageHeader';
import StatsCard from '@/components/ui/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Calendar, FileText, Clock } from 'lucide-react';
import { appointments, patients } from '@/data/sampleData';
import { useAuth } from '@/contexts/AuthContext';

const DoctorDashboard: React.FC = () => {
  const { authState } = useAuth();
  const doctorId = "1"; // In a real app, this would come from the authenticated user
  
  // Filter appointments for this doctor
  const today = new Date().toISOString().split('T')[0];
  const doctorAppointments = appointments.filter(app => app.doctorId === doctorId);
  const todayAppointments = doctorAppointments.filter(app => app.date === today);
  const upcomingAppointments = doctorAppointments.filter(app => 
    app.date >= today && app.status === 'scheduled'
  ).sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
  
  return (
    <>
      <PageHeader 
        title="Doctor Dashboard" 
        subtitle={`Welcome, ${authState.user?.name}`}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard
          title="My Patients"
          value={doctorAppointments.length}
          icon={User}
        />
        <StatsCard
          title="Today's Appointments"
          value={todayAppointments.length}
          icon={Calendar}
        />
        <StatsCard
          title="Pending Reports"
          value={3}
          icon={FileText}
        />
        <StatsCard
          title="Next Appointment"
          value={upcomingAppointments.length > 0 ? upcomingAppointments[0].time : "None"}
          icon={Clock}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Today's Schedule</CardTitle>
            <Button variant="outline" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            {todayAppointments.length > 0 ? (
              <div className="space-y-4">
                {todayAppointments.map((appointment) => {
                  const patient = patients.find(p => p.id === appointment.patientId);
                  return (
                    <div key={appointment.id} className="flex items-center p-3 border rounded-lg hover:bg-gray-50">
                      <div className="h-10 w-10 rounded-full bg-medical-primary text-white flex items-center justify-center mr-3">
                        <User size={18} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{patient?.name}</p>
                        <p className="text-sm text-gray-500">{appointment.notes || 'No notes'}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{appointment.time}</p>
                        <p className={`text-xs ${appointment.status === 'scheduled' ? 'text-green-600' : 'text-gray-500'}`}>
                          {appointment.status}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                <h3 className="text-lg font-medium">No Appointments Today</h3>
                <p className="mt-1">You have a free schedule for today.</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Upcoming Appointments</CardTitle>
            <Button variant="outline" size="sm">View Calendar</Button>
          </CardHeader>
          <CardContent>
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAppointments.slice(0, 5).map((appointment) => {
                  const patient = patients.find(p => p.id === appointment.patientId);
                  // Format the date
                  const appointmentDate = new Date(appointment.date);
                  const formattedDate = appointmentDate.toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  });
                  
                  return (
                    <div key={appointment.id} className="flex items-center p-3 border rounded-lg hover:bg-gray-50">
                      <div className="h-10 w-10 rounded-full bg-blue-100 text-medical-primary flex items-center justify-center mr-3">
                        <Calendar size={18} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{patient?.name}</p>
                        <p className="text-sm text-gray-500">{appointment.notes || 'No notes'}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{formattedDate}</p>
                        <p className="text-sm text-gray-500">{appointment.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                <h3 className="text-lg font-medium">No Upcoming Appointments</h3>
                <p className="mt-1">Your schedule is clear for the coming days.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Patient Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="medical-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Last Visit</th>
                <th>Diagnosis</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.slice(0, 5).map((patient) => {
                const patientAppointments = appointments
                  .filter(a => a.patientId === patient.id && a.doctorId === doctorId)
                  .sort((a, b) => b.date.localeCompare(a.date));
                
                const lastVisit = patientAppointments.length > 0 ? patientAppointments[0].date : 'No visits';
                
                return (
                  <tr key={patient.id}>
                    <td className="font-medium">{patient.name}</td>
                    <td>{lastVisit}</td>
                    <td>Routine checkup</td>
                    <td>
                      <span className={`status-${patient.status}`}>
                        {patient.status}
                      </span>
                    </td>
                    <td>
                      <Button size="sm">View Records</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </>
  );
};

export default withAuth(DoctorDashboard, ['doctor']);
