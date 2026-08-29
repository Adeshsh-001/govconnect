import express from 'express';
import { query } from '../database/db.js';

const router = express.Router();

// GET /api/metrics/7days - Traffic analytics
router.get('/7days', (req, res) => {
  try {
    const rows = query('SELECT * FROM api_metrics');
    const formatted = rows.map(m => ({
      day: m.day,
      totalCalls: m.total_calls,
      revenueCalls: m.revenue_calls,
      transportCalls: m.transport_calls,
      healthCalls: m.health_calls,
      policeCalls: m.police_calls,
      otherCalls: m.other_calls,
      latency: m.latency,
      successRate: m.success_rate
    }));
    res.json({ success: true, data: formatted });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
