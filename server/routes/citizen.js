import express from 'express';
import { query, queryOne, run } from '../database/db.js';

const router = express.Router();

// GET /api/citizen/profile - Get active citizen profile
router.get('/profile', (req, res) => {
  try {
    const profile = queryOne('SELECT * FROM citizen_profiles ORDER BY rowid DESC LIMIT 1');
    if (!profile) return res.status(404).json({ success: false, error: 'No citizen profile found' });

    res.json({
      success: true,
      data: {
        id: profile.id,
        mahaId: profile.maha_id,
        name: profile.name,
        marathiName: profile.marathi_name,
        aadhaarVidMasked: profile.aadhaar_vid_masked,
        digiLockerStatus: profile.digilocker_status,
        phoneMasked: profile.phone_masked,
        residentialAddress: profile.residential_address,
        kycCompliance: profile.kyc_compliance,
        privacyScore: profile.privacy_score
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/citizen/enrol - Admin Onboarding Desk
router.post('/enrol', (req, res) => {
  try {
    const { fullName, marathiName, mobileNumber, aadhaarUid, district, taluka, village, address, pinCode, landSurveyNo, vehicleNo, rationCardNo, abhaId } = req.body;

    if (!fullName || !mobileNumber) {
      return res.status(400).json({ success: false, error: 'Full name and mobile number are required' });
    }

    const lastName = fullName.split(' ').pop().toUpperCase() || 'CITIZEN';
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const mahaId = `MH-2026-${lastName}-${randomSuffix}`;
    const maskedUid = aadhaarUid ? `•••• •••• ${aadhaarUid.slice(-4)}` : '•••• •••• 8921';
    const id = `CIT-${Date.now()}`;
    const phoneMasked = `+91 ${mobileNumber.slice(0, 5)} •••••`;
    const fullAddress = `${address || 'Main Road'}, ${village || 'Pimpalgaon'}, Taluka ${taluka || 'Niphad'}, Dist ${district || 'Nashik'}, Maharashtra - ${pinCode || '422209'}`;

    run(
      `INSERT INTO citizen_profiles (id, maha_id, name, marathi_name, aadhaar_vid_masked, aadhaar_token_hash, digilocker_status, phone_masked, residential_address, kyc_compliance, privacy_score)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, mahaId, fullName, marathiName || fullName, maskedUid, `SHA256:${Date.now()}`, 'Linked & Verified (Level 3)', phoneMasked, fullAddress, 'DPDP Act (2023) Verified', 92]
    );

    // Initial consent linkage
    const consentId = `CONS-${Math.floor(10 + Math.random() * 90)}`;
    run(
      `INSERT INTO citizen_consents (id, citizen_maha_id, department, dept_category, purpose, legal_mandate, data_categories_json, granted_date, valid_until, is_granted, is_mandatory, last_accessed)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [consentId, mahaId, 'Revenue & Forest Department (MahaBhulekh)', 'Land & Revenue', 'Verification of 7/12 land records and ownership for state welfare and identity linkage.', 'DPDP Act 2023 Section 6', JSON.stringify(['7/12 Land Parcel Area', 'Aadhaar Virtual ID', 'Ownership Share']), 'Today', '3 Years', 1, 0, 'Just now (Registered by Admin)']
    );

    // Initial audit log
    const auditId = `AUD-2026-${Math.floor(100 + Math.random() * 900)}`;
    run(
      `INSERT INTO audit_logs (id, timestamp, department, purpose, fields_accessed_json, authorization_token, status, ip_node, citizen_maha_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [auditId, new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today', 'State Interoperability Admin (MahaID Desk)', `Citizen Onboarded & MahaID ${mahaId} Minted via DigiLocker e-KYC`, JSON.stringify(['Aadhaar Masked VID', 'Mobile Number', 'Permanent Address']), `AUTH-KYC-MH-${Math.floor(1000 + Math.random() * 9000)}`, 'Allowed (Consent Active)', '10.142.20.01 (Admin Onboarding Node)', mahaId]
    );

    const created = queryOne('SELECT * FROM citizen_profiles WHERE id = ?', [id]);
    res.status(201).json({
      success: true,
      data: {
        id: created.id,
        mahaId: created.maha_id,
        name: created.name,
        marathiName: created.marathi_name,
        aadhaarVidMasked: created.aadhaar_vid_masked,
        digiLockerStatus: created.digilocker_status,
        phoneMasked: created.phone_masked,
        residentialAddress: created.residential_address,
        kycCompliance: created.kyc_compliance,
        privacyScore: created.privacy_score
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/citizen/consents - List granular consents
router.get('/consents', (req, res) => {
  try {
    const rows = query('SELECT * FROM citizen_consents ORDER BY rowid ASC');
    const formatted = rows.map(c => ({
      id: c.id,
      citizenMahaId: c.citizen_maha_id,
      department: c.department,
      deptCategory: c.dept_category,
      purpose: c.purpose,
      legalMandate: c.legal_mandate,
      dataCategories: JSON.parse(c.data_categories_json || '[]'),
      grantedDate: c.granted_date,
      validUntil: c.valid_until,
      isGranted: Boolean(c.is_granted),
      isMandatory: Boolean(c.is_mandatory),
      lastAccessed: c.last_accessed
    }));
    res.json({ success: true, data: formatted });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PATCH /api/citizen/consents/:id/toggle - Grant or Revoke consent
router.patch('/consents/:id/toggle', (req, res) => {
  try {
    const consent = queryOne('SELECT * FROM citizen_consents WHERE id = ?', [req.params.id]);
    if (!consent) return res.status(404).json({ success: false, error: 'Consent record not found' });

    if (consent.is_mandatory) {
      return res.status(400).json({ success: false, error: 'Statutory consent cannot be revoked' });
    }

    const nextState = consent.is_granted ? 0 : 1;
    const nextAccess = nextState ? 'Just now (Consent Granted)' : 'Revoked by Citizen (Just now)';

    run('UPDATE citizen_consents SET is_granted = ?, last_accessed = ? WHERE id = ?', [nextState, nextAccess, consent.id]);

    // Create Audit Log entry
    const newLogId = `AUD-2026-${Math.floor(100 + Math.random() * 900)}`;
    const logPurpose = nextState
      ? `Consent Granted for ${consent.purpose.slice(0, 40)}...`
      : `Consent REVOKED by Citizen for ${consent.department}`;
    const logStatus = nextState ? 'Allowed (Consent Active)' : 'Blocked (Consent Revoked by Citizen)';

    run(
      `INSERT INTO audit_logs (id, timestamp, department, purpose, fields_accessed_json, authorization_token, status, ip_node, citizen_maha_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [newLogId, new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today', consent.department, logPurpose, consent.data_categories_json, `AUTH-TKN-MH-${Math.floor(1000 + Math.random() * 9000)}`, logStatus, '10.142.20.01 (SetuGov Consent Broker)', consent.citizen_maha_id]
    );

    const updated = queryOne('SELECT * FROM citizen_consents WHERE id = ?', [consent.id]);
    const newlyCreatedLog = queryOne('SELECT * FROM audit_logs WHERE id = ?', [newLogId]);

    res.json({
      success: true,
      data: {
        consent: {
          id: updated.id,
          citizenMahaId: updated.citizen_maha_id,
          department: updated.department,
          deptCategory: updated.dept_category,
          purpose: updated.purpose,
          dataCategories: JSON.parse(updated.data_categories_json || '[]'),
          isGranted: Boolean(updated.is_granted),
          isMandatory: Boolean(updated.is_mandatory),
          lastAccessed: updated.last_accessed
        },
        auditLog: {
          id: newlyCreatedLog.id,
          timestamp: newlyCreatedLog.timestamp,
          department: newlyCreatedLog.department,
          purpose: newlyCreatedLog.purpose,
          fieldsAccessed: JSON.parse(newlyCreatedLog.fields_accessed_json || '[]'),
          authorizationToken: newlyCreatedLog.authorization_token,
          status: newlyCreatedLog.status
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/citizen/consents - Add new linked consent
router.post('/consents', (req, res) => {
  try {
    const { department, deptCategory, purpose, dataCategories, citizenMahaId } = req.body;
    const id = `CONS-${Math.floor(10 + Math.random() * 90)}`;
    const grantedDate = 'Today';
    const validUntil = '3 Years';
    const isGranted = 1;
    const isMandatory = 0;
    const lastAccessed = 'Just now (Linked by Citizen)';
    const dataCategoriesJson = JSON.stringify(dataCategories || []);

    run(
      `INSERT INTO citizen_consents (id, citizen_maha_id, department, dept_category, purpose, legal_mandate, data_categories_json, granted_date, valid_until, is_granted, is_mandatory, last_accessed)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, citizenMahaId || 'MH-2024-PATIL-8921', department, deptCategory || 'General', purpose || 'Identity verification', 'DPDP Act 2023 Section 6', dataCategoriesJson, grantedDate, validUntil, isGranted, isMandatory, lastAccessed]
    );

    const auditId = `AUD-2026-${Math.floor(100 + Math.random() * 900)}`;
    run(
      `INSERT INTO audit_logs (id, timestamp, department, purpose, fields_accessed_json, authorization_token, status, ip_node, citizen_maha_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [auditId, new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today', department, `Citizen Linked Document & Granted Consent: ${purpose.slice(0, 45)}...`, dataCategoriesJson, `AUTH-TKN-MH-${Math.floor(1000 + Math.random() * 9000)}`, 'Allowed (Consent Active)', '10.142.20.01 (SetuGov Consent Broker)', citizenMahaId || 'MH-2024-PATIL-8921']
    );

    const created = queryOne('SELECT * FROM citizen_consents WHERE id = ?', [id]);
    res.status(201).json({
      success: true,
      data: {
        id: created.id,
        citizenMahaId: created.citizen_maha_id,
        department: created.department,
        deptCategory: created.dept_category,
        purpose: created.purpose,
        dataCategories: JSON.parse(created.data_categories_json || '[]'),
        isGranted: Boolean(created.is_granted),
        isMandatory: Boolean(created.is_mandatory),
        lastAccessed: created.last_accessed
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/citizen/audit-logs - Real-time access ledger
router.get('/audit-logs', (req, res) => {
  try {
    const rows = query('SELECT * FROM audit_logs ORDER BY rowid DESC');
    const formatted = rows.map(l => ({
      id: l.id,
      timestamp: l.timestamp,
      department: l.department,
      purpose: l.purpose,
      fieldsAccessed: JSON.parse(l.fields_accessed_json || '[]'),
      authorizationToken: l.authorization_token,
      status: l.status
    }));
    res.json({ success: true, data: formatted });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/citizen/documents/verify - Live departmental verification simulator
router.post('/documents/verify', (req, res) => {
  try {
    const { docType, inputs } = req.body;

    if (docType === 'LAND_712') {
      return res.json({
        success: true,
        data: {
          title: 'Village Form VII-XII Land Record Verified',
          source: 'Revenue & Forest Dept (MahaBhulekh)',
          details: {
            'Landholder': 'Ramesh Santosh Patil',
            'Location': `${inputs.village || 'Pimpalgaon Baswant'}, ${inputs.taluka || 'Niphad'}, ${inputs.district || 'Nashik'}`,
            'Gat / Survey': inputs.surveyNo || '142/2',
            'Area': '1.84 Hectares (Cultivable)',
            'Tenure': 'Occupant Class 1 (भोगवटादार वर्ग १)',
            'Status': 'Digital Signature Valid (Talathi Office)'
          },
          consentDept: 'Agriculture & Farmers Welfare (MahaDBT)',
          purpose: 'Automated validation of 7/12 land records for Namo Shetkari Mahasanman & Crop Loss DBT.',
          dataCategories: ['7/12 Land Parcel Area', 'Kharif Crop Survey', 'Bank Account Linkage']
        }
      });
    } else if (docType === 'VEHICLE_RC') {
      return res.json({
        success: true,
        data: {
          title: 'Vehicle Registration Certificate (RC) Verified',
          source: 'Transport Dept (Vahan 4.0)',
          details: {
            'Registration No': inputs.vehicleNo || 'MH-15-DC-4421',
            'Owner': 'Ramesh Santosh Patil',
            'Maker / Model': 'Tata Nexon EV Max (XZ+ Lux)',
            'Vehicle Class': 'LMV (Electric)',
            'Insurance Validity': '16 May 2027 (Active)',
            'Road Tax': 'Paid Lifetime'
          },
          consentDept: 'Motor Vehicles & Transport Dept (RTO / Vahan)',
          purpose: 'Identity verification for automated Smart Card Driving License and vehicle fitness sync.',
          dataCategories: ['Vehicle Registration Number', 'Permanent Address', 'Mobile Hash']
        }
      });
    } else if (docType === 'ABHA_HEALTH') {
      return res.json({
        success: true,
        data: {
          title: 'Ayushman Bharat Health Account (ABHA) Verified',
          source: 'National Health Authority & Arogya Vibhag',
          details: {
            'ABHA ID': inputs.abhaId || '91-4421-9981-2210',
            'ABHA Address': 'ramesh.patil@abdm',
            'Linked Hospital': 'District General Hospital, Nashik',
            'Health Scheme': 'MJPJAY / PM-JAY Empaneled',
            'Status': 'Active (KYC Level 3)'
          },
          consentDept: 'Public Health & Family Welfare (ABDM)',
          purpose: 'Linkage of electronic health records for cashless admission claims under MJPJAY.',
          dataCategories: ['ABHA Health ID', 'Clinical Encounter Summary', 'BPL Ration Status']
        }
      });
    } else {
      return res.json({
        success: true,
        data: {
          title: 'MahaPDS Ration Card Record Verified',
          source: 'Food, Civil Supplies & Consumer Protection',
          details: {
            'Ration Card No': inputs.rationCardNo || '270481005521',
            'Card Category': 'PHH (Priority Household - Saffron)',
            'Head of Family': 'Sunita Ramesh Patil',
            'Total Members': '4 Members (100% Aadhaar Seeded)',
            'Assigned FPS': 'FPS #104, Pimpalgaon Baswant'
          },
          consentDept: 'Food, Civil Supplies & Consumer Protection (MahaFood)',
          purpose: 'One Nation One Ration Card (ONORC) monthly foodgrain entitlement validation.',
          dataCategories: ['Ration Card Number', 'Biometric Token', 'Family Hierarchy']
        }
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
