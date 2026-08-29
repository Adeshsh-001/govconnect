import express from 'express';
import { query, queryOne, run } from '../database/db.js';

const router = express.Router();

// GET /api/integrations - List requests queue
router.get('/', (req, res) => {
  try {
    const rows = query('SELECT * FROM integration_requests ORDER BY rowid DESC');
    const formatted = rows.map(r => ({
      id: r.id,
      requestingDept: r.requesting_dept,
      sourceDept: r.source_dept,
      schemaNeeded: r.schema_needed,
      purpose: r.purpose,
      dataClassification: r.data_classification,
      slaPriority: r.sla_priority,
      submittedBy: r.submitted_by,
      submittedAt: r.submitted_at,
      status: r.status,
      gatewayRoute: r.gateway_route,
      approvalStage: r.approval_stage
    }));
    res.json({ success: true, data: formatted });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/integrations - Create new integration proposal
router.post('/', (req, res) => {
  try {
    const { requestingDept, sourceDept, schemaNeeded, purpose, dataClassification, slaPriority, submittedBy } = req.body;
    
    if (!requestingDept || !sourceDept || !purpose) {
      return res.status(400).json({ success: false, error: 'Required fields missing' });
    }

    const id = `REQ-2026-${Math.floor(100 + Math.random() * 900)}`;
    const submittedAt = 'Just now';
    const status = 'Pending Review';
    const gatewayRoute = `/api/v2/exchange/${requestingDept.slice(0,3).toLowerCase()}-${sourceDept.slice(0,3).toLowerCase()}-pipeline`;
    const approvalStage = 'Awaiting Nodal Data Custodian Authorization & DPDP Policy Review';

    run(
      `INSERT INTO integration_requests (id, requesting_dept, source_dept, schema_needed, purpose, data_classification, sla_priority, submitted_by, submitted_at, status, gateway_route, approval_stage)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, requestingDept, sourceDept, schemaNeeded || 'Standard.JSON.v1', purpose, dataClassification || 'Confidential', slaPriority || 'Mission Critical', submittedBy || 'Authorized Officer', submittedAt, status, gatewayRoute, approvalStage]
    );

    const created = queryOne('SELECT * FROM integration_requests WHERE id = ?', [id]);
    res.status(201).json({
      success: true,
      data: {
        id: created.id,
        requestingDept: created.requesting_dept,
        sourceDept: created.source_dept,
        schemaNeeded: created.schema_needed,
        purpose: created.purpose,
        dataClassification: created.data_classification,
        slaPriority: created.sla_priority,
        submittedBy: created.submitted_by,
        submittedAt: created.submitted_at,
        status: created.status,
        gatewayRoute: created.gateway_route,
        approvalStage: created.approval_stage
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PATCH /api/integrations/:id/approve - Approve proposal & activate route
router.patch('/:id/approve', (req, res) => {
  try {
    const item = queryOne('SELECT * FROM integration_requests WHERE id = ?', [req.params.id]);
    if (!item) return res.status(404).json({ success: false, error: 'Integration request not found' });

    const newStatus = 'Approved';
    const newStage = `Approved & Live — Gateway Route Active (${item.gateway_route})`;

    run('UPDATE integration_requests SET status = ?, approval_stage = ? WHERE id = ?', [newStatus, newStage, item.id]);

    const updated = queryOne('SELECT * FROM integration_requests WHERE id = ?', [item.id]);
    res.json({
      success: true,
      data: {
        id: updated.id,
        requestingDept: updated.requesting_dept,
        sourceDept: updated.source_dept,
        schemaNeeded: updated.schema_needed,
        purpose: updated.purpose,
        dataClassification: updated.data_classification,
        slaPriority: updated.sla_priority,
        submittedBy: updated.submitted_by,
        submittedAt: updated.submitted_at,
        status: updated.status,
        gatewayRoute: updated.gateway_route,
        approvalStage: updated.approval_stage
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PATCH /api/integrations/:id/reject - Reject / return proposal
router.patch('/:id/reject', (req, res) => {
  try {
    const reason = req.body.reason || 'Returned for revision';
    const item = queryOne('SELECT * FROM integration_requests WHERE id = ?', [req.params.id]);
    if (!item) return res.status(404).json({ success: false, error: 'Integration request not found' });

    const newStatus = 'Rejected';
    const newStage = `Returned for Revision: ${reason}`;

    run('UPDATE integration_requests SET status = ?, approval_stage = ? WHERE id = ?', [newStatus, newStage, item.id]);

    const updated = queryOne('SELECT * FROM integration_requests WHERE id = ?', [item.id]);
    res.json({
      success: true,
      data: {
        id: updated.id,
        requestingDept: updated.requesting_dept,
        sourceDept: updated.source_dept,
        schemaNeeded: updated.schema_needed,
        purpose: updated.purpose,
        dataClassification: updated.data_classification,
        slaPriority: updated.sla_priority,
        submittedBy: updated.submitted_by,
        submittedAt: updated.submitted_at,
        status: updated.status,
        gatewayRoute: updated.gateway_route,
        approvalStage: updated.approval_stage
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
