const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'

export interface PatientData {
  name: string
  dateOfBirth: string
  gender: string
  bloodType: string
  contact: string
  email?: string
  address?: string
  emergencyContact?: string
  medicalHistory?: string
  status?: string
}

export interface Patient {
  id: string
  patientId: string
  name: string
  dateOfBirth: string
  gender: string
  bloodType: string
  contact: string
  email?: string
  address?: string
  emergencyContact?: string
  medicalHistory?: string
  status: string
  createdAt: string
  updatedAt: string
  activities?: Activity[]
  appointments?: Appointment[]
}

export interface Activity {
  id: string
  patientId: string
  doctorId: string
  diagnosis: string
  notes?: string
  department: string
  date: string
  doctor: {
    name: string
    speciality: string
    department: string
  }
}

export interface Appointment {
  id: string
  patientId: string
  doctorId: string
  date: string
  time: string
  reason?: string
  status: string
  notes?: string
  doctor: {
    name: string
    speciality: string
    department: string
  }
}

class PatientService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }))
      throw new Error(error.error || `HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  async getPatients(): Promise<Patient[]> {
    return this.request<Patient[]>('/api/patients')
  }

  async createPatient(patientData: PatientData): Promise<Patient> {
    return this.request<Patient>('/api/patients', {
      method: 'POST',
      body: JSON.stringify(patientData),
    })
  }

  async getPatient(id: string): Promise<Patient> {
    return this.request<Patient>(`/api/patients/${id}`)
  }

  async updatePatient(id: string, patientData: Partial<PatientData>): Promise<Patient> {
    return this.request<Patient>(`/api/patients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(patientData),
    })
  }

  async deletePatient(id: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/api/patients/${id}`, {
      method: 'DELETE',
    })
  }

  async getActivities(): Promise<Activity[]> {
    return this.request<Activity[]>('/api/activities')
  }
}

export const patientService = new PatientService()