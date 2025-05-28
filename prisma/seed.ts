import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create doctors
  const doctor1 = await prisma.doctor.create({
    data: {
      name: 'Dr. Sarah Wilson',
      speciality: 'Cardiology',
      department: 'Cardiology',
      contact: '+1 555-0001',
      email: 'sarah.wilson@hospital.com'
    }
  })

  const doctor2 = await prisma.doctor.create({
    data: {
      name: 'Dr. John Smith',
      speciality: 'General Medicine',
      department: 'General Medicine',
      contact: '+1 555-0002',
      email: 'john.smith@hospital.com'
    }
  })

  // Create patients
  const patient1 = await prisma.patient.create({
    data: {
      patientId: 'PT-2025-12345',
      name: 'Aryan Sharma',
      dateOfBirth: new Date('1985-05-15'),
      gender: 'Male',
      bloodType: 'O+',
      contact: '+1 555-1234',
      email: 'aryan@email.com',
      address: '123 Main St, City',
      emergencyContact: '+1 555-9999'
    }
  })

  const patient2 = await prisma.patient.create({
    data: {
      patientId: 'PT-2025-23456',
      name: 'Smith Johnson',
      dateOfBirth: new Date('1990-10-20'),
      gender: 'Female',
      bloodType: 'A-',
      contact: '+1 555-2345',
      email: 'smith@email.com',
      address: '456 Oak Ave, City',
      emergencyContact: '+1 555-8888'
    }
  })

  // Create activities
  await prisma.activity.create({
    data: {
      patientId: patient1.id,
      doctorId: doctor1.id,
      diagnosis: 'Unstable angina',
      notes: 'Chest pain and shortness of breath',
      department: 'Cardiology',
      date: new Date('2025-04-15')
    }
  })

  await prisma.activity.create({
    data: {
      patientId: patient2.id,
      doctorId: doctor1.id,
      diagnosis: 'Coronary artery disease',
      notes: 'Follow-up for unstable angina',
      department: 'Cardiology',
      date: new Date('2025-04-20')
    }
  })

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })