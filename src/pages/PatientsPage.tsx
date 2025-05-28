
// import PageHeader from "@/components/ui/PageHeader";
// import { Badge } from "@/components/ui/badge";

// const dummyPatients = [
//   {
//     id: "PT-2025-12345",
//     name: "Aryan",
//     dob: "1985-05-15",
//     gender: "Male",
//     status: "Active",
//     bloodType: "O+",
//     contact: "+1 555-1234"
//   },
//   {
//     id: "PT-2025-23456",
//     name: "Smith",
//     dob: "1990-10-20",
//     gender: "Female",
//     status: "Active",
//     bloodType: "A-",
//     contact: "+1 555-2345"
//   },
//   {
//     id: "PT-2025-34567",
//     name: "Preeti Nair",
//     dob: "1978-03-08",
//     gender: "Male",
//     status: "Inactive",
//     bloodType: "B+",
//     contact: "+1 555-3456"
//   }
// ];

// const recentActivity = [
//   {
//     patientId: "PT-2025-12345",
//     doctor: "Dr. Sarah ",
//     diagnosis: "Unstable angina",
//     date: "2025-04-15",
//     notes: "Chest pain and shortness of breath",
//     department: "Cardiology"
//   },
//   {
//     patientId: "PT-2025-23456",
//     doctor: "Dr. Sarah ",
//     diagnosis: "Coronary artery disease",
//     date: "2025-04-20",
//     notes: "Follow-up for unstable angina",
//     department: "Cardiology"
//   }
// ];

// const PatientCard = ({ patient }: { patient: typeof dummyPatients[0] }) => (
//   <div className="bg-white shadow-soft rounded-lg p-5 flex flex-col md:flex-row items-center gap-4">
//     <div className="w-16 h-16 rounded-full bg-medical-blue flex items-center justify-center font-bold text-lg text-medical-dark">
//       {patient.name[0]}
//     </div>
//     <div className="flex-1">
//       <div className="flex flex-col md:flex-row md:items-center">
//         <div className="mr-8">
//           <div className="font-medium text-lg">{patient.name}</div>
//           <div className="text-gray-500 text-sm">{patient.gender}, {patient.dob}</div>
//         </div>
//         <div className="text-gray-500 text-sm space-x-4">
//           <span>ID: <b>{patient.id}</b></span>
//           <span>Blood: {patient.bloodType}</span>
//           <span>Contact: {patient.contact}</span>
//         </div>
//       </div>
//       <Badge variant={patient.status === "Active" ? "default" : "secondary"} className="mt-2">
//         {patient.status}
//       </Badge>
//     </div>
//   </div>
// );

// const PatientsPage = () => (
//   <div>
//     <PageHeader title="Patient Management" subtitle="Manage patient registration, records, and status." />
//     <div className="mb-6">
//       {dummyPatients.map((p) => <PatientCard key={p.id} patient={p} />)}
//     </div>
//     <div className="bg-white rounded-lg p-6 shadow">
//       <h2 className="font-semibold mb-4 text-lg">Recent Activity</h2>
//       <table className="w-full text-left rounded">
//         <thead>
//           <tr>
//             <th className="py-2 px-4">Patient</th>
//             <th className="py-2 px-4">Doctor</th>
//             <th className="py-2 px-4">Diagnosis</th>
//             <th className="py-2 px-4">Date</th>
//             <th className="py-2 px-4">Department</th>
//           </tr>
//         </thead>
//         <tbody>
//           {recentActivity.map((item, idx) => {
//             const patient = dummyPatients.find(p => p.id === item.patientId);
//             return (
//               <tr key={idx} className="border-t">
//                 <td className="py-2 px-4">{patient?.name ?? '-'}</td>
//                 <td className="py-2 px-4">{item.doctor}</td>
//                 <td className="py-2 px-4">{item.diagnosis}</td>
//                 <td className="py-2 px-4">{item.date}</td>
//                 <td className="py-2 px-4">{item.department}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   </div>
// );
// export default PatientsPage;

import { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, User, Phone, Calendar, Droplet } from "lucide-react";

interface Patient {
  id: string;
  name: string;
  dob: string;
  gender: string;
  status: string;
  bloodType: string;
  contact: string;
  email?: string;
  address?: string;
  emergencyContact?: string;
  medicalHistory?: string;
}

const dummyPatients: Patient[] = [
  {
    id: "PT-2025-12345",
    name: "Aryan Sharma",
    dob: "1985-05-15",
    gender: "Male",
    status: "Active",
    bloodType: "O+",
    contact: "+1 555-1234",
    email: "aryan@email.com",
    address: "123 Main St, City",
    emergencyContact: "+1 555-9999"
  },
  {
    id: "PT-2025-23456",
    name: "Smith Johnson",
    dob: "1990-10-20",
    gender: "Female",
    status: "Active",
    bloodType: "A-",
    contact: "+1 555-2345",
    email: "smith@email.com",
    address: "456 Oak Ave, City",
    emergencyContact: "+1 555-8888"
  },
  {
    id: "PT-2025-34567",
    name: "Preeti Nair",
    dob: "1978-03-08",
    gender: "Female",
    status: "Inactive",
    bloodType: "B+",
    contact: "+1 555-3456",
    email: "preeti@email.com",
    address: "789 Pine St, City",
    emergencyContact: "+1 555-7777"
  }
];

const recentActivity = [
  {
    patientId: "PT-2025-12345",
    doctor: "Dr. Sarah Wilson",
    diagnosis: "Unstable angina",
    date: "2025-04-15",
    notes: "Chest pain and shortness of breath",
    department: "Cardiology"
  },
  {
    patientId: "PT-2025-23456",
    doctor: "Dr. Sarah Wilson",
    diagnosis: "Coronary artery disease",
    date: "2025-04-20",
    notes: "Follow-up for unstable angina",
    department: "Cardiology"
  }
];

const PatientCard = ({ patient }: { patient: Patient }) => (
  <Card className="mb-4">
    <CardContent className="p-6">
      <div className="flex flex-col md:flex-row items-start gap-4">
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center font-bold text-lg text-blue-700">
          <User className="w-8 h-8" />
        </div>
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-2 md:mb-0">
              <h3 className="font-semibold text-lg text-gray-900">{patient.name}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {patient.gender}, {new Date(patient.dob).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <Droplet className="w-4 h-4" />
                  {patient.bloodType}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  {patient.contact}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={patient.status === "Active" ? "default" : "secondary"}>
                {patient.status}
              </Badge>
              <span className="text-sm text-gray-500">ID: {patient.id}</span>
            </div>
          </div>
          {patient.email && (
            <div className="mt-2 text-sm text-gray-600">
              Email: {patient.email} | Address: {patient.address}
            </div>
          )}
        </div>
      </div>
    </CardContent>
  </Card>
);

const AddPatientForm = ({ onAddPatient }: { onAddPatient: (patient: Omit<Patient, 'id'>) => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: '',
    bloodType: '',
    contact: '',
    email: '',
    address: '',
    emergencyContact: '',
    medicalHistory: '',
    status: 'Active'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddPatient(formData);
    setFormData({
      name: '',
      dob: '',
      gender: '',
      bloodType: '',
      contact: '',
      email: '',
      address: '',
      emergencyContact: '',
      medicalHistory: '',
      status: 'Active'
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
            placeholder="Enter full name"
          />
        </div>
        
        <div>
          <Label htmlFor="dob">Date of Birth *</Label>
          <Input
            id="dob"
            type="date"
            value={formData.dob}
            onChange={(e) => handleInputChange('dob', e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="gender">Gender *</Label>
          <Select onValueChange={(value) => handleInputChange('gender', value)} required>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="bloodType">Blood Type *</Label>
          <Select onValueChange={(value) => handleInputChange('bloodType', value)} required>
            <SelectTrigger>
              <SelectValue placeholder="Select blood type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A+">A+</SelectItem>
              <SelectItem value="A-">A-</SelectItem>
              <SelectItem value="B+">B+</SelectItem>
              <SelectItem value="B-">B-</SelectItem>
              <SelectItem value="AB+">AB+</SelectItem>
              <SelectItem value="AB-">AB-</SelectItem>
              <SelectItem value="O+">O+</SelectItem>
              <SelectItem value="O-">O-</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="contact">Contact Number *</Label>
          <Input
            id="contact"
            value={formData.contact}
            onChange={(e) => handleInputChange('contact', e.target.value)}
            required
            placeholder="+1 555-0000"
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="patient@email.com"
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            placeholder="Full address"
          />
        </div>

        <div>
          <Label htmlFor="emergencyContact">Emergency Contact</Label>
          <Input
            id="emergencyContact"
            value={formData.emergencyContact}
            onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
            placeholder="+1 555-0000"
          />
        </div>

        <div>
          <Label htmlFor="status">Status</Label>
          <Select onValueChange={(value) => handleInputChange('status', value)} defaultValue="Active">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          Add Patient
        </Button>
      </div>
    </form>
  );
};

const PatientsPage = () => {
  const [patients, setPatients] = useState<Patient[]>(dummyPatients);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const generatePatientId = () => {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 90000) + 10000;
    return `PT-${year}-${randomNum}`;
  };

  const handleAddPatient = async (patientData: Omit<Patient, 'id'>) => {
    try {
      // This is where you'll make the API call to your backend
      const newPatient: Patient = {
        ...patientData,
        id: generatePatientId()
      };
      
      // For now, just add to state (replace with API call)
      setPatients(prev => [...prev, newPatient]);
      setIsDialogOpen(false);
      
      // TODO: Replace with actual API call
      // const response = await fetch('/api/patients', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(patientData)
      // });
      // const savedPatient = await response.json();
      // setPatients(prev => [...prev, savedPatient]);
      
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Patient Management" 
        subtitle="Manage patient registration, records, and status." 
      />
      
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">
          Patients ({patients.length})
        </h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Patient
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
            </DialogHeader>
            <AddPatientForm onAddPatient={handleAddPatient} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {patients.map((patient) => (
          <PatientCard key={patient.id} patient={patient} />
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Patient</th>
                  <th className="text-left py-3 px-4 font-medium">Doctor</th>
                  <th className="text-left py-3 px-4 font-medium">Diagnosis</th>
                  <th className="text-left py-3 px-4 font-medium">Date</th>
                  <th className="text-left py-3 px-4 font-medium">Department</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((item, idx) => {
                  const patient = patients.find(p => p.id === item.patientId);
                  return (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{patient?.name ?? '-'}</td>
                      <td className="py-3 px-4">{item.doctor}</td>
                      <td className="py-3 px-4">{item.diagnosis}</td>
                      <td className="py-3 px-4">{new Date(item.date).toLocaleDateString()}</td>
                      <td className="py-3 px-4">{item.department}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientsPage;