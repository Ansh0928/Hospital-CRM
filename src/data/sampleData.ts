
import { 
  Patient, 
  Doctor, 
  Appointment, 
  Prescription, 
  Medicine,
  Invoice,
  LabReport,
  DashboardStats
} from '@/types';

// Generate a random ID
const generateId = () => Math.random().toString(36).substring(2, 10);

// Generate a patient unique ID with format PT-YYYY-XXXXX
const generatePatientId = () => {
  const year = new Date().getFullYear();
  const random = Math.floor(10000 + Math.random() * 90000);
  return `PT-${year}-${random}`;
};

// Sample Patients
export const patients: Patient[] = [
  {
    id: '1',
    uniqueId: 'PT-2025-12345',
    name: 'John Doe',
    dateOfBirth: '1985-05-15',
    gender: 'male',
    contactNumber: '(555) 123-4567',
    email: 'john.doe@example.com',
    address: '123 Main St, Anytown, USA',
    status: 'active',
  },
  {
    id: '2',
    uniqueId: 'PT-2025-23456',
    name: 'Jane Smith',
    dateOfBirth: '1990-10-20',
    gender: 'female',
    contactNumber: '(555) 234-5678',
    email: 'jane.smith@example.com',
    address: '456 Oak Ave, Somewhere, USA',
    status: 'active',
  },
  {
    id: '3',
    uniqueId: 'PT-2025-34567',
    name: 'Robert Johnson',
    dateOfBirth: '1978-03-08',
    gender: 'male',
    contactNumber: '(555) 345-6789',
    email: 'robert.johnson@example.com',
    address: '789 Pine Rd, Nowhere, USA',
    status: 'inactive',
  },
  {
    id: '4',
    uniqueId: 'PT-2025-45678',
    name: 'Emily Davis',
    dateOfBirth: '1995-12-15',
    gender: 'female',
    contactNumber: '(555) 456-7890',
    email: 'emily.davis@example.com',
    address: '101 Cedar Ln, Anyplace, USA',
    status: 'active',
  },
  {
    id: '5',
    uniqueId: 'PT-2025-56789',
    name: 'Michael Wilson',
    dateOfBirth: '1982-07-22',
    gender: 'male',
    contactNumber: '(555) 567-8901',
    email: 'michael.wilson@example.com',
    address: '202 Elm St, Someplace, USA',
    status: 'inactive',
  },
];

// Sample Doctors
export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiology',
    email: 'sarah.johnson@vitacare.com',
    contactNumber: '(555) 111-2222',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    availableHours: {
      start: '09:00',
      end: '17:00',
    },
  },
  {
    id: '2',
    name: 'Dr. David Lee',
    specialization: 'Pediatrics',
    email: 'david.lee@vitacare.com',
    contactNumber: '(555) 222-3333',
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    availableHours: {
      start: '08:00',
      end: '16:00',
    },
  },
  {
    id: '3',
    name: 'Dr. Maria Rodriguez',
    specialization: 'Neurology',
    email: 'maria.rodriguez@vitacare.com',
    contactNumber: '(555) 333-4444',
    availableDays: ['Tuesday', 'Thursday', 'Friday'],
    availableHours: {
      start: '10:00',
      end: '18:00',
    },
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialization: 'Orthopedics',
    email: 'james.wilson@vitacare.com',
    contactNumber: '(555) 444-5555',
    availableDays: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    availableHours: {
      start: '08:30',
      end: '16:30',
    },
  },
];

// Sample Appointments
export const appointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    doctorId: '1',
    date: '2025-04-25',
    time: '10:00',
    status: 'scheduled',
    notes: 'Follow-up appointment for heart condition',
  },
  {
    id: '2',
    patientId: '2',
    doctorId: '2',
    date: '2025-04-23',
    time: '14:30',
    status: 'scheduled',
    notes: 'Annual check-up',
  },
  {
    id: '3',
    patientId: '3',
    doctorId: '3',
    date: '2025-04-22',
    time: '11:15',
    status: 'completed',
    notes: 'Headache consultation',
  },
  {
    id: '4',
    patientId: '4',
    doctorId: '4',
    date: '2025-04-26',
    time: '09:45',
    status: 'scheduled',
    notes: 'Post-operation check',
  },
  {
    id: '5',
    patientId: '1',
    doctorId: '1',
    date: '2025-04-15',
    time: '13:00',
    status: 'completed',
    notes: 'Initial consultation',
    followUp: true,
  },
];

// Sample Medicines
export const medicines: Medicine[] = [
  {
    id: '1',
    name: 'Amoxicillin',
    dosage: '500mg',
    frequency: 'Three times a day',
    duration: '7 days',
    stock: 150,
  },
  {
    id: '2',
    name: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    duration: '30 days',
    stock: 200,
  },
  {
    id: '3',
    name: 'Metformin',
    dosage: '850mg',
    frequency: 'Twice daily with meals',
    duration: '30 days',
    stock: 180,
  },
  {
    id: '4',
    name: 'Atorvastatin',
    dosage: '20mg',
    frequency: 'Once daily at bedtime',
    duration: '30 days',
    stock: 120,
  },
  {
    id: '5',
    name: 'Albuterol Inhaler',
    dosage: '90mcg/puff',
    frequency: 'As needed for breathing',
    duration: 'PRN',
    notes: 'Use 2 puffs every 4-6 hours as needed',
    stock: 75,
  },
];

// Sample Prescriptions
export const prescriptions: Prescription[] = [
  {
    id: '1',
    patientId: '1',
    doctorId: '1',
    date: '2025-04-15',
    medicines: [medicines[1], medicines[3]],
    instructions: 'Take medicines with water. Avoid alcohol.',
    diagnosis: 'Hypertension and high cholesterol',
  },
  {
    id: '2',
    patientId: '2',
    doctorId: '2',
    date: '2025-04-18',
    medicines: [medicines[0]],
    instructions: 'Complete full course even if symptoms improve.',
    diagnosis: 'Bacterial infection',
  },
  {
    id: '3',
    patientId: '3',
    doctorId: '3',
    date: '2025-04-22',
    medicines: [
      {
        id: '6',
        name: 'Sumatriptan',
        dosage: '50mg',
        frequency: 'As needed for migraine',
        duration: 'PRN',
        notes: 'Not to exceed 200mg in 24 hours',
      },
    ],
    instructions: 'Take at first sign of migraine. Rest in dark, quiet room.',
    diagnosis: 'Migraine headache',
  },
];

// Sample Invoices
export const invoices: Invoice[] = [
  {
    id: '1',
    patientId: '1',
    date: '2025-04-15',
    items: [
      {
        id: '1',
        description: 'Consultation - Cardiology',
        quantity: 1,
        unitPrice: 200,
        total: 200,
      },
      {
        id: '2',
        description: 'ECG',
        quantity: 1,
        unitPrice: 150,
        total: 150,
      },
      {
        id: '3',
        description: 'Blood Work',
        quantity: 1,
        unitPrice: 120,
        total: 120,
      },
    ],
    total: 470,
    status: 'paid',
    insuranceClaim: {
      id: '1',
      invoiceId: '1',
      insuranceProvider: 'MediCover',
      policyNumber: 'MC-123456',
      status: 'approved',
      submissionDate: '2025-04-16',
      approvalDate: '2025-04-20',
    },
  },
  {
    id: '2',
    patientId: '2',
    date: '2025-04-18',
    items: [
      {
        id: '4',
        description: 'Consultation - Pediatrics',
        quantity: 1,
        unitPrice: 150,
        total: 150,
      },
      {
        id: '5',
        description: 'Vaccination',
        quantity: 2,
        unitPrice: 80,
        total: 160,
      },
    ],
    total: 310,
    status: 'pending',
    insuranceClaim: {
      id: '2',
      invoiceId: '2',
      insuranceProvider: 'HealthPlus',
      policyNumber: 'HP-789012',
      status: 'submitted',
      submissionDate: '2025-04-19',
    },
  },
  {
    id: '3',
    patientId: '3',
    date: '2025-04-22',
    items: [
      {
        id: '6',
        description: 'Consultation - Neurology',
        quantity: 1,
        unitPrice: 250,
        total: 250,
      },
      {
        id: '7',
        description: 'MRI - Brain',
        quantity: 1,
        unitPrice: 800,
        total: 800,
      },
    ],
    total: 1050,
    status: 'overdue',
    insuranceClaim: {
      id: '3',
      invoiceId: '3',
      insuranceProvider: 'MediShield',
      policyNumber: 'MS-345678',
      status: 'rejected',
      submissionDate: '2025-04-23',
      rejectionDate: '2025-04-28',
      rejectionReason: 'Service not covered under current policy.',
    },
  },
];

// Sample Lab Reports
export const labReports: LabReport[] = [
  {
    id: '1',
    patientId: '1',
    doctorId: '1',
    labTechnicianId: '1',
    testType: 'Complete Blood Count',
    testDate: '2025-04-15',
    reportDate: '2025-04-16',
    results: 'WBC: 8.2, RBC: 4.8, Hemoglobin: 14.5, Hematocrit: 42%, Platelets: 250',
    normalRange: 'WBC: 4.5-11.0, RBC: 4.5-5.5, Hemoglobin: 13.5-17.5, Hematocrit: 41-50%, Platelets: 150-450',
    interpretation: 'All values within normal range.',
  },
  {
    id: '2',
    patientId: '1',
    doctorId: '1',
    labTechnicianId: '1',
    testType: 'Lipid Panel',
    testDate: '2025-04-15',
    reportDate: '2025-04-16',
    results: 'Total Cholesterol: 220, HDL: 45, LDL: 150, Triglycerides: 170',
    normalRange: 'Total Cholesterol: <200, HDL: >40, LDL: <130, Triglycerides: <150',
    interpretation: 'Elevated total cholesterol, LDL, and triglycerides. Recommend dietary changes and possibly medication.',
  },
  {
    id: '3',
    patientId: '3',
    doctorId: '3',
    labTechnicianId: '1',
    testType: 'CT Scan - Head',
    testDate: '2025-04-22',
    reportDate: '2025-04-23',
    results: 'No acute intracranial abnormality. No mass effect or midline shift. Ventricles are normal in size and configuration.',
    interpretation: 'Normal CT scan with no evidence of structural abnormalities that would explain headaches.',
  },
];

// Sample Dashboard Stats
export const dashboardStats: DashboardStats = {
  totalPatients: 243,
  activePatients: 198,
  appointmentsToday: 28,
  pendingLabReports: 12,
  revenue: {
    daily: 3250,
    weekly: 22800,
    monthly: 95600,
  },
  patientsByDepartment: [
    { department: 'Cardiology', count: 68 },
    { department: 'Pediatrics', count: 45 },
    { department: 'Neurology', count: 37 },
    { department: 'Orthopedics', count: 52 },
    { department: 'Internal Medicine', count: 41 },
  ],
  appointmentsTrend: [
    { date: '2025-04-16', count: 24 },
    { date: '2025-04-17', count: 26 },
    { date: '2025-04-18', count: 22 },
    { date: '2025-04-19', count: 18 },
    { date: '2025-04-20', count: 15 },
    { date: '2025-04-21', count: 27 },
    { date: '2025-04-22', count: 29 },
  ],
};

// Helper functions to get related data
export const getPatientById = (id: string) => patients.find(patient => patient.id === id);
export const getDoctorById = (id: string) => doctors.find(doctor => doctor.id === id);
export const getAppointmentsByPatientId = (patientId: string) => appointments.filter(appointment => appointment.patientId === patientId);
export const getAppointmentsByDoctorId = (doctorId: string) => appointments.filter(appointment => appointment.doctorId === doctorId);
export const getPrescriptionsByPatientId = (patientId: string) => prescriptions.filter(prescription => prescription.patientId === patientId);
export const getInvoicesByPatientId = (patientId: string) => invoices.filter(invoice => invoice.patientId === patientId);
export const getLabReportsByPatientId = (patientId: string) => labReports.filter(report => report.patientId === patientId);

// Generate a new patient
export const generateNewPatient = (patientData: Partial<Patient>): Patient => {
  return {
    id: generateId(),
    uniqueId: generatePatientId(),
    name: patientData.name || '',
    dateOfBirth: patientData.dateOfBirth || '',
    gender: patientData.gender || 'other',
    contactNumber: patientData.contactNumber || '',
    email: patientData.email || '',
    address: patientData.address || '',
    status: patientData.status || 'active',
  };
};
