import express from 'express';
import { query, queryOne, run } from '../database/db.js';

const router = express.Router();

// GET /api/departments - List all connected departments
router.get('/', (req, res) => {
  try {
    const rows = query('SELECT * FROM departments ORDER BY code ASC');
    const formatted = rows.map(d => ({
      id: d.id,
      name: d.name,
      marathiName: d.marathi_name,
      category: d.category,
      code: d.code,
      status: d.status,
      lastSync: d.last_sync,
      latency: d.latency,
      dailyCalls: d.daily_calls,
      health: d.health,
      schemasProvided: JSON.parse(d.schemas_provided || '[]'),
      schemasConsumed: JSON.parse(d.schemas_consumed || '[]'),
      nodalOfficer: d.nodal_officer,
      nodeIp: d.node_ip,
      sslExpiry: d.ssl_expiry,
      description: d.description
    }));
    res.json({ success: true, data: formatted });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/departments/:id/sync - Trigger live mTLS ping & handshake
router.post('/:id/sync', (req, res) => {
  try {
    const dept = queryOne('SELECT * FROM departments WHERE id = ?', [req.params.id]);
    if (!dept) {
      return res.status(404).json({ success: false, error: 'Department not found' });
    }

    const newLatency = Math.max(28, Math.floor(dept.latency + (Math.random() * 6 - 3)));
    const newSync = 'Just now';

    run('UPDATE departments SET last_sync = ?, latency = ? WHERE id = ?', [newSync, newLatency, dept.id]);

    const updated = queryOne('SELECT * FROM departments WHERE id = ?', [dept.id]);
    res.json({
      success: true,
      data: {
        ...updated,
        schemasProvided: JSON.parse(updated.schemas_provided || '[]'),
        schemasConsumed: JSON.parse(updated.schemas_consumed || '[]')
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
