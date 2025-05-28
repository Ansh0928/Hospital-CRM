import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { prisma } from '../lib/prisma'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Generate patient ID helper
const generatePatientId = () => {
  const year = new Date().getFullYear()
  const randomNum = Math.floor(Math.random() * 90000) + 10000
  return `PT-${year}-${randomNum}`
}

// Routes

// GET /api/patients - Get all patients
app.get('/api/patients', async (req, res) => {
  try {
    const patients = await prisma.patient.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        activities: {
          include: { doctor: true },
          orderBy: { date: 'desc' },
          take: 5
        }
      }
    })
    res.json(patients)
  } catch (error) {
    console.error('Error fetching patients:', error)
    res.status(500).json({ error: 'Failed to fetch patients' })
  }
})

// POST /api/patients - Create new patient
app.post('/api/patients', async (req, res) => {
  try {
    const {
      name,
      dateOfBirth,
      gender,
      bloodType,
      contact,
      email,
      address,
      emergencyContact,
      medicalHistory,
      status
    } = req.body

    // Validate required fields
    if (!name || !dateOfBirth || !gender || !bloodType || !contact) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const patientId = generatePatientId()

    const patient = await prisma.patient.create({
      data: {
        patientId,
        name,
        dateOfBirth: new Date(dateOfBirth),
        gender,
        bloodType,
        contact,
        email: email || null,
        address: address || null,
        emergencyContact: emergencyContact || null,
        medicalHistory: medicalHistory || null,
        status: status || 'Active'
      }
    })

    res.status(201).json(patient)
  } catch (error) {
    console.error('Error creating patient:', error)
    res.status(500).json({ error: 'Failed to create patient' })
  }
})

// GET /api/patients/:id - Get patient by ID
app.get('/api/patients/:id', async (req, res) => {
  try {
    const { id } = req.params
    const patient = await prisma.patient.findUnique({
      where: { id },
      include: {
        activities: {
          include: { doctor: true },
          orderBy: { date: 'desc' }
        },
        appointments: {
          include: { doctor: true },
          orderBy: { date: 'desc' }
        }
      }
    })

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' })
    }

    res.json(patient)
  } catch (error) {
    console.error('Error fetching patient:', error)
    res.status(500).json({ error: 'Failed to fetch patient' })
  }
})

// PUT /api/patients/:id - Update patient
app.put('/api/patients/:id', async (req, res) => {
  try {
    const { id } = req.params
    const updateData = req.body

    // Remove id from updateData if present
    delete updateData.id

    const patient = await prisma.patient.update({
      where: { id },
      data: {
        ...updateData,
        dateOfBirth: updateData.dateOfBirth ? new Date(updateData.dateOfBirth) : undefined
      }
    })

    res.json(patient)
  } catch (error) {
    console.error('Error updating patient:', error)
    res.status(500).json({ error: 'Failed to update patient' })
  }
})

// DELETE /api/patients/:id - Delete patient
app.delete('/api/patients/:id', async (req, res) => {
  try {
    const { id } = req.params

    // Delete related activities and appointments first
    await prisma.activity.deleteMany({ where: { patientId: id } })
    await prisma.appointment.deleteMany({ where: { patientId: id } })

    // Delete patient
    await prisma.patient.delete({ where: { id } })

    res.json({ message: 'Patient deleted successfully' })
  } catch (error) {
    console.error('Error deleting patient:', error)
    res.status(500).json({ error: 'Failed to delete patient' })
  }
})

// GET /api/activities - Get recent activities
app.get('/api/activities', async (req, res) => {
  try {
    const activities = await prisma.activity.findMany({
      include: {
        patient: true,
        doctor: true
      },
      orderBy: { date: 'desc' },
      take: 10
    })
    res.json(activities)
  } catch (error) {
    console.error('Error fetching activities:', error)
    res.status(500).json({ error: 'Failed to fetch activities' })
  }
})

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})