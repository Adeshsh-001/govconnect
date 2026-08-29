import express from 'express';
import { queryOne, run } from '../database/db.js';

const router = express.Router();

// POST /api/gateway/dispatch - Live Packet Transmission Simulator
router.post('/dispatch', (req, res) => {
  try {
    const { simSource, simTarget, simSchema } = req.body;

    const sourceDept = queryOne('SELECT * FROM departments WHERE id = ?', [simSource || 'MH-AGR-SHETKARI']);
    const targetDept = queryOne('SELECT * FROM departments WHERE id = ?', [simTarget || 'MH-REV-BHULEKH']);
    const schemaObj = queryOne('SELECT * FROM standardized_schemas WHERE id = ?', [simSchema || 'schema-land-712']);

    const latencyMs = Math.floor(35 + Math.random() * 15);
    const traceId = `TRACE-MH-SETU-${Math.floor(100000 + Math.random() * 900000)}`;

    const steps = [
      { id: 1, text: `Establishing mTLS 1.3 Handshake: ${sourceDept ? sourceDept.name : 'Consumer'} ➔ SetuGov Gateway (IP: ${sourceDept ? sourceDept.node_ip : '10.142.20.42'})` },
      { id: 2, text: 'Verifying DPDP Act Citizen Consent Token (Token: DPDP-MH-2026-PATIL-8921)... Validated (Active).' },
      { id: 3, text: `Validating JSON payload against standard definition: ${schemaObj ? schemaObj.schema_code : 'MahaBhulekh.LandRecord712.v3'} ... Passed (0 errors).` },
      { id: 4, text: `Querying ${targetDept ? targetDept.name : 'Target'} authoritative repository & encrypting response payload (AES-256 GCM).` },
      { id: 5, text: 'Packet successfully delivered. Immutable audit log recorded in SetuGov state ledger.' }
    ];

    // Record audit log
    const auditId = `AUD-2026-${Math.floor(100 + Math.random() * 900)}`;
    run(
      `INSERT INTO audit_logs (id, timestamp, department, purpose, fields_accessed_json, authorization_token, status, ip_node, citizen_maha_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [auditId, new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today', sourceDept ? sourceDept.name : 'Gateway Consumer', `Gateway Interoperability Request (${schemaObj ? schemaObj.name : 'Standard Payload'})`, JSON.stringify(['Gat No. 142/2', 'Verification Token', 'Encrypted Payload']), traceId, 'Allowed (Consent Active)', targetDept ? targetDept.node_ip : '10.142.20.11', 'MH-2024-PATIL-8921']
    );

    res.json({
      success: true,
      data: {
        statusCode: 200,
        statusText: '200 OK (Delivered)',
        latencyMs,
        traceId,
        steps,
        payload: schemaObj ? JSON.parse(schemaObj.sample_payload_json || '{}') : {}
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
