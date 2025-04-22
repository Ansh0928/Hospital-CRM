
export type UserRole = 'admin' | 'doctor' | 'staff' | 'lab' | 'pharmacist';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface Patient {
  id: string;
  uniqueId: string;
  name: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  contactNumber: string;
  email: string;
  address: string;
  status: 'active' | 'inactive';
  medicalHistory?: MedicalHistory[];
  appointments?: Appointment[];
}

export interface MedicalHistory {
  id: string;
  patientId: string;
  date: string;
  diagnosis: string;
  treatment: string;
  notes: string;
  attachments?: string[];
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  followUp?: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  email: string;
  contactNumber: string;
  availableDays: string[];
  availableHours: {
    start: string;
    end: string;
  };
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  medicines: Medicine[];
  instructions: string;
  diagnosis: string;
}

export interface Medicine {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes?: string;
  stock?: number;
}

export interface Invoice {
  id: string;
  patientId: string;
  date: string;
  items: InvoiceItem[];
  total: number;
  status: 'paid' | 'pending' | 'overdue';
  insuranceClaim?: InsuranceClaim;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface InsuranceClaim {
  id: string;
  invoiceId: string;
  insuranceProvider: string;
  policyNumber: string;
  status: 'submitted' | 'processing' | 'approved' | 'rejected';
  submissionDate: string;
  approvalDate?: string;
  rejectionDate?: string;
  rejectionReason?: string;
}

export interface LabReport {
  id: string;
  patientId: string;
  doctorId: string;
  labTechnicianId: string;
  testType: string;
  testDate: string;
  reportDate: string;
  results: string;
  normalRange?: string;
  interpretation?: string;
  attachments?: string[];
}

export interface DashboardStats {
  totalPatients: number;
  activePatients: number;
  appointmentsToday: number;
  pendingLabReports: number;
  revenue: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  patientsByDepartment: {
    department: string;
    count: number;
  }[];
  appointmentsTrend: {
    date: string;
    count: number;
  }[];
}
