
// // import { useState } from "react";
// // import PageHeader from "@/components/ui/PageHeader";
// // import { Badge } from "@/components/ui/badge";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// // import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Plus, User, Phone, Calendar, Droplet } from "lucide-react";

// // interface Patient {
// //   id: string;
// //   name: string;
// //   dob: string;
// //   gender: string;
// //   status: string;
// //   bloodType: string;
// //   contact: string;
// //   email?: string;
// //   address?: string;
// //   emergencyContact?: string;
// //   medicalHistory?: string;
// // }

// // const dummyPatients: Patient[] = [
// //   {
// //     id: "PT-2025-12345",
// //     name: "Aryan Sharma",
// //     dob: "1985-05-15",
// //     gender: "Male",
// //     status: "Active",
// //     bloodType: "O+",
// //     contact: "+1 555-1234",
// //     email: "aryan@email.com",
// //     address: "123 Main St, City",
// //     emergencyContact: "+1 555-9999"
// //   },
// //   {
// //     id: "PT-2025-23456",
// //     name: "Smith Johnson",
// //     dob: "1990-10-20",
// //     gender: "Female",
// //     status: "Active",
// //     bloodType: "A-",
// //     contact: "+1 555-2345",
// //     email: "smith@email.com",
// //     address: "456 Oak Ave, City",
// //     emergencyContact: "+1 555-8888"
// //   },
// //   {
// //     id: "PT-2025-34567",
// //     name: "Preeti Nair",
// //     dob: "1978-03-08",
// //     gender: "Female",
// //     status: "Inactive",
// //     bloodType: "B+",
// //     contact: "+1 555-3456",
// //     email: "preeti@email.com",
// //     address: "789 Pine St, City",
// //     emergencyContact: "+1 555-7777"
// //   }
// // ];

// // const recentActivity = [
// //   {
// //     patientId: "PT-2025-12345",
// //     doctor: "Dr. Sarah Wilson",
// //     diagnosis: "Unstable angina",
// //     date: "2025-04-15",
// //     notes: "Chest pain and shortness of breath",
// //     department: "Cardiology"
// //   },
// //   {
// //     patientId: "PT-2025-23456",
// //     doctor: "Dr. Sarah Wilson",
// //     diagnosis: "Coronary artery disease",
// //     date: "2025-04-20",
// //     notes: "Follow-up for unstable angina",
// //     department: "Cardiology"
// //   }
// // ];

// // const PatientCard = ({ patient }: { patient: Patient }) => (
// //   <Card className="mb-4">
// //     <CardContent className="p-6">
// //       <div className="flex flex-col md:flex-row items-start gap-4">
// //         <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center font-bold text-lg text-blue-700">
// //           <User className="w-8 h-8" />
// //         </div>
// //         <div className="flex-1">
// //           <div className="flex flex-col md:flex-row md:items-center justify-between">
// //             <div className="mb-2 md:mb-0">
// //               <h3 className="font-semibold text-lg text-gray-900">{patient.name}</h3>
// //               <div className="flex items-center gap-4 text-sm text-gray-600">
// //                 <span className="flex items-center gap-1">
// //                   <Calendar className="w-4 h-4" />
// //                   {patient.gender}, {new Date(patient.dob).toLocaleDateString()}
// //                 </span>
// //                 <span className="flex items-center gap-1">
// //                   <Droplet className="w-4 h-4" />
// //                   {patient.bloodType}
// //                 </span>
// //                 <span className="flex items-center gap-1">
// //                   <Phone className="w-4 h-4" />
// //                   {patient.contact}
// //                 </span>
// //               </div>
// //             </div>
// //             <div className="flex items-center gap-2">
// //               <Badge variant={patient.status === "Active" ? "default" : "secondary"}>
// //                 {patient.status}
// //               </Badge>
// //               <span className="text-sm text-gray-500">ID: {patient.id}</span>
// //             </div>
// //           </div>
// //           {patient.email && (
// //             <div className="mt-2 text-sm text-gray-600">
// //               Email: {patient.email} | Address: {patient.address}
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </CardContent>
// //   </Card>
// // );

// // const AddPatientForm = ({ onAddPatient }: { onAddPatient: (patient: Omit<Patient, 'id'>) => void }) => {
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     dob: '',
// //     gender: '',
// //     bloodType: '',
// //     contact: '',
// //     email: '',
// //     address: '',
// //     emergencyContact: '',
// //     medicalHistory: '',
// //     status: 'Active'
// //   });

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     onAddPatient(formData);
// //     setFormData({
// //       name: '',
// //       dob: '',
// //       gender: '',
// //       bloodType: '',
// //       contact: '',
// //       email: '',
// //       address: '',
// //       emergencyContact: '',
// //       medicalHistory: '',
// //       status: 'Active'
// //     });
// //   };

// //   const handleInputChange = (field: string, value: string) => {
// //     setFormData(prev => ({ ...prev, [field]: value }));
// //   };

// //   return (
// //     <form onSubmit={handleSubmit} className="space-y-4">
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //         <div>
// //           <Label htmlFor="name">Full Name *</Label>
// //           <Input
// //             id="name"
// //             value={formData.name}
// //             onChange={(e) => handleInputChange('name', e.target.value)}
// //             required
// //             placeholder="Enter full name"
// //           />
// //         </div>
        
// //         <div>
// //           <Label htmlFor="dob">Date of Birth *</Label>
// //           <Input
// //             id="dob"
// //             type="date"
// //             value={formData.dob}
// //             onChange={(e) => handleInputChange('dob', e.target.value)}
// //             required
// //           />
// //         </div>

// //         <div>
// //           <Label htmlFor="gender">Gender *</Label>
// //           <Select onValueChange={(value) => handleInputChange('gender', value)} required>
// //             <SelectTrigger>
// //               <SelectValue placeholder="Select gender" />
// //             </SelectTrigger>
// //             <SelectContent>
// //               <SelectItem value="Male">Male</SelectItem>
// //               <SelectItem value="Female">Female</SelectItem>
// //               <SelectItem value="Other">Other</SelectItem>
// //             </SelectContent>
// //           </Select>
// //         </div>

// //         <div>
// //           <Label htmlFor="bloodType">Blood Type *</Label>
// //           <Select onValueChange={(value) => handleInputChange('bloodType', value)} required>
// //             <SelectTrigger>
// //               <SelectValue placeholder="Select blood type" />
// //             </SelectTrigger>
// //             <SelectContent>
// //               <SelectItem value="A+">A+</SelectItem>
// //               <SelectItem value="A-">A-</SelectItem>
// //               <SelectItem value="B+">B+</SelectItem>
// //               <SelectItem value="B-">B-</SelectItem>
// //               <SelectItem value="AB+">AB+</SelectItem>
// //               <SelectItem value="AB-">AB-</SelectItem>
// //               <SelectItem value="O+">O+</SelectItem>
// //               <SelectItem value="O-">O-</SelectItem>
// //             </SelectContent>
// //           </Select>
// //         </div>

// //         <div>
// //           <Label htmlFor="contact">Contact Number *</Label>
// //           <Input
// //             id="contact"
// //             value={formData.contact}
// //             onChange={(e) => handleInputChange('contact', e.target.value)}
// //             required
// //             placeholder="+1 555-0000"
// //           />
// //         </div>

// //         <div>
// //           <Label htmlFor="email">Email</Label>
// //           <Input
// //             id="email"
// //             type="email"
// //             value={formData.email}
// //             onChange={(e) => handleInputChange('email', e.target.value)}
// //             placeholder="patient@email.com"
// //           />
// //         </div>

// //         <div className="md:col-span-2">
// //           <Label htmlFor="address">Address</Label>
// //           <Input
// //             id="address"
// //             value={formData.address}
// //             onChange={(e) => handleInputChange('address', e.target.value)}
// //             placeholder="Full address"
// //           />
// //         </div>

// //         <div>
// //           <Label htmlFor="emergencyContact">Emergency Contact</Label>
// //           <Input
// //             id="emergencyContact"
// //             value={formData.emergencyContact}
// //             onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
// //             placeholder="+1 555-0000"
// //           />
// //         </div>

// //         <div>
// //           <Label htmlFor="status">Status</Label>
// //           <Select onValueChange={(value) => handleInputChange('status', value)} defaultValue="Active">
// //             <SelectTrigger>
// //               <SelectValue />
// //             </SelectTrigger>
// //             <SelectContent>
// //               <SelectItem value="Active">Active</SelectItem>
// //               <SelectItem value="Inactive">Inactive</SelectItem>
// //             </SelectContent>
// //           </Select>
// //         </div>
// //       </div>

// //       <div className="flex justify-end gap-2 pt-4">
// //         <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
// //           Add Patient
// //         </Button>
// //       </div>
// //     </form>
// //   );
// // };

// // const PatientsPage = () => {
// //   const [patients, setPatients] = useState<Patient[]>(dummyPatients);
// //   const [isDialogOpen, setIsDialogOpen] = useState(false);

// //   const generatePatientId = () => {
// //     const year = new Date().getFullYear();
// //     const randomNum = Math.floor(Math.random() * 90000) + 10000;
// //     return `PT-${year}-${randomNum}`;
// //   };

// //   const handleAddPatient = async (patientData: Omit<Patient, 'id'>) => {
// //     try {
// //       // This is where you'll make the API call to your backend
// //       const newPatient: Patient = {
// //         ...patientData,
// //         id: generatePatientId()
// //       };
      
// //       // For now, just add to state (replace with API call)
// //       setPatients(prev => [...prev, newPatient]);
// //       setIsDialogOpen(false);
      
// //       // TODO: Replace with actual API call
// //       // const response = await fetch('/api/patients', {
// //       //   method: 'POST',
// //       //   headers: { 'Content-Type': 'application/json' },
// //       //   body: JSON.stringify(patientData)
// //       // });
// //       // const savedPatient = await response.json();
// //       // setPatients(prev => [...prev, savedPatient]);
      
// //     } catch (error) {
// //       console.error('Error adding patient:', error);
// //     }
// //   };

// //   return (
// //     <div className="space-y-6">
// //       <PageHeader 
// //         title="Patient Management" 
// //         subtitle="Manage patient registration, records, and status." 
// //       />
      
// //       <div className="flex justify-between items-center">
// //         <h2 className="text-xl font-semibold text-gray-900">
// //           Patients ({patients.length})
// //         </h2>
// //         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
// //           <DialogTrigger asChild>
// //             <Button className="bg-blue-600 hover:bg-blue-700">
// //               <Plus className="w-4 h-4 mr-2" />
// //               Add Patient
// //             </Button>
// //           </DialogTrigger>
// //           <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
// //             <DialogHeader>
// //               <DialogTitle>Add New Patient</DialogTitle>
// //             </DialogHeader>
// //             <AddPatientForm onAddPatient={handleAddPatient} />
// //           </DialogContent>
// //         </Dialog>
// //       </div>

// //       <div className="space-y-4">
// //         {patients.map((patient) => (
// //           <PatientCard key={patient.id} patient={patient} />
// //         ))}
// //       </div>

// //       <Card>
// //         <CardHeader>
// //           <CardTitle>Recent Activity</CardTitle>
// //         </CardHeader>
// //         <CardContent>
// //           <div className="overflow-x-auto">
// //             <table className="w-full">
// //               <thead>
// //                 <tr className="border-b">
// //                   <th className="text-left py-3 px-4 font-medium">Patient</th>
// //                   <th className="text-left py-3 px-4 font-medium">Doctor</th>
// //                   <th className="text-left py-3 px-4 font-medium">Diagnosis</th>
// //                   <th className="text-left py-3 px-4 font-medium">Date</th>
// //                   <th className="text-left py-3 px-4 font-medium">Department</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {recentActivity.map((item, idx) => {
// //                   const patient = patients.find(p => p.id === item.patientId);
// //                   return (
// //                     <tr key={idx} className="border-b hover:bg-gray-50">
// //                       <td className="py-3 px-4">{patient?.name ?? '-'}</td>
// //                       <td className="py-3 px-4">{item.doctor}</td>
// //                       <td className="py-3 px-4">{item.diagnosis}</td>
// //                       <td className="py-3 px-4">{new Date(item.date).toLocaleDateString()}</td>
// //                       <td className="py-3 px-4">{item.department}</td>
// //                     </tr>
// //                   );
// //                 })}
// //               </tbody>
// //             </table>
// //           </div>
// //         </CardContent>
// //       </Card>
// //     </div>
// //   );
// // };

// // export default PatientsPage;


// // 'use client'

// // import { useState, useEffect } from "react";
// // import PageHeader from "@/components/ui/PageHeader";
// // import { Badge } from "@/components/ui/badge";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// // import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Plus, User, Phone, Calendar, Droplet, Loader2 } from "lucide-react";
// // import { addPatient, getPatients, getRecentActivities, type PatientResponse } from "@/lib/actions/patient-actions";
// // import { useToast } from "@/components/ui/use-toast";

// // interface Patient {
// //   id: string;
// //   name: string;
// //   dob: string;
// //   gender: string;
// //   status: string;
// //   bloodType: string;
// //   contact: string;
// //   email?: string;
// //   address?: string;
// //   emergencyContact?: string;
// //   medicalHistory?: string;
// // }

// // interface RecentActivity {
// //   patientId: string;
// //   patientName: string;
// //   doctor: string;
// //   diagnosis: string;
// //   date: string;
// //   notes?: string;
// //   department: string;
// // }

// // const PatientCard = ({ patient }: { patient: Patient }) => (
// //   <Card className="mb-4">
// //     <CardContent className="p-6">
// //       <div className="flex flex-col md:flex-row items-start gap-4">
// //         <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center font-bold text-lg text-blue-700">
// //           <User className="w-8 h-8" />
// //         </div>
// //         <div className="flex-1">
// //           <div className="flex flex-col md:flex-row md:items-center justify-between">
// //             <div className="mb-2 md:mb-0">
// //               <h3 className="font-semibold text-lg text-gray-900">{patient.name}</h3>
// //               <div className="flex items-center gap-4 text-sm text-gray-600">
// //                 <span className="flex items-center gap-1">
// //                   <Calendar className="w-4 h-4" />
// //                   {patient.gender}, {new Date(patient.dob).toLocaleDateString()}
// //                 </span>
// //                 <span className="flex items-center gap-1">
// //                   <Droplet className="w-4 h-4" />
// //                   {patient.bloodType}
// //                 </span>
// //                 <span className="flex items-center gap-1">
// //                   <Phone className="w-4 h-4" />
// //                   {patient.contact}
// //                 </span>
// //               </div>
// //             </div>
// //             <div className="flex items-center gap-2">
// //               <Badge variant={patient.status === "Active" ? "default" : "secondary"}>
// //                 {patient.status}
// //               </Badge>
// //               <span className="text-sm text-gray-500">ID: {patient.id}</span>
// //             </div>
// //           </div>
// //           {patient.email && (
// //             <div className="mt-2 text-sm text-gray-600">
// //               Email: {patient.email} | Address: {patient.address}
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </CardContent>
// //   </Card>
// // );

// // const AddPatientForm = ({ 
// //   onAddPatient, 
// //   isLoading 
// // }: { 
// //   onAddPatient: (patient: any) => void;
// //   isLoading: boolean;
// // }) => {
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     dob: '',
// //     gender: '',
// //     bloodType: '',
// //     contact: '',
// //     email: '',
// //     address: '',
// //     emergencyContact: '',
// //     medicalHistory: '',
// //     status: 'Active'
// //   });

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     await onAddPatient(formData);
// //   };

// //   const handleInputChange = (field: string, value: string) => {
// //     setFormData(prev => ({ ...prev, [field]: value }));
// //   };

// //   const resetForm = () => {
// //     setFormData({
// //       name: '',
// //       dob: '',
// //       gender: '',
// //       bloodType: '',
// //       contact: '',
// //       email: '',
// //       address: '',
// //       emergencyContact: '',
// //       medicalHistory: '',
// //       status: 'Active'
// //     });
// //   };

// //   return (
// //     <form onSubmit={handleSubmit} className="space-y-4">
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //         <div>
// //           <Label htmlFor="name">Full Name *</Label>
// //           <Input
// //             id="name"
// //             value={formData.name}
// //             onChange={(e) => handleInputChange('name', e.target.value)}
// //             required
// //             placeholder="Enter full name"
// //             disabled={isLoading}
// //           />
// //         </div>
        
// //         <div>
// //           <Label htmlFor="dob">Date of Birth *</Label>
// //           <Input
// //             id="dob"
// //             type="date"
// //             value={formData.dob}
// //             onChange={(e) => handleInputChange('dob', e.target.value)}
// //             required
// //             disabled={isLoading}
// //           />
// //         </div>

// //         <div>
// //           <Label htmlFor="gender">Gender *</Label>
// //           <Select 
// //             onValueChange={(value) => handleInputChange('gender', value)} 
// //             required
// //             disabled={isLoading}
// //           >
// //             <SelectTrigger>
// //               <SelectValue placeholder="Select gender" />
// //             </SelectTrigger>
// //             <SelectContent>
// //               <SelectItem value="Male">Male</SelectItem>
// //               <SelectItem value="Female">Female</SelectItem>
// //               <SelectItem value="Other">Other</SelectItem>
// //             </SelectContent>
// //           </Select>
// //         </div>

// //         <div>
// //           <Label htmlFor="bloodType">Blood Type *</Label>
// //           <Select 
// //             onValueChange={(value) => handleInputChange('bloodType', value)} 
// //             required
// //             disabled={isLoading}
// //           >
// //             <SelectTrigger>
// //               <SelectValue placeholder="Select blood type" />
// //             </SelectTrigger>
// //             <SelectContent>
// //               <SelectItem value="A+">A+</SelectItem>
// //               <SelectItem value="A-">A-</SelectItem>
// //               <SelectItem value="B+">B+</SelectItem>
// //               <SelectItem value="B-">B-</SelectItem>
// //               <SelectItem value="AB+">AB+</SelectItem>
// //               <SelectItem value="AB-">AB-</SelectItem>
// //               <SelectItem value="O+">O+</SelectItem>
// //               <SelectItem value="O-">O-</SelectItem>
// //             </SelectContent>
// //           </Select>
// //         </div>

// //         <div>
// //           <Label htmlFor="contact">Contact Number *</Label>
// //           <Input
// //             id="contact"
// //             value={formData.contact}
// //             onChange={(e) => handleInputChange('contact', e.target.value)}
// //             required
// //             placeholder="+1 555-0000"
// //             disabled={isLoading}
// //           />
// //         </div>

// //         <div>
// //           <Label htmlFor="email">Email</Label>
// //           <Input
// //             id="email"
// //             type="email"
// //             value={formData.email}
// //             onChange={(e) => handleInputChange('email', e.target.value)}
// //             placeholder="patient@email.com"
// //             disabled={isLoading}
// //           />
// //         </div>

// //         <div className="md:col-span-2">
// //           <Label htmlFor="address">Address</Label>
// //           <Input
// //             id="address"
// //             value={formData.address}
// //             onChange={(e) => handleInputChange('address', e.target.value)}
// //             placeholder="Full address"
// //             disabled={isLoading}
// //           />
// //         </div>

// //         <div>
// //           <Label htmlFor="emergencyContact">Emergency Contact</Label>
// //           <Input
// //             id="emergencyContact"
// //             value={formData.emergencyContact}
// //             onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
// //             placeholder="+1 555-0000"
// //             disabled={isLoading}
// //           />
// //         </div>

// //         <div>
// //           <Label htmlFor="status">Status</Label>
// //           <Select 
// //             onValueChange={(value) => handleInputChange('status', value)} 
// //             defaultValue="Active"
// //             disabled={isLoading}
// //           >
// //             <SelectTrigger>
// //               <SelectValue />
// //             </SelectTrigger>
// //             <SelectContent>
// //               <SelectItem value="Active">Active</SelectItem>
// //               <SelectItem value="Inactive">Inactive</SelectItem>
// //             </SelectContent>
// //           </Select>
// //         </div>
// //       </div>

// //       <div className="flex justify-end gap-2 pt-4">
// //         <Button 
// //           type="button" 
// //           variant="outline" 
// //           onClick={resetForm}
// //           disabled={isLoading}
// //         >
// //           Reset
// //         </Button>
// //         <Button 
// //           type="submit" 
// //           className="bg-blue-600 hover:bg-blue-700"
// //           disabled={isLoading}
// //         >
// //           {isLoading ? (
// //             <>
// //               <Loader2 className="w-4 h-4 mr-2 animate-spin" />
// //               Adding...
// //             </>
// //           ) : (
// //             'Add Patient'
// //           )}
// //         </Button>
// //       </div>
// //     </form>
// //   );
// // };

// // const PatientsPage = () => {
// //   const [patients, setPatients] = useState<Patient[]>([]);
// //   const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
// //   const [isDialogOpen, setIsDialogOpen] = useState(false);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [isDataLoading, setIsDataLoading] = useState(true);
// //   const { toast } = useToast();

// //   // Load patients and activities on component mount
// //   useEffect(() => {
// //     loadData();
// //   }, []);

// //   const loadData = async () => {
// //     setIsDataLoading(true);
// //     try {
// //       const [patientsResult, activitiesResult] = await Promise.all([
// //         getPatients(),
// //         getRecentActivities()
// //       ]);

// //       if (patientsResult.success) {
// //         setPatients(patientsResult.data);
// //       } else {
// //         toast({
// //           title: "Error",
// //           description: patientsResult.error,
// //           variant: "destructive"
// //         });
// //       }

// //       if (activitiesResult.success) {
// //         setRecentActivities(activitiesResult.data);
// //       }
// //     } catch (error) {
// //       toast({
// //         title: "Error",
// //         description: "Failed to load data",
// //         variant: "destructive"
// //       });
// //     } finally {
// //       setIsDataLoading(false);
// //     }
// //   };

// //   const handleAddPatient = async (patientData: any) => {
// //     setIsLoading(true);
// //     try {
// //       const result = await addPatient(patientData);
      
// //       if (result.success && result.data) {
// //         // Add the new patient to the list
// //         setPatients(prev => [result.data, ...prev]);
// //         setIsDialogOpen(false);
        
// //         toast({
// //           title: "Success",
// //           description: "Patient added successfully",
// //         });
        
// //         // Reload activities to get updated data
// //         const activitiesResult = await getRecentActivities();
// //         if (activitiesResult.success) {
// //           setRecentActivities(activitiesResult.data);
// //         }
// //       } else {
// //         toast({
// //           title: "Error",
// //           description: result.error || "Failed to add patient",
// //           variant: "destructive"
// //         });
// //       }
// //     } catch (error) {
// //       toast({
// //         title: "Error",
// //         description: "An unexpected error occurred",
// //         variant: "destructive"
// //       });
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   if (isDataLoading) {
// //     return (
// //       <div className="flex items-center justify-center min-h-[400px]">
// //         <Loader2 className="w-8 h-8 animate-spin" />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="space-y-6">
// //       <PageHeader 
// //         title="Patient Management" 
// //         subtitle="Manage patient registration, records, and status." 
// //       />
      
// //       <div className="flex justify-between items-center">
// //         <h2 className="text-xl font-semibold text-gray-900">
// //           Patients ({patients.length})
// //         </h2>
// //         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
// //           <DialogTrigger asChild>
// //             <Button className="bg-blue-600 hover:bg-blue-700">
// //               <Plus className="w-4 h-4 mr-2" />
// //               Add Patient
// //             </Button>
// //           </DialogTrigger>
// //           <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
// //             <DialogHeader>
// //               <DialogTitle>Add New Patient</DialogTitle>
// //             </DialogHeader>
// //             <AddPatientForm 
// //               onAddPatient={handleAddPatient} 
// //               isLoading={isLoading}
// //             />
// //           </DialogContent>
// //         </Dialog>
// //       </div>

// //       <div className="space-y-4">
// //         {patients.length === 0 ? (
// //           <Card>
// //             <CardContent className="p-6 text-center text-gray-500">
// //               No patients found. Add your first patient to get started.
// //             </CardContent>
// //           </Card>
// //         ) : (
// //           patients.map((patient) => (
// //             <PatientCard key={patient.id} patient={patient} />
// //           ))
// //         )}
// //       </div>

// //       <Card>
// //         <CardHeader>
// //           <CardTitle>Recent Activity</CardTitle>
// //         </CardHeader>
// //         <CardContent>
// //           <div className="overflow-x-auto">
// //             <table className="w-full">
// //               <thead>
// //                 <tr className="border-b">
// //                   <th className="text-left py-3 px-4 font-medium">Patient</th>
// //                   <th className="text-left py-3 px-4 font-medium">Doctor</th>
// //                   <th className="text-left py-3 px-4 font-medium">Diagnosis</th>
// //                   <th className="text-left py-3 px-4 font-medium">Date</th>
// //                   <th className="text-left py-3 px-4 font-medium">Department</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {recentActivities.length === 0 ? (
// //                   <tr>
// //                     <td colSpan={5} className="py-8 text-center text-gray-500">
// //                       No recent activities found
// //                     </td>
// //                   </tr>
// //                 ) : (
// //                   recentActivities.map((item, idx) => (
// //                     <tr key={idx} className="border-b hover:bg-gray-50">
// //                       <td className="py-3 px-4">{item.patientName}</td>
// //                       <td className="py-3 px-4">{item.doctor}</td>
// //                       <td className="py-3 px-4">{item.diagnosis}</td>
// //                       <td className="py-3 px-4">{new Date(item.date).toLocaleDateString()}</td>
// //                       <td className="py-3 px-4">{item.department}</td>
// //                     </tr>
// //                   ))
// //                 )}
// //               </tbody>
// //             </table>
// //           </div>
// //         </CardContent>
// //       </Card>
// //     </div>
// //   );
// // };

// // export default PatientsPage;

// import { useState, useEffect } from "react";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Plus, User, Phone, Calendar, Droplet, Loader2 } from "lucide-react";

// interface Patient {
//   id: string;
//   patientId: string;
//   name: string;
//   dateOfBirth: string;
//   gender: string;
//   status: string;
//   bloodType: string;
//   contact: string;
//   email?: string;
//   address?: string;
//   emergencyContact?: string;
//   medicalHistory?: string;
//   createdAt: string;
//   updatedAt: string;
// }

// interface Activity {
//   id: string;
//   patientId: string;
//   diagnosis: string;
//   notes?: string;
//   department: string;
//   date: string;
//   doctor: {
//     name: string;
//   };
//   patient: {
//     name: string;
//   };
// }

// interface ApiResponse<T> {
//   success: boolean;
//   data?: T;
//   message?: string;
// }

// const API_BASE_URL = '/api'; // Adjust this to your API base URL

// const PatientCard = ({ patient }: { patient: Patient }) => (
//   <Card className="mb-4">
//     <CardContent className="p-6">
//       <div className="flex flex-col md:flex-row items-start gap-4">
//         <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center font-bold text-lg text-blue-700">
//           <User className="w-8 h-8" />
//         </div>
//         <div className="flex-1">
//           <div className="flex flex-col md:flex-row md:items-center justify-between">
//             <div className="mb-2 md:mb-0">
//               <h3 className="font-semibold text-lg text-gray-900">{patient.name}</h3>
//               <div className="flex items-center gap-4 text-sm text-gray-600">
//                 <span className="flex items-center gap-1">
//                   <Calendar className="w-4 h-4" />
//                   {patient.gender}, {new Date(patient.dateOfBirth).toLocaleDateString()}
//                 </span>
//                 <span className="flex items-center gap-1">
//                   <Droplet className="w-4 h-4" />
//                   {patient.bloodType}
//                 </span>
//                 <span className="flex items-center gap-1">
//                   <Phone className="w-4 h-4" />
//                   {patient.contact}
//                 </span>
//               </div>
//             </div>
//             <div className="flex items-center gap-2">
//               <Badge variant={patient.status === "Active" ? "default" : "secondary"}>
//                 {patient.status}
//               </Badge>
//               <span className="text-sm text-gray-500">ID: {patient.patientId}</span>
//             </div>
//           </div>
//           {patient.email && (
//             <div className="mt-2 text-sm text-gray-600">
//               Email: {patient.email} {patient.address && `| Address: ${patient.address}`}
//             </div>
//           )}
//         </div>
//       </div>
//     </CardContent>
//   </Card>
// );

// const AddPatientForm = ({ 
//   onAddPatient, 
//   isLoading 
// }: { 
//   onAddPatient: (patient: Omit<Patient, 'id' | 'patientId' | 'createdAt' | 'updatedAt'>) => void;
//   isLoading: boolean;
// }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     dateOfBirth: '',
//     gender: '',
//     bloodType: '',
//     contact: '',
//     email: '',
//     address: '',
//     emergencyContact: '',
//     medicalHistory: '',
//     status: 'Active'
//   });

//   const handleSubmit = () => {
//     if (!formData.name || !formData.dateOfBirth || !formData.gender || !formData.bloodType || !formData.contact) {
//       return; // Basic validation
//     }
//     onAddPatient(formData);
//   };

//   const handleInputChange = (field: string, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const resetForm = () => {
//     setFormData({
//       name: '',
//       dateOfBirth: '',
//       gender: '',
//       bloodType: '',
//       contact: '',
//       email: '',
//       address: '',
//       emergencyContact: '',
//       medicalHistory: '',
//       status: 'Active'
//     });
//   };

//   useEffect(() => {
//     if (!isLoading) {
//       resetForm();
//     }
//   }, [isLoading]);

//   return (
//     <div className="space-y-4">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <Label htmlFor="name">Full Name *</Label>
//           <Input
//             id="name"
//             value={formData.name}
//             onChange={(e) => handleInputChange('name', e.target.value)}
//             required
//             placeholder="Enter full name"
//             disabled={isLoading}
//           />
//         </div>
        
//         <div>
//           <Label htmlFor="dateOfBirth">Date of Birth *</Label>
//           <Input
//             id="dateOfBirth"
//             type="date"
//             value={formData.dateOfBirth}
//             onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
//             required
//             disabled={isLoading}
//           />
//         </div>

//         <div>
//           <Label htmlFor="gender">Gender *</Label>
//           <Select 
//             onValueChange={(value) => handleInputChange('gender', value)} 
//             required
//             disabled={isLoading}
//             value={formData.gender}
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="Select gender" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="Male">Male</SelectItem>
//               <SelectItem value="Female">Female</SelectItem>
//               <SelectItem value="Other">Other</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div>
//           <Label htmlFor="bloodType">Blood Type *</Label>
//           <Select 
//             onValueChange={(value) => handleInputChange('bloodType', value)} 
//             required
//             disabled={isLoading}
//             value={formData.bloodType}
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="Select blood type" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="A+">A+</SelectItem>
//               <SelectItem value="A-">A-</SelectItem>
//               <SelectItem value="B+">B+</SelectItem>
//               <SelectItem value="B-">B-</SelectItem>
//               <SelectItem value="AB+">AB+</SelectItem>
//               <SelectItem value="AB-">AB-</SelectItem>
//               <SelectItem value="O+">O+</SelectItem>
//               <SelectItem value="O-">O-</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div>
//           <Label htmlFor="contact">Contact Number *</Label>
//           <Input
//             id="contact"
//             value={formData.contact}
//             onChange={(e) => handleInputChange('contact', e.target.value)}
//             required
//             placeholder="+1 555-0000"
//             disabled={isLoading}
//           />
//         </div>

//         <div>
//           <Label htmlFor="email">Email</Label>
//           <Input
//             id="email"
//             type="email"
//             value={formData.email}
//             onChange={(e) => handleInputChange('email', e.target.value)}
//             placeholder="patient@email.com"
//             disabled={isLoading}
//           />
//         </div>

//         <div className="md:col-span-2">
//           <Label htmlFor="address">Address</Label>
//           <Input
//             id="address"
//             value={formData.address}
//             onChange={(e) => handleInputChange('address', e.target.value)}
//             placeholder="Full address"
//             disabled={isLoading}
//           />
//         </div>

//         <div>
//           <Label htmlFor="emergencyContact">Emergency Contact</Label>
//           <Input
//             id="emergencyContact"
//             value={formData.emergencyContact}
//             onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
//             placeholder="+1 555-0000"
//             disabled={isLoading}
//           />
//         </div>

//         <div>
//           <Label htmlFor="status">Status</Label>
//           <Select 
//             onValueChange={(value) => handleInputChange('status', value)} 
//             defaultValue="Active"
//             disabled={isLoading}
//             value={formData.status}
//           >
//             <SelectTrigger>
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="Active">Active</SelectItem>
//               <SelectItem value="Inactive">Inactive</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="md:col-span-2">
//           <Label htmlFor="medicalHistory">Medical History</Label>
//           <Input
//             id="medicalHistory"
//             value={formData.medicalHistory}
//             onChange={(e) => handleInputChange('medicalHistory', e.target.value)}
//             placeholder="Enter medical history notes"
//             disabled={isLoading}
//           />
//         </div>
//       </div>

//       <div className="flex justify-end gap-2 pt-4">
//         <Button 
//           onClick={handleSubmit}
//           className="bg-blue-600 hover:bg-blue-700"
//           disabled={isLoading}
//         >
//           {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
//           {isLoading ? 'Adding Patient...' : 'Add Patient'}
//         </Button>
//       </div>
//     </div>
//   );
// };

// const PatientsPage = () => {
//   const [patients, setPatients] = useState<Patient[]>([]);
//   const [activities, setActivities] = useState<Activity[]>([]);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isInitialLoading, setIsInitialLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch patients from API
//   const fetchPatients = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/patients`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch patients');
//       }
//       const result: ApiResponse<Patient[]> = await response.json();
//       if (result.success && result.data) {
//         setPatients(result.data);
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to fetch patients');
//       console.error('Error fetching patients:', err);
//     } finally {
//       setIsInitialLoading(false);
//     }
//   };

//   // Fetch recent activities from API
//   const fetchActivities = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/activities?limit=10`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch activities');
//       }
//       const result: ApiResponse<Activity[]> = await response.json();
//       if (result.success && result.data) {
//         setActivities(result.data);
//       }
//     } catch (err) {
//       console.error('Error fetching activities:', err);
//     }
//   };

//   // Load data on component mount
//   useEffect(() => {
//     fetchPatients();
//     fetchActivities();
//   }, []);

//   const handleAddPatient = async (patientData: Omit<Patient, 'id' | 'patientId' | 'createdAt' | 'updatedAt'>) => {
//     setIsLoading(true);
//     setError(null);
    
//     try {
//       const response = await fetch(`${API_BASE_URL}/patients`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           ...patientData,
//           dateOfBirth: new Date(patientData.dateOfBirth).toISOString(),
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to add patient');
//       }

//       const result: ApiResponse<Patient> = await response.json();
      
//       if (result.success && result.data) {
//         setPatients(prev => [...prev, result.data!]);
//         setIsDialogOpen(false);
//       } else {
//         throw new Error(result.message || 'Failed to add patient');
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to add patient');
//       console.error('Error adding patient:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (isInitialLoading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
//         <span className="ml-2 text-gray-600">Loading patients...</span>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 p-6">
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold text-gray-900">Patient Management</h1>
//         <p className="text-gray-600 mt-2">Manage patient registration, records, and status.</p>
//       </div>
      
//       {error && (
//         <Alert className="border-red-200 bg-red-50">
//           <AlertDescription className="text-red-800">
//             {error}
//           </AlertDescription>
//         </Alert>
//       )}
      
//       <div className="flex justify-between items-center">
//         <h2 className="text-xl font-semibold text-gray-900">
//           Patients ({patients.length})
//         </h2>
//         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//           <DialogTrigger asChild>
//             <Button className="bg-blue-600 hover:bg-blue-700">
//               <Plus className="w-4 h-4 mr-2" />
//               Add Patient
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
//             <DialogHeader>
//               <DialogTitle>Add New Patient</DialogTitle>
//             </DialogHeader>
//             <AddPatientForm onAddPatient={handleAddPatient} isLoading={isLoading} />
//           </DialogContent>
//         </Dialog>
//       </div>

//       <div className="space-y-4">
//         {patients.length === 0 ? (
//           <Card>
//             <CardContent className="p-8 text-center">
//               <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 mb-2">No patients found</h3>
//               <p className="text-gray-600 mb-4">Get started by adding your first patient.</p>
//               <Button 
//                 onClick={() => setIsDialogOpen(true)}
//                 className="bg-blue-600 hover:bg-blue-700"
//               >
//                 <Plus className="w-4 h-4 mr-2" />
//                 Add Patient
//               </Button>
//             </CardContent>
//           </Card>
//         ) : (
//           patients.map((patient) => (
//             <PatientCard key={patient.id} patient={patient} />
//           ))
//         )}
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Recent Activity</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {activities.length === 0 ? (
//             <div className="text-center py-8 text-gray-500">
//               No recent activities found
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b">
//                     <th className="text-left py-3 px-4 font-medium">Patient</th>
//                     <th className="text-left py-3 px-4 font-medium">Doctor</th>
//                     <th className="text-left py-3 px-4 font-medium">Diagnosis</th>
//                     <th className="text-left py-3 px-4 font-medium">Date</th>
//                     <th className="text-left py-3 px-4 font-medium">Department</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {activities.map((activity) => (
//                     <tr key={activity.id} className="border-b hover:bg-gray-50">
//                       <td className="py-3 px-4">{activity.patient.name}</td>
//                       <td className="py-3 px-4">{activity.doctor.name}</td>
//                       <td className="py-3 px-4">{activity.diagnosis}</td>
//                       <td className="py-3 px-4">{new Date(activity.date).toLocaleDateString()}</td>
//                       <td className="py-3 px-4">{activity.department}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default PatientsPage;

// File: components/PatientManager.tsx
import { useState, useEffect } from "react";

interface Patient {
  id: string;
  patientId: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  status: string;
  bloodType: string;
  contact: string;
  email?: string;
  address?: string;
  emergencyContact?: string;
  medicalHistory?: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

const API_BASE_URL = "/api";

const apiService = {
  async getPatients(): Promise<Patient[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/patients`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const text = await response.text();
      if (!text.trim()) {
        throw new Error('Empty response from server');
      }
      
      const result: ApiResponse<Patient[]> = JSON.parse(text);
      if (!result.success) {
        throw new Error(result.message || result.error || 'Failed to fetch patients');
      }
      
      return result.data || [];
    } catch (error) {
      console.error('Error in getPatients:', error);
      throw error;
    }
  },

  async createPatient(patientData: Omit<Patient, "id" | "patientId" | "createdAt" | "updatedAt">): Promise<Patient> {
    try {
      console.log('Sending patient data:', patientData);
      
      const response = await fetch(`${API_BASE_URL}/patients`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          ...patientData,
          dateOfBirth: patientData.dateOfBirth ? new Date(patientData.dateOfBirth).toISOString() : null,
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
      }
      
      const text = await response.text();
      console.log('Response text:', text);
      
      if (!text.trim()) {
        throw new Error('Empty response from server');
      }
      
      const result: ApiResponse<Patient> = JSON.parse(text);
      console.log('Parsed result:', result);
      
      if (!result.success) {
        throw new Error(result.message || result.error || 'Failed to create patient');
      }
      
      if (!result.data) {
        throw new Error('No patient data returned from server');
      }
      
      return result.data;
    } catch (error) {
      console.error('Error in createPatient:', error);
      throw error;
    }
  },
};

const PatientCard = ({ patient }: { patient: Patient }) => (
  <div className="mb-4 bg-white rounded-lg shadow p-6">
    <div className="flex flex-col md:flex-row items-start gap-4">
      <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
        <svg className="w-8 h-8 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
      <div className="flex-1">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="mb-2 md:mb-0">
            <h3 className="font-semibold text-lg text-gray-900">{patient.name}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {patient.gender}, {new Date(patient.dateOfBirth).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h16" />
                </svg>
                {patient.bloodType}
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {patient.contact}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              patient.status === "Active" 
                ? "bg-green-100 text-green-800" 
                : "bg-gray-100 text-gray-800"
            }`}>
              {patient.status}
            </span>
            <span className="text-sm text-gray-500">ID: {patient.patientId}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AddPatientForm = ({
  onAddPatient,
  isLoading,
  onClose,
}: {
  onAddPatient: (patient: Omit<Patient, "id" | "patientId" | "createdAt" | "updatedAt">) => void;
  isLoading: boolean;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    gender: "",
    bloodType: "",
    contact: "",
    email: "",
    address: "",
    emergencyContact: "",
    medicalHistory: "",
    status: "Active",
  });
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const validateForm = () => {
    const errors: string[] = [];
    if (!formData.name.trim()) errors.push("Name is required");
    if (!formData.dateOfBirth) errors.push("Date of Birth is required");
    if (!formData.gender) errors.push("Gender is required");
    if (!formData.bloodType) errors.push("Blood type is required");
    if (!formData.contact.trim()) errors.push("Contact number is required");
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push("Invalid email format");
    }
    
    if (formData.dateOfBirth) {
      const date = new Date(formData.dateOfBirth);
      if (isNaN(date.getTime())) {
        errors.push("Invalid date format");
      } else if (date > new Date()) {
        errors.push("Date of birth cannot be in the future");
      }
    }
    
    setFormErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = () => {
    console.log('Form data before validation:', formData);
    if (validateForm()) {
      console.log('Form is valid, submitting...');
      onAddPatient(formData);
    } else {
      console.log('Form validation failed:', formErrors);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors.length > 0) setFormErrors([]);
  };

  return (
    <div className="space-y-4">
      {formErrors.length > 0 && (
        <div className="border border-red-200 bg-red-50 p-4 rounded">
          <div className="text-red-800">
            <ul className="list-disc list-inside">
              {formErrors.map((err, idx) => <li key={idx}>{err}</li>)}
            </ul>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            disabled={isLoading}
            placeholder="Enter full name"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date of Birth *</label>
          <input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
            disabled={isLoading}
            max={new Date().toISOString().split('T')[0]}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Gender *</label>
          <select
            value={formData.gender}
            onChange={(e) => handleInputChange("gender", e.target.value)}
            disabled={isLoading}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Blood Type *</label>
          <select
            value={formData.bloodType}
            onChange={(e) => handleInputChange("bloodType", e.target.value)}
            disabled={isLoading}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select blood type</option>
            {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Contact *</label>
          <input
            type="text"
            value={formData.contact}
            onChange={(e) => handleInputChange("contact", e.target.value)}
            disabled={isLoading}
            placeholder="Enter phone number"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            disabled={isLoading}
            placeholder="Enter email address"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Address</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            disabled={isLoading}
            placeholder="Enter address"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Emergency Contact</label>
          <input
            type="text"
            value={formData.emergencyContact}
            onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
            disabled={isLoading}
            placeholder="Enter emergency contact"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            value={formData.status}
            onChange={(e) => handleInputChange("status", e.target.value)}
            disabled={isLoading}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Medical History</label>
          <textarea
            value={formData.medicalHistory}
            onChange={(e) => handleInputChange("medicalHistory", e.target.value)}
            disabled={isLoading}
            placeholder="Enter medical history"
            rows={3}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <button
          onClick={onClose}
          disabled={isLoading}
          className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Adding..." : "Add Patient"}
        </button>
      </div>
    </div>
  );
};

const PatientManager = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addingPatient, setAddingPatient] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Demo data for display purposes
  const demoPatients: Patient[] = [
    {
      id: "1",
      patientId: "P001",
      name: "John Doe",
      dateOfBirth: "1985-06-15",
      gender: "Male",
      status: "Active",
      bloodType: "A+",
      contact: "+1-555-0123",
      email: "john.doe@email.com",
      address: "123 Main St, City, State",
      emergencyContact: "+1-555-0456",
      medicalHistory: "No significant medical history",
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z"
    },
    {
      id: "2",
      patientId: "P002",
      name: "Jane Smith",
      dateOfBirth: "1990-03-22",
      gender: "Female",
      status: "Active",
      bloodType: "B-",
      contact: "+1-555-0789",
      email: "jane.smith@email.com",
      address: "456 Oak Ave, City, State",
      emergencyContact: "+1-555-0321",
      medicalHistory: "Allergic to penicillin",
      createdAt: "2024-01-16T14:30:00Z",
      updatedAt: "2024-01-16T14:30:00Z"
    }
  ];

  useEffect(() => {
    // Simulate loading demo data
    const loadPatients = async () => {
      try {
        setLoading(true);
        // In a real app, this would call apiService.getPatients()
        await new Promise(resolve => setTimeout(resolve, 1000));
        setPatients(demoPatients);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load patients');
      } finally {
        setLoading(false);
      }
    };

    loadPatients();
  }, []);

  const handleAddPatient = async (patientData: Omit<Patient, "id" | "patientId" | "createdAt" | "updatedAt">) => {
    try {
      setAddingPatient(true);
      // In a real app, this would call apiService.createPatient(patientData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create new patient with generated ID
      const newPatient: Patient = {
        ...patientData,
        id: Math.random().toString(36).substr(2, 9),
        patientId: `P${String(patients.length + 1).padStart(3, '0')}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setPatients(prev => [...prev, newPatient]);
      setShowAddForm(false);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add patient');
    } finally {
      setAddingPatient(false);
    }
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.contact.includes(searchTerm)
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading patients...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Patient Management</h1>
                <p className="text-gray-600 mt-1">Manage patient records and information</p>
              </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Patient
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="p-6 border-b border-gray-200">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search patients by name, ID, or contact..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Add Patient Form */}
          {showAddForm && (
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold mb-4">Add New Patient</h2>
              <AddPatientForm
                onAddPatient={handleAddPatient}
                isLoading={addingPatient}
                onClose={() => setShowAddForm(false)}
              />
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-6 border-b border-gray-200">
              <div className="bg-red-50 border border-red-200 rounded p-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-red-800">{error}</span>
                </div>
              </div>
            </div>
          )}

          {/* Patient List */}
          <div className="p-6">
            {filteredPatients.length === 0 ? (
              <div className="text-center py-8">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No patients found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding a new patient'}
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    Showing {filteredPatients.length} of {patients.length} patients
                  </p>
                </div>
                <div className="space-y-4">
                  {filteredPatients.map((patient) => (
                    <PatientCard key={patient.id} patient={patient} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientManager;