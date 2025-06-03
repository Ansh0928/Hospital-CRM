// const express = require('express');
// const cors = require('cors');
// const { PrismaClient } = require('@prisma/client');
// const { v4: uuidv4 } = require('uuid');
// require('dotenv').config();

// const app = express();
// const prisma = new PrismaClient();
// const PORT = process.env.PORT || 3001;

// // Middleware
// app.use(cors({
//   origin: process.env.CORS_ORIGIN || ['http://localhost:5173', 'http://localhost:5175'],
//   credentials: true
// }));
// app.use(express.json());

// // Helper function to generate patient ID
// const generatePatientId = () => {
//   return `PAT-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
// };

// // Routes

// // Get all patients
// app.get('/api/patients', async (req, res) => {
//   try {
//     const patients = await prisma.patient.findMany({
//       orderBy: {
//         createdAt: 'desc'
//       }
//     });
    
//     res.json({
//       success: true,
//       data: patients
//     });
//   } catch (error) {
//     console.error('Error fetching patients:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch patients'
//     });
//   }
// });

// // Get patient by ID
// app.get('/api/patients/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     const patient = await prisma.patient.findUnique({
//       where: { id },
//       include: {
//         activities: {
//           include: {
//             doctor: true
//           },
//           orderBy: {
//             date: 'desc'
//           }
//         }
//       }
//     });
    
//     if (!patient) {
//       return res.status(404).json({
//         success: false,
//         message: 'Patient not found'
//       });
//     }
    
//     res.json({
//       success: true,
//       data: patient
//     });
//   } catch (error) {
//     console.error('Error fetching patient:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch patient'
//     });
//   }
// });

// // Create new patient
// app.post('/api/patients', async (req, res) => {
//   try {
//     const {
//       name,
//       dateOfBirth,
//       gender,
//       bloodType,
//       contact,
//       email,
//       address,
//       emergencyContact,
//       medicalHistory,
//       status = 'Active'
//     } = req.body;

//     // Validate required fields
//     if (!name || !dateOfBirth || !gender || !bloodType || !contact) {
//       return res.status(400).json({
//         success: false,
//         message: 'Missing required fields: name, dateOfBirth, gender, bloodType, contact'
//       });
//     }

//     // Create patient
//     const patient = await prisma.patient.create({
//       data: {
//         patientId: generatePatientId(),
//         name,
//         dateOfBirth: new Date(dateOfBirth),
//         gender,
//         bloodType,
//         contact,
//         email: email || null,
//         address: address || null,
//         emergencyContact: emergencyContact || null,
//         medicalHistory: medicalHistory || null,
//         status
//       }
//     });

//     res.status(201).json({
//       success: true,
//       data: patient,
//       message: 'Patient created successfully'
//     });
//   } catch (error) {
//     console.error('Error creating patient:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to create patient'
//     });
//   }
// });

// // Update patient
// app.put('/api/patients/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updateData = req.body;

//     // Convert dateOfBirth to Date object if provided
//     if (updateData.dateOfBirth) {
//       updateData.dateOfBirth = new Date(updateData.dateOfBirth);
//     }

//     const patient = await prisma.patient.update({
//       where: { id },
//       data: updateData
//     });

//     res.json({
//       success: true,
//       data: patient,
//       message: 'Patient updated successfully'
//     });
//   } catch (error) {
//     console.error('Error updating patient:', error);
//     if (error.code === 'P2025') {
//       return res.status(404).json({
//         success: false,
//         message: 'Patient not found'
//       });
//     }
//     res.status(500).json({
//       success: false,
//       message: 'Failed to update patient'
//     });
//   }
// });

// // Delete patient
// app.delete('/api/patients/:id', async (req, res) => {
//   try {
//     const { id } = req.params;

//     await prisma.patient.delete({
//       where: { id }
//     });

//     res.json({
//       success: true,
//       message: 'Patient deleted successfully'
//     });
//   } catch (error) {
//     console.error('Error deleting patient:', error);
//     if (error.code === 'P2025') {
//       return res.status(404).json({
//         success: false,
//         message: 'Patient not found'
//       });
//     }
//     res.status(500).json({
//       success: false,
//       message: 'Failed to delete patient'
//     });
//   }
// });

// // Get recent activities
// app.get('/api/activities', async (req, res) => {
//   try {
//     const { limit = 10 } = req.query;
    
//     const activities = await prisma.activity.findMany({
//       take: parseInt(limit),
//       orderBy: {
//         date: 'desc'
//       },
//       include: {
//         patient: {
//           select: {
//             name: true
//           }
//         },
//         doctor: {
//           select: {
//             name: true
//           }
//         }
//       }
//     });

//     res.json({
//       success: true,
//       data: activities
//     });
//   } catch (error) {
//     console.error('Error fetching activities:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch activities'
//     });
//   }
// });

// // Create new activity
// app.post('/api/activities', async (req, res) => {
//   try {
//     const {
//       patientId,
//       doctorId,
//       diagnosis,
//       notes,
//       department,
//       date
//     } = req.body;

//     if (!patientId || !doctorId || !diagnosis || !department) {
//       return res.status(400).json({
//         success: false,
//         message: 'Missing required fields: patientId, doctorId, diagnosis, department'
//       });
//     }

//     const activity = await prisma.activity.create({
//       data: {
//         patientId,
//         doctorId,
//         diagnosis,
//         notes: notes || null,
//         department,
//         date: date ? new Date(date) : new Date()
//       },
//       include: {
//         patient: {
//           select: {
//             name: true
//           }
//         },
//         doctor: {
//           select: {
//             name: true
//           }
//         }
//       }
//     });

//     res.status(201).json({
//       success: true,
//       data: activity,
//       message: 'Activity created successfully'
//     });
//   } catch (error) {
//     console.error('Error creating activity:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to create activity'
//     });
//   }
// });

// // Create sample doctor (for testing)
// app.post('/api/doctors', async (req, res) => {
//   try {
//     const { name, speciality, department } = req.body;

//     if (!name || !department) {
//       return res.status(400).json({
//         success: false,
//         message: 'Missing required fields: name, department'
//       });
//     }

//     const doctor = await prisma.doctor.create({
//       data: {
//         name,
//         speciality: speciality || null,
//         department
//       }
//     });

//     res.status(201).json({
//       success: true,
//       data: doctor,
//       message: 'Doctor created successfully'
//     });
//   } catch (error) {
//     console.error('Error creating doctor:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to create doctor'
//     });
//   }
// });

// // Get all doctors
// app.get('/api/doctors', async (req, res) => {
//   try {
//     const doctors = await prisma.doctor.findMany({
//       orderBy: {
//         name: 'asc'
//       }
//     });

//     res.json({
//       success: true,
//       data: doctors
//     });
//   } catch (error) {
//     console.error('Error fetching doctors:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch doctors'
//     });
//   }
// });

// // Health check endpoint
// app.get('/api/health', (req, res) => {
//   res.json({
//     success: true,
//     message: 'Server is running',
//     timestamp: new Date().toISOString()
//   });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     success: false,
//     message: 'Something went wrong!'
//   });
// });

// // 404 handler
// app.use('*', (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: 'Route not found'
//   });
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`📊 Environment: ${process.env.NODE_ENV}`);
//   console.log(`🌐 CORS Origin: ${process.env.CORS_ORIGIN}`);
// });

// // Graceful shutdown
// process.on('SIGINT', async () => {
//   console.log('🛑 Shutting down server...');
//   await prisma.$disconnect();
//   process.exit(0);
// });

// import express from 'express';
// import cors from 'cors';
// import { PrismaClient } from '@prisma/client';
// import { v4 as uuidv4 } from 'uuid';
// import dotenv from 'dotenv';

// dotenv.config();

// const app = express();
// const prisma = new PrismaClient();
// const PORT = process.env.PORT || 3001;

// console.log("🔥 SERVER.JS IS RUNNING!");

// // Middleware
// app.use(cors({
//   origin: process.env.CORS_ORIGIN || ['http://localhost:5173', 'http://localhost:5175'],
//   credentials: true
// }));
// app.use(express.json());

// // Helper function to generate patient ID
// const generatePatientId = () => {
//   return `PAT-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
// };

// // Routes

// // Get all patients
// app.get('/api/patients', async (req, res) => {
//   try {
//     const patients = await prisma.patient.findMany({
//       orderBy: {
//         createdAt: 'desc'
//       }
//     });
    
//     res.json({
//       success: true,
//       data: patients
//     });
//   } catch (error) {
//     console.error('Error fetching patients:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch patients'
//     });
//   }
// });

// // Get patient by ID
// app.get('/api/patients/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     const patient = await prisma.patient.findUnique({
//       where: { id },
//       include: {
//         activities: {
//           include: {
//             doctor: true
//           },
//           orderBy: {
//             date: 'desc'
//           }
//         }
//       }
//     });
    
//     if (!patient) {
//       return res.status(404).json({
//         success: false,
//         message: 'Patient not found'
//       });
//     }
    
//     res.json({
//       success: true,
//       data: patient
//     });
//   } catch (error) {
//     console.error('Error fetching patient:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch patient'
//     });
//   }
// });

// // Create new patient
// app.post('/api/patients', async (req, res) => {
//   try {
//     const {
//       name,
//       dateOfBirth,
//       gender,
//       bloodType,
//       contact,
//       email,
//       address,
//       emergencyContact,
//       medicalHistory,
//       status = 'Active'
//     } = req.body;

//     // Validate required fields
//     if (!name || !dateOfBirth || !gender || !bloodType || !contact) {
//       return res.status(400).json({
//         success: false,
//         message: 'Missing required fields: name, dateOfBirth, gender, bloodType, contact'
//       });
//     }

//     // Create patient
//     const patient = await prisma.patient.create({
//       data: {
//         patientId: generatePatientId(),
//         name,
//         dateOfBirth: new Date(dateOfBirth),
//         gender,
//         bloodType,
//         contact,
//         email: email || null,
//         address: address || null,
//         emergencyContact: emergencyContact || null,
//         medicalHistory: medicalHistory || null,
//         status
//       }
//     });

//     res.status(201).json({
//       success: true,
//       data: patient,
//       message: 'Patient created successfully'
//     });
//   } catch (error) {
//     console.error('Error creating patient:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to create patient'
//     });
//   }
// });

// // Update patient
// app.put('/api/patients/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updateData = req.body;

//     // Convert dateOfBirth to Date object if provided
//     if (updateData.dateOfBirth) {
//       updateData.dateOfBirth = new Date(updateData.dateOfBirth);
//     }

//     const patient = await prisma.patient.update({
//       where: { id },
//       data: updateData
//     });

//     res.json({
//       success: true,
//       data: patient,
//       message: 'Patient updated successfully'
//     });
//   } catch (error) {
//     console.error('Error updating patient:', error);
//     if (error.code === 'P2025') {
//       return res.status(404).json({
//         success: false,
//         message: 'Patient not found'
//       });
//     }
//     res.status(500).json({
//       success: false,
//       message: 'Failed to update patient'
//     });
//   }
// });

// // Delete patient
// app.delete('/api/patients/:id', async (req, res) => {
//   try {
//     const { id } = req.params;

//     await prisma.patient.delete({
//       where: { id }
//     });

//     res.json({
//       success: true,
//       message: 'Patient deleted successfully'
//     });
//   } catch (error) {
//     console.error('Error deleting patient:', error);
//     if (error.code === 'P2025') {
//       return res.status(404).json({
//         success: false,
//         message: 'Patient not found'
//       });
//     }
//     res.status(500).json({
//       success: false,
//       message: 'Failed to delete patient'
//     });
//   }
// });

// // Get recent activities
// app.get('/api/activities', async (req, res) => {
//   try {
//     const { limit = 10 } = req.query;
    
//     const activities = await prisma.activity.findMany({
//       take: parseInt(limit),
//       orderBy: {
//         date: 'desc'
//       },
//       include: {
//         patient: {
//           select: {
//             name: true
//           }
//         },
//         doctor: {
//           select: {
//             name: true
//           }
//         }
//       }
//     });

//     res.json({
//       success: true,
//       data: activities
//     });
//   } catch (error) {
//     console.error('Error fetching activities:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch activities'
//     });
//   }
// });

// // Create new activity
// app.post('/api/activities', async (req, res) => {
//   try {
//     const {
//       patientId,
//       doctorId,
//       diagnosis,
//       notes,
//       department,
//       date
//     } = req.body;

//     if (!patientId || !doctorId || !diagnosis || !department) {
//       return res.status(400).json({
//         success: false,
//         message: 'Missing required fields: patientId, doctorId, diagnosis, department'
//       });
//     }

//     const activity = await prisma.activity.create({
//       data: {
//         patientId,
//         doctorId,
//         diagnosis,
//         notes: notes || null,
//         department,
//         date: date ? new Date(date) : new Date()
//       },
//       include: {
//         patient: {
//           select: {
//             name: true
//           }
//         },
//         doctor: {
//           select: {
//             name: true
//           }
//         }
//       }
//     });

//     res.status(201).json({
//       success: true,
//       data: activity,
//       message: 'Activity created successfully'
//     });
//   } catch (error) {
//     console.error('Error creating activity:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to create activity'
//     });
//   }
// });

// // Create sample doctor (for testing)
// app.post('/api/doctors', async (req, res) => {
//   try {
//     const { name, speciality, department } = req.body;

//     if (!name || !department) {
//       return res.status(400).json({
//         success: false,
//         message: 'Missing required fields: name, department'
//       });
//     }

//     const doctor = await prisma.doctor.create({
//       data: {
//         name,
//         speciality: speciality || null,
//         department
//       }
//     });

//     res.status(201).json({
//       success: true,
//       data: doctor,
//       message: 'Doctor created successfully'
//     });
//   } catch (error) {
//     console.error('Error creating doctor:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to create doctor'
//     });
//   }
// });

// // Get all doctors
// app.get('/api/doctors', async (req, res) => {
//   try {
//     const doctors = await prisma.doctor.findMany({
//       orderBy: {
//         name: 'asc'
//       }
//     });

//     res.json({
//       success: true,
//       data: doctors
//     });
//   } catch (error) {
//     console.error('Error fetching doctors:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch doctors'
//     });
//   }
// });

// // Health check endpoint
// app.get('/api/health', (req, res) => {
//   res.json({
//     success: true,
//     message: 'Server is running',
//     timestamp: new Date().toISOString()
//   });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     success: false,
//     message: 'Something went wrong!'
//   });
// });

// // 404 handler
// app.use('*', (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: 'Route not found'
//   });
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`📊 Environment: ${process.env.NODE_ENV}`);
//   console.log(`🌐 CORS Origin: ${process.env.CORS_ORIGIN}`);
// });

// // Graceful shutdown
// process.on('SIGINT', async () => {
//   console.log('🛑 Shutting down server...');
//   await prisma.$disconnect();
//   process.exit(0);
// });


import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

console.log("🔥 SERVER.JS IS RUNNING!");

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || ['http://localhost:5173', 'http://localhost:5175'],
  credentials: true
}));

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

app.use(express.json({ limit: '10mb' }));

// Add response logging middleware
app.use((req, res, next) => {
  const originalSend = res.send;
  res.send = function(data) {
    console.log(`Response for ${req.method} ${req.path}:`, data);
    return originalSend.call(this, data);
  };
  next();
});

// Helper function to generate patient ID
const generatePatientId = () => {
  return `PAT-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
};

// Routes

// Get all patients
app.get('/api/patients', async (req, res) => {
  try {
    const patients = await prisma.patient.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    res.json({
      success: true,
      data: patients
    });
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch patients'
    });
  }
});

// Get patient by ID
app.get('/api/patients/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const patient = await prisma.patient.findUnique({
      where: { id },
      include: {
        activities: {
          include: {
            doctor: true
          },
          orderBy: {
            date: 'desc'
          }
        }
      }
    });
    
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }
    
    res.json({
      success: true,
      data: patient
    });
  } catch (error) {
    console.error('Error fetching patient:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch patient'
    });
  }
});

// Create new patient
app.post('/api/patients', async (req, res) => {
  try {
    console.log('Received patient data:', req.body);
    
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
      status = 'Active'
    } = req.body;

    // Validate required fields
    if (!name || !dateOfBirth || !gender || !bloodType || !contact) {
      console.log('Validation failed - missing required fields');
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, dateOfBirth, gender, bloodType, contact',
        received: { name, dateOfBirth, gender, bloodType, contact }
      });
    }

    // Validate date format
    const parsedDate = new Date(dateOfBirth);
    if (isNaN(parsedDate.getTime())) {
      console.log('Invalid date format:', dateOfBirth);
      return res.status(400).json({
        success: false,
        message: 'Invalid date format for dateOfBirth'
      });
    }

    console.log('Creating patient with data:', {
      patientId: generatePatientId(),
      name,
      dateOfBirth: parsedDate,
      gender,
      bloodType,
      contact,
      email: email || null,
      address: address || null,
      emergencyContact: emergencyContact || null,
      medicalHistory: medicalHistory || null,
      status
    });

    // Create patient
    const patient = await prisma.patient.create({
      data: {
        patientId: generatePatientId(),
        name,
        dateOfBirth: parsedDate,
        gender,
        bloodType,
        contact,
        email: email || null,
        address: address || null,
        emergencyContact: emergencyContact || null,
        medicalHistory: medicalHistory || null,
        status
      }
    });

    console.log('Patient created successfully:', patient);

    res.status(201).json({
      success: true,
      data: patient,
      message: 'Patient created successfully'
    });
  } catch (error) {
    console.error('Error creating patient:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      code: error.code
    });
    
    // Handle Prisma-specific errors
    if (error.code === 'P2002') {
      return res.status(409).json({
        success: false,
        message: 'Patient with this information already exists'
      });
    }
    
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Related record not found'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to create patient',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Update patient
app.put('/api/patients/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Convert dateOfBirth to Date object if provided
    if (updateData.dateOfBirth) {
      updateData.dateOfBirth = new Date(updateData.dateOfBirth);
    }

    const patient = await prisma.patient.update({
      where: { id },
      data: updateData
    });

    res.json({
      success: true,
      data: patient,
      message: 'Patient updated successfully'
    });
  } catch (error) {
    console.error('Error updating patient:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to update patient'
    });
  }
});

// Delete patient
app.delete('/api/patients/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.patient.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Patient deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting patient:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to delete patient'
    });
  }
});

// Get recent activities
app.get('/api/activities', async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    const activities = await prisma.activity.findMany({
      take: parseInt(limit),
      orderBy: {
        date: 'desc'
      },
      include: {
        patient: {
          select: {
            name: true
          }
        },
        doctor: {
          select: {
            name: true
          }
        }
      }
    });

    res.json({
      success: true,
      data: activities
    });
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch activities'
    });
  }
});

// Create new activity
app.post('/api/activities', async (req, res) => {
  try {
    const {
      patientId,
      doctorId,
      diagnosis,
      notes,
      department,
      date
    } = req.body;

    if (!patientId || !doctorId || !diagnosis || !department) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: patientId, doctorId, diagnosis, department'
      });
    }

    const activity = await prisma.activity.create({
      data: {
        patientId,
        doctorId,
        diagnosis,
        notes: notes || null,
        department,
        date: date ? new Date(date) : new Date()
      },
      include: {
        patient: {
          select: {
            name: true
          }
        },
        doctor: {
          select: {
            name: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      data: activity,
      message: 'Activity created successfully'
    });
  } catch (error) {
    console.error('Error creating activity:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create activity'
    });
  }
});

// Create sample doctor (for testing)
app.post('/api/doctors', async (req, res) => {
  try {
    const { name, speciality, department } = req.body;

    if (!name || !department) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, department'
      });
    }

    const doctor = await prisma.doctor.create({
      data: {
        name,
        speciality: speciality || null,
        department
      }
    });

    res.status(201).json({
      success: true,
      data: doctor,
      message: 'Doctor created successfully'
    });
  } catch (error) {
    console.error('Error creating doctor:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create doctor'
    });
  }
});

// Get all doctors
app.get('/api/doctors', async (req, res) => {
  try {
    const doctors = await prisma.doctor.findMany({
      orderBy: {
        name: 'asc'
      }
    });

    res.json({
      success: true,
      data: doctors
    });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch doctors'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Test endpoint for debugging JSON responses
app.post('/api/test', (req, res) => {
  console.log('Test endpoint called with:', req.body);
  res.json({
    success: true,
    message: 'Test successful',
    received: req.body,
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
  console.log(`🌐 CORS Origin: ${process.env.CORS_ORIGIN}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('🛑 Shutting down server...');
  await prisma.$disconnect();
  process.exit(0);
});