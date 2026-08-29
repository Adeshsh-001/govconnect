import express from 'express';
import { query, queryOne } from '../database/db.js';

const router = express.Router();

// GET /api/schemas - List standardized schemas
router.get('/', (req, res) => {
  try {
    const rows = query('SELECT * FROM standardized_schemas');
    const formatted = rows.map(s => ({
      id: s.id,
      name: s.name,
      schemaCode: s.schema_code,
      version: s.version,
      domain: s.domain,
      classification: s.classification,
      leadDepartment: s.lead_department,
      description: s.description,
      fieldsCount: s.fields_count,
      fields: JSON.parse(s.fields_json || '[]'),
      samplePayload: JSON.parse(s.sample_payload_json || '{}')
    }));
    res.json({ success: true, data: formatted });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/schemas/:id
router.get('/:id', (req, res) => {
  try {
    const s = queryOne('SELECT * FROM standardized_schemas WHERE id = ?', [req.params.id]);
    if (!s) return res.status(404).json({ success: false, error: 'Schema not found' });
    res.json({
      success: true,
      data: {
        id: s.id,
        name: s.name,
        schemaCode: s.schema_code,
        version: s.version,
        domain: s.domain,
        classification: s.classification,
        leadDepartment: s.lead_department,
        description: s.description,
        fieldsCount: s.fields_count,
        fields: JSON.parse(s.fields_json || '[]'),
        samplePayload: JSON.parse(s.sample_payload_json || '{}')
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
