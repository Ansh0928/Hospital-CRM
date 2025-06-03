// // src/server.ts
// import express from 'express';

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.get('/', (req, res) => {
//   res.send('Server is running');
// });

// app.listen(PORT, () => {
//   console.log(`Server listening on http://localhost:${PORT}`);
// });

import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;
console.log("🔥 SERVER.TS IS RUNNING!");

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Patients endpoints
app.get('/api/patients', (req, res) => {
  // Your patient fetching logic here
  res.json({ patients: [] }); // Placeholder
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});