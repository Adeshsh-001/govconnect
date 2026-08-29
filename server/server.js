import express from 'express';
import cors from 'cors';
import { getDb } from './database/db.js';
import departmentsRouter from './routes/departments.js';
import metricsRouter from './routes/metrics.js';
import schemasRouter from './routes/schemas.js';
import integrationsRouter from './routes/integrations.js';
import citizenRouter from './routes/citizen.js';
import gatewayRouter from './routes/gateway.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/departments', departmentsRouter);
app.use('/api/metrics', metricsRouter);
app.use('/api/schemas', schemasRouter);
app.use('/api/integrations', integrationsRouter);
app.use('/api/citizen', citizenRouter);
app.use('/api/gateway', gatewayRouter);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'GovConnect SetuGov Interoperability Bus',
    version: '3.4.2',
    standards: 'NDGFP & DPDP Act (2023)',
    timestamp: new Date().toISOString()
  });
});

// Initialize DB and start server
getDb().then(() => {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(` GovConnect (SetuGov) Backend Server Running!`);
    console.log(` Port: http://localhost:${PORT}`);
    console.log(` Health Check: http://localhost:${PORT}/api/health`);
    console.log(`====================================================`);
  });
}).catch(err => {
  console.error('Fatal Database Initialization Error:', err);
  process.exit(1);
});
