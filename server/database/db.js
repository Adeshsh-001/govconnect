import initSqlJs from 'sql.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbFilePath = path.join(__dirname, 'govconnect.sqlite');

let sqlDb = null;

export async function getDb() {
  if (sqlDb) return sqlDb;

  const SQL = await initSqlJs();

  if (fs.existsSync(dbFilePath)) {
    try {
      const fileBuffer = fs.readFileSync(dbFilePath);
      sqlDb = new SQL.Database(fileBuffer);
      console.log('✓ Loaded existing SQLite database from:', dbFilePath);
    } catch (e) {
      console.warn('Failed to load existing database file, creating fresh database:', e.message);
      sqlDb = new SQL.Database();
    }
  } else {
    sqlDb = new SQL.Database();
    console.log('✓ Created fresh SQLite database in memory');
  }

  initTablesAndSeed();
  return sqlDb;
}

export function saveDb() {
  if (!sqlDb) return;
  try {
    const data = sqlDb.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(dbFilePath, buffer);
  } catch (err) {
    console.error('Error saving SQLite database to disk:', err);
  }
}

// Wrapper for executing query returning array of objects
export function query(sql, params = []) {
  if (!sqlDb) throw new Error('Database not initialized');
  const stmt = sqlDb.prepare(sql);
  stmt.bind(params);
  const results = [];
  while (stmt.step()) {
    results.push(stmt.getAsObject());
  }
  stmt.free();
  return results;
}

// Wrapper for single row query
export function queryOne(sql, params = []) {
  const results = query(sql, params);
  return results.length > 0 ? results[0] : null;
}

// Wrapper for insert/update/delete and auto-saving
export function run(sql, params = []) {
  if (!sqlDb) throw new Error('Database not initialized');
  sqlDb.run(sql, params);
  saveDb();
}

function initTablesAndSeed() {
  // Create Tables
  sqlDb.run(`
    CREATE TABLE IF NOT EXISTS departments (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      marathi_name TEXT,
      category TEXT NOT NULL,
      code TEXT NOT NULL,
      status TEXT NOT NULL,
      last_sync TEXT,
      latency INTEGER DEFAULT 0,
      daily_calls INTEGER DEFAULT 0,
      health REAL DEFAULT 99.0,
      schemas_provided TEXT,
      schemas_consumed TEXT,
      nodal_officer TEXT,
      node_ip TEXT,
      ssl_expiry TEXT,
      description TEXT
    );

    CREATE TABLE IF NOT EXISTS standardized_schemas (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      schema_code TEXT NOT NULL,
      version TEXT NOT NULL,
      domain TEXT NOT NULL,
      classification TEXT NOT NULL,
      lead_department TEXT NOT NULL,
      description TEXT,
      fields_count INTEGER,
      fields_json TEXT,
      sample_payload_json TEXT
    );

    CREATE TABLE IF NOT EXISTS integration_requests (
      id TEXT PRIMARY KEY,
      requesting_dept TEXT NOT NULL,
      source_dept TEXT NOT NULL,
      schema_needed TEXT NOT NULL,
      purpose TEXT NOT NULL,
      data_classification TEXT,
      sla_priority TEXT,
      submitted_by TEXT,
      submitted_at TEXT,
      status TEXT NOT NULL,
      gateway_route TEXT,
      approval_stage TEXT
    );

    CREATE TABLE IF NOT EXISTS citizen_profiles (
      id TEXT PRIMARY KEY,
      maha_id TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      marathi_name TEXT,
      aadhaar_vid_masked TEXT NOT NULL,
      aadhaar_token_hash TEXT,
      digilocker_status TEXT,
      phone_masked TEXT,
      residential_address TEXT,
      kyc_compliance TEXT,
      privacy_score INTEGER DEFAULT 88
    );

    CREATE TABLE IF NOT EXISTS citizen_consents (
      id TEXT PRIMARY KEY,
      citizen_maha_id TEXT NOT NULL,
      department TEXT NOT NULL,
      dept_category TEXT NOT NULL,
      purpose TEXT NOT NULL,
      legal_mandate TEXT,
      data_categories_json TEXT NOT NULL,
      granted_date TEXT,
      valid_until TEXT,
      is_granted INTEGER DEFAULT 1,
      is_mandatory INTEGER DEFAULT 0,
      last_accessed TEXT
    );

    CREATE TABLE IF NOT EXISTS audit_logs (
      id TEXT PRIMARY KEY,
      timestamp TEXT NOT NULL,
      department TEXT NOT NULL,
      purpose TEXT NOT NULL,
      fields_accessed_json TEXT NOT NULL,
      authorization_token TEXT NOT NULL,
      status TEXT NOT NULL,
      ip_node TEXT,
      citizen_maha_id TEXT
    );

    CREATE TABLE IF NOT EXISTS api_metrics (
      day TEXT PRIMARY KEY,
      total_calls INTEGER,
      revenue_calls INTEGER,
      transport_calls INTEGER,
      health_calls INTEGER,
      police_calls INTEGER,
      other_calls INTEGER,
      latency INTEGER,
      success_rate REAL
    );
  `);

  // Seed Departments if table is empty
  const deptCount = queryOne('SELECT COUNT(*) as count FROM departments');
  if (!deptCount || deptCount.count === 0) {
    console.log('Seeding initial Maharashtra Government Departments...');
    
    const depts = [
      {
        id: "MH-REV-BHULEKH",
        name: "Revenue & Forest Department (MahaBhulekh)",
        marathi_name: "महसूल व वन विभाग (महाभूलेख)",
        category: "Land & Revenue",
        code: "REV-01",
        status: "Connected",
        last_sync: "Just now",
        latency: 38,
        daily_calls: 842190,
        health: 99.9,
        schemas_provided: JSON.stringify(["LandRecord712.v3", "PropertyMutation.v1"]),
        schemas_consumed: JSON.stringify(["AadhaarKyc.v2", "PDSFamily.v1"]),
        nodal_officer: "Shri S. K. Deshmukh (IAS)",
        node_ip: "10.142.20.11",
        ssl_expiry: "2027-11-15 (Valid)",
        description: "Maintains 7/12 land extracts, 8-A khatepustika, property card records, and mutation entries for all 36 districts of Maharashtra."
      },
      {
        id: "MH-MVD-VAHAN",
        name: "Motor Vehicles & Transport Dept (RTO / Vahan)",
        marathi_name: "मोटार वाहन व परिवहन विभाग (आरटीओ / वाहन)",
        category: "Transport",
        code: "TRN-02",
        status: "Connected",
        last_sync: "2 mins ago",
        latency: 44,
        daily_calls: 621450,
        health: 99.7,
        schemas_provided: JSON.stringify(["VehicleRC_Fitness.v2", "DriverLicense.v1"]),
        schemas_consumed: JSON.stringify(["AadhaarKyc.v2", "PoliceVerification.v2"]),
        nodal_officer: "Smt. Manisha Verma (IPS)",
        node_ip: "10.142.20.14",
        ssl_expiry: "2027-08-20 (Valid)",
        description: "Authoritative repository for 3.4 crore registered vehicles, PUC certificates, commercial permits, and driving license records across Maharashtra."
      },
      {
        id: "MH-PHD-AROGYA",
        name: "Public Health & Family Welfare (Arogya Vibhag)",
        marathi_name: "सार्वजनिक आरोग्य विभाग (आरोग्य विभाग / ABDM)",
        category: "Healthcare",
        code: "HLT-03",
        status: "Connected",
        last_sync: "1 min ago",
        latency: 52,
        daily_calls: 412800,
        health: 99.8,
        schemas_provided: JSON.stringify(["HealthEncounter_EHR.v1", "ImmunizationRecord.v2"]),
        schemas_consumed: JSON.stringify(["AadhaarKyc.v2", "RationFamily.v1"]),
        nodal_officer: "Dr. Nitin Ambadekar (Director Health)",
        node_ip: "10.142.20.18",
        ssl_expiry: "2027-05-10 (Valid)",
        description: "Interoperable health data layer integrated with Ayushman Bharat Digital Mission (ABDM), MJPJAY health scheme claims, and civil hospitals."
      },
      {
        id: "MH-POL-CCTNS",
        name: "Maharashtra State Police & CID (CCTNS / e-Challan)",
        marathi_name: "महाराष्ट्र राज्य पोलीस व गुन्हे अन्वेषण (CCTNS)",
        category: "Home & Law Enforcement",
        code: "POL-04",
        status: "Connected",
        last_sync: "3 mins ago",
        latency: 31,
        daily_calls: 389200,
        health: 100.0,
        schemas_provided: JSON.stringify(["PoliceVerification_NOC.v2", "TrafficChallan.v1"]),
        schemas_consumed: JSON.stringify(["VehicleRC_Fitness.v2", "LandRecord712.v3", "AadhaarKyc.v2"]),
        nodal_officer: "Shri Amitabh Gupta (IPS)",
        node_ip: "10.142.20.22",
        ssl_expiry: "2028-01-30 (Valid)",
        description: "Real-time verification system for character certificates, traffic e-challans, passport verification, and inter-agency intelligence sharing."
      },
      {
        id: "MH-BMC-MUNICIPAL",
        name: "Brihanmumbai Municipal Corp (BMC / Urban Dev)",
        marathi_name: "बृहन्मुंबई महानगरपालिका व नगरविकास",
        category: "Urban Local Bodies",
        code: "ULB-05",
        status: "Connected",
        last_sync: "5 mins ago",
        latency: 68,
        daily_calls: 310500,
        health: 98.9,
        schemas_provided: JSON.stringify(["PropertyTax_Assessment.v1", "WaterBilling.v1", "TradeLicense.v2"]),
        schemas_consumed: JSON.stringify(["LandRecord712.v3", "AadhaarKyc.v2"]),
        nodal_officer: "Shri Bhushan Gagrani (IAS)",
        node_ip: "10.142.20.30",
        ssl_expiry: "2026-12-12 (Valid)",
        description: "Metropolitan municipal governance node providing property tax assessments, building proposal clearances, trade licenses, and water utility metrics."
      },
      {
        id: "MH-FCS-MAHAPDS",
        name: "Food, Civil Supplies & Consumer Protection (MahaFood)",
        marathi_name: "अन्न, नागरी पुरवठा व ग्राहक संरक्षण (महाअन्न)",
        category: "Civil Supplies",
        code: "FCS-06",
        status: "Connected",
        last_sync: "7 mins ago",
        latency: 41,
        daily_calls: 215400,
        health: 99.6,
        schemas_provided: JSON.stringify(["RationFamily_NFSA.v1", "FairPriceQuota.v1"]),
        schemas_consumed: JSON.stringify(["AadhaarKyc.v2", "LandRecord712.v3"]),
        nodal_officer: "Smt. Sujata Saunik (IAS)",
        node_ip: "10.142.20.36",
        ssl_expiry: "2027-04-18 (Valid)",
        description: "Public Distribution System (PDS) database governing 1.5 crore ration cards, One Nation One Ration Card (ONORC) portability, and grain allocation."
      },
      {
        id: "MH-AGR-SHETKARI",
        name: "Agriculture & Farmers Welfare (MahaDBT Shetkari)",
        marathi_name: "कृषी व शेतकरी कल्याण विभाग",
        category: "Agriculture & DBT",
        code: "AGR-07",
        status: "Connected",
        last_sync: "4 mins ago",
        latency: 49,
        daily_calls: 185200,
        health: 99.4,
        schemas_provided: JSON.stringify(["FarmerSubsidy_DBT.v2", "CropInsuranceClaim.v1"]),
        schemas_consumed: JSON.stringify(["LandRecord712.v3", "AadhaarKyc.v2"]),
        nodal_officer: "Shri Vikas Chandra Rastogi (IAS)",
        node_ip: "10.142.20.42",
        ssl_expiry: "2027-09-05 (Valid)",
        description: "Disburses Namo Shetkari Mahasanman Yojana, PM-KISAN, crop loss drought compensation, and farm equipment subsidies via land record validation."
      },
      {
        id: "MH-EDU-MAHADBT",
        name: "Higher & Technical Education (Scholarship Node)",
        marathi_name: "उच्च व तंत्रशिक्षण विभाग (महाडीबीटी शिष्यवृत्ती)",
        category: "Education",
        code: "EDU-08",
        status: "Pending",
        last_sync: "Awaiting TLS Cert",
        latency: 0,
        daily_calls: 0,
        health: 92.0,
        schemas_provided: JSON.stringify(["UniversityEnrollment.v1", "DegreeVerification.v1"]),
        schemas_consumed: JSON.stringify(["AadhaarKyc.v2", "RationFamily_NFSA.v1", "LandRecord712.v3"]),
        nodal_officer: "Dr. Shailendra Deolankar (Director Higher Ed)",
        node_ip: "10.142.20.50",
        ssl_expiry: "Pending Key Exchange",
        description: "Unified scholarship eligibility validation node linking caste certificates, domicile verification, and university degree registries."
      }
    ];

    for (const d of depts) {
      sqlDb.run(
        `INSERT INTO departments (id, name, marathi_name, category, code, status, last_sync, latency, daily_calls, health, schemas_provided, schemas_consumed, nodal_officer, node_ip, ssl_expiry, description)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [d.id, d.name, d.marathi_name, d.category, d.code, d.status, d.last_sync, d.latency, d.daily_calls, d.health, d.schemas_provided, d.schemas_consumed, d.nodal_officer, d.node_ip, d.ssl_expiry, d.description]
      );
    }
  }

  // Seed Standardized Schemas
  const schemaCount = queryOne('SELECT COUNT(*) as count FROM standardized_schemas');
  if (!schemaCount || schemaCount.count === 0) {
    console.log('Seeding Standardized NDGFP State Schemas...');

    const schemas = [
      {
        id: "schema-land-712",
        name: "MahaBhulekh 7/12 Land Record Schema",
        schema_code: "MahaBhulekh.LandRecord712.v3",
        version: "v3.2.0 (NDGFP-Aligned)",
        domain: "Revenue & Land Administration",
        classification: "Confidential / Citizen PII",
        lead_department: "Revenue & Forest Department, Maharashtra",
        description: "Standardized JSON schema representing Village Form VII (Record of Rights) and Form XII (Crop & Land Usage) with geo-coordinate bounding boxes and mutation status.",
        fields_count: 12,
        fields_json: JSON.stringify([
          { name: "districtCode", type: "string (LGD)", required: true, desc: "Local Government Directory 3-digit district code" },
          { name: "talukaCode", type: "string (LGD)", required: true, desc: "LGD sub-district code" },
          { name: "villageCode", type: "string (LGD)", required: true, desc: "LGD 6-digit village census code" },
          { name: "surveyNumber", type: "string", required: true, desc: "Revenue survey number / Gat number" },
          { name: "subDivisionNumber", type: "string", required: true, desc: "Hissa / subdivision identifier" },
          { name: "totalAreaHectares", type: "number (float)", required: true, desc: "Total land parcel area in hectares" },
          { name: "khataNumber", type: "string", required: true, desc: "Khata (Account) number of the landholder" },
          { name: "landTenureClass", type: "enum (Class-1 | Class-2)", required: true, desc: "Occupancy tenure type" },
          { name: "owners", type: "array<Owner>", required: true, desc: "List of co-owners with share ratio" },
          { name: "currentCrops", type: "array<CropEntry>", required: true, desc: "Kharif/Rabi crop survey data" }
        ]),
        sample_payload_json: JSON.stringify({
          schemaVersion: "3.2.0",
          transactionId: "TXN-MH-BHU-20260828-99214",
          timestamp: "2026-08-28T09:42:10+05:30",
          landRecord: {
            stateCode: "27",
            districtName: "Nashik",
            districtCode: "481",
            talukaName: "Niphad",
            talukaCode: "03841",
            villageName: "Pimpalgaon Baswant",
            villageCode: "550124",
            gatNumber: "142",
            hissaNumber: "2/B",
            khataNumber: "KH-8841",
            tenureType: "Occupant Class 1 (भोगवटादार वर्ग १)",
            totalArea: { cultivableHectares: 1.84, potKharabaHectares: 0.06, unit: "Hectares" },
            landHolders: [{ holderName: "Ramesh Santosh Patil (रमेश संतोष पाटील)", relationType: "Self", shareRatio: "1.00", isPrimary: true }],
            cropSurvey: [
              { season: "Kharif 2026", cropName: "Onion (कांदा)", cultivatedAreaHectares: 1.20, irrigationSource: "Well & Drip" },
              { season: "Kharif 2026", cropName: "Soybean (सोयाबीन)", cultivatedAreaHectares: 0.64, irrigationSource: "Rainfed" }
            ]
          },
          verificationToken: "SETU-DSIG-MH-REV-OK-99120"
        })
      },
      {
        id: "schema-vahan-rc",
        name: "MahaVahan Vehicle RC & Fitness Schema",
        schema_code: "MahaVahan.VehicleRC_Fitness.v2",
        version: "v2.4.1",
        domain: "Transport & Road Safety",
        classification: "Restricted / Asset Registry",
        lead_department: "Motor Vehicles Department (Transport Dept, MH)",
        description: "Interoperable vehicle registration, engine chassis mapping, emission standard, valid insurance status, and commercial fitness expiry.",
        fields_count: 8,
        fields_json: JSON.stringify([
          { name: "registrationNumber", type: "string", required: true, desc: "High Security Registration Plate identifier" },
          { name: "vehicleClass", type: "string", required: true, desc: "LMV / HGV / Two-Wheeler / Commercial" },
          { name: "fuelType", type: "enum", required: true, desc: "Engine fuel type (Petrol/Diesel/EV)" },
          { name: "insuranceValidUntil", type: "string (ISO Date)", required: true, desc: "Valid insurance policy expiry date" },
          { name: "fitnessValidUntil", type: "string (ISO Date)", required: true, desc: "RTO vehicle roadworthiness fitness date" }
        ]),
        sample_payload_json: JSON.stringify({
          schemaVersion: "2.4.1",
          transactionId: "TXN-MH-VAH-20260828-33104",
          vehicleData: {
            regNumber: "MH-15-DC-4421",
            rtoOffice: "MH-15 (Nashik RTO)",
            vehicleClass: "LMV (Light Motor Vehicle - Car)",
            makerModel: "Tata Nexon EV Max (XZ+ Lux)",
            fuelType: "ELECTRIC (Zero Emission)",
            registrationDate: "2024-05-18",
            fitnessValidUntil: "2039-05-17",
            insuranceDetails: { company: "New India Assurance Co. Ltd.", status: "ACTIVE" }
          }
        })
      },
      {
        id: "schema-abdm-health",
        name: "ABDM Health Records & Clinical Encounter",
        schema_code: "ArogyaHealth.ABDM_EHR_Encounter.v1",
        version: "v1.1.2 (FHIR R4 Compatible)",
        domain: "Public Health & Clinical Registry",
        classification: "Highly Sensitive PII (DPDP Protected)",
        lead_department: "Public Health Department & National Health Authority",
        description: "FHIR-compliant electronic health encounter bundle containing ABHA ID linkage, diagnosis summaries, immunizations, and doctor e-prescriptions.",
        fields_count: 5,
        fields_json: JSON.stringify([
          { name: "abhaId", type: "string", required: true, desc: "Ayushman Bharat Health Account 14-digit identifier" },
          { name: "facilityCode", type: "string", required: true, desc: "Health Facility Registry identifier" },
          { name: "encounterDate", type: "string", required: true, desc: "Date and time of clinical interaction" },
          { name: "diagnoses", type: "array<ICD10>", required: true, desc: "Standardized ICD-10 diagnostic codes" }
        ]),
        sample_payload_json: JSON.stringify({
          schemaVersion: "1.1.2",
          abhaId: "91-4421-9981-2210",
          encounterBundle: {
            encounterId: "ENC-DH-NSK-2026-4410",
            date: "2026-07-14T11:30:00+05:30",
            facilityName: "District General Hospital, Nashik",
            doctorName: "Dr. Pradeep Jadhav, MD",
            diagnoses: [{ icdCode: "I10", description: "Essential Hypertension" }]
          }
        })
      },
      {
        id: "schema-pds-ration",
        name: "MahaPDS Ration & Food Security Schema",
        schema_code: "MahaFoodPDS.RationFamily_NFSA.v1",
        version: "v1.3.0",
        domain: "Food & Civil Supplies",
        classification: "Restricted / Social Welfare",
        lead_department: "Food, Civil Supplies and Consumer Protection Dept",
        description: "National Food Security Act (NFSA) household entitlement record, biometric seeding status, FPS shop mapping, and monthly grain quota balance.",
        fields_count: 4,
        fields_json: JSON.stringify([
          { name: "rationCardNumber", type: "string", required: true, desc: "Unique RC Number under MahaPDS" },
          { name: "cardType", type: "enum", required: true, desc: "NFSA category classification (PHH/AAY)" },
          { name: "familyHead", type: "string", required: true, desc: "Eldest female head of household" },
          { name: "totalMembers", type: "number", required: true, desc: "Beneficiaries count" }
        ]),
        sample_payload_json: JSON.stringify({
          rationCardNumber: "270481005521",
          cardCategory: "PHH (Priority Household)",
          familyHead: "Sunita Ramesh Patil",
          totalMembers: 4,
          monthlyEntitlements: { wheatKg: 12, riceKg: 8, subsidyScheme: "PMGKAY (Free Distribution)" }
        })
      },
      {
        id: "schema-police-cctns",
        name: "Maharashtra Police CCTNS Verification & E-Challan",
        schema_code: "MahaPolice.CCTNS_Verification.v2",
        version: "v2.1.0",
        domain: "Home & Law Enforcement",
        classification: "Confidential / Law Enforcement",
        lead_department: "Maharashtra Police & CID",
        description: "Background character verification status, pending traffic e-challans, and FIR clearance record for employment, passport, and licensing.",
        fields_count: 3,
        fields_json: JSON.stringify([
          { name: "citizenVidHash", type: "string", required: true, desc: "Tokenized Aadhaar VID" },
          { name: "criminalRecordHistory", type: "boolean", required: true, desc: "Adverse FIR history" },
          { name: "verificationStatus", type: "enum", required: true, desc: "CLEARED / ADVERSE / UNDER_INQUIRY" }
        ]),
        sample_payload_json: JSON.stringify({
          verificationToken: "CCTNS-MH-NOC-2026-981240",
          policeStation: "Pimpalgaon Baswant Police Station, Nashik",
          verificationSummary: { hasAdverseRecord: false, status: "CLEAR / NO ADVERSE RECORD FOUND" }
        })
      }
    ];

    for (const s of schemas) {
      sqlDb.run(
        `INSERT INTO standardized_schemas (id, name, schema_code, version, domain, classification, lead_department, description, fields_count, fields_json, sample_payload_json)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [s.id, s.name, s.schema_code, s.version, s.domain, s.classification, s.lead_department, s.description, s.fields_count, s.fields_json, s.sample_payload_json]
      );
    }
  }

  // Seed Integration Requests Queue
  const reqCount = queryOne('SELECT COUNT(*) as count FROM integration_requests');
  if (!reqCount || reqCount.count === 0) {
    console.log('Seeding Integration Requests Queue...');
    const reqs = [
      {
        id: "REQ-2026-084",
        requesting_dept: "Agriculture & Farmers Welfare (MahaDBT Shetkari)",
        source_dept: "Revenue & Forest Department (MahaBhulekh)",
        schema_needed: "MahaBhulekh.LandRecord712.v3",
        purpose: "Real-time automated verification of farmer land parcel area and crop survey for instant Namo Shetkari DBT disbursement.",
        data_classification: "Confidential / Citizen PII",
        sla_priority: "Mission Critical",
        submitted_by: "Shri V. C. Rastogi (Secretary, Agriculture)",
        submitted_at: "28 Aug 2026, 08:30 AM",
        status: "Approved",
        gateway_route: "/api/v2/exchange/agri-bhulekh-dbt",
        approval_stage: "Approved & Live — Gateway Route Active (/api/v2/exchange/agri-bhulekh-dbt)"
      },
      {
        id: "REQ-2026-085",
        requesting_dept: "Maharashtra State Police & CID (Traffic Branch)",
        source_dept: "Motor Vehicles & Transport Dept (RTO / Vahan)",
        schema_needed: "MahaVahan.VehicleRC_Fitness.v2",
        purpose: "Real-time automated vehicle registration and blacklisted stolen vehicle detection on CCTV ANPR cameras along Mumbai-Pune Expressway.",
        data_classification: "Restricted / Asset Registry",
        sla_priority: "Mission Critical",
        submitted_by: "DCP Traffic Control Room, Mumbai",
        submitted_at: "27 Aug 2026, 04:15 PM",
        status: "Approved",
        gateway_route: "/api/v2/exchange/police-vahan-anpr",
        approval_stage: "Approved & Live — Gateway Route Active (/api/v2/exchange/police-vahan-anpr)"
      },
      {
        id: "REQ-2026-086",
        requesting_dept: "Higher & Technical Education Department",
        source_dept: "Food, Civil Supplies & Consumer Protection (MahaFood)",
        schema_needed: "MahaFoodPDS.RationFamily_NFSA.v1",
        purpose: "Verification of BPL / EWS economic status for Post-Matric Tuition Fee Exemption scholarships for undergraduate engineering and medical students.",
        data_classification: "Restricted / Social Welfare",
        sla_priority: "Urgent",
        submitted_by: "Joint Director, Technical Education, Pune",
        submitted_at: "28 Aug 2026, 09:10 AM",
        status: "Pending Review",
        gateway_route: "/api/v2/exchange/edu-pds-scholarship",
        approval_stage: "Awaiting Nodal Data Custodian Authorization & DPDP Policy Review"
      }
    ];

    for (const r of reqs) {
      sqlDb.run(
        `INSERT INTO integration_requests (id, requesting_dept, source_dept, schema_needed, purpose, data_classification, sla_priority, submitted_by, submitted_at, status, gateway_route, approval_stage)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [r.id, r.requesting_dept, r.source_dept, r.schema_needed, r.purpose, r.data_classification, r.sla_priority, r.submitted_by, r.submitted_at, r.status, r.gateway_route, r.approval_stage]
      );
    }
  }

  // Seed Citizen Profile
  const citizenCount = queryOne('SELECT COUNT(*) as count FROM citizen_profiles');
  if (!citizenCount || citizenCount.count === 0) {
    console.log('Seeding Primary Citizen Profile...');
    sqlDb.run(
      `INSERT INTO citizen_profiles (id, maha_id, name, marathi_name, aadhaar_vid_masked, aadhaar_token_hash, digilocker_status, phone_masked, residential_address, kyc_compliance, privacy_score)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        "CIT-PATIL-01",
        "MH-2024-PATIL-8921",
        "Ramesh Santosh Patil",
        "रमेश संतोष पाटील",
        "•••• •••• 8921",
        "SHA256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
        "Linked & Verified (Level 3)",
        "+91 98230 •••••",
        "Gat No. 142/2, Pimpalgaon Baswant, Taluka Niphad, District Nashik, Maharashtra - 422209",
        "DPDP Act (2023) Verified",
        88
      ]
    );

    // Seed Initial Consents
    const consents = [
      {
        id: "CONS-01",
        citizen_maha_id: "MH-2024-PATIL-8921",
        department: "Agriculture & Farmers Welfare (MahaDBT)",
        dept_category: "Agriculture",
        purpose: "Validation of 7/12 land records & crop survey for automated credit of Namo Shetkari Mahasanman Subsidy & PM-KISAN instalments.",
        legal_mandate: "DPDP Act 2023 & Maharashtra State DBT Rules",
        data_categories_json: JSON.stringify(["MahaBhulekh 7/12 Land Parcel", "Kharif Crop Survey", "Bank Account Linkage"]),
        granted_date: "12 Jan 2024",
        valid_until: "3 Years",
        is_granted: 1,
        is_mandatory: 0,
        last_accessed: "28 Aug 2026, 09:42 AM"
      },
      {
        id: "CONS-02",
        citizen_maha_id: "MH-2024-PATIL-8921",
        department: "Motor Vehicles & Transport Dept (RTO / Vahan)",
        dept_category: "Transport",
        purpose: "Verification of residential address & identity for automated Smart Card Driving License renewal and High Security Number Plate dispatch.",
        legal_mandate: "Motor Vehicles Act 1988 & DPDP Act 2023",
        data_categories_json: JSON.stringify(["Aadhaar Virtual ID", "Permanent Address", "Mobile Number"]),
        granted_date: "18 May 2024",
        valid_until: "5 Years",
        is_granted: 1,
        is_mandatory: 0,
        last_accessed: "18 May 2024, 02:15 PM"
      },
      {
        id: "CONS-03",
        citizen_maha_id: "MH-2024-PATIL-8921",
        department: "Public Health & Family Welfare (Arogya Vibhag / MJPJAY)",
        dept_category: "Healthcare",
        purpose: "Linkage of ABDM electronic health record with Mahatma Jyotirao Phule Jan Arogya Yojana for cashless hospital admissions across empaneled hospitals.",
        legal_mandate: "ABDM Health Data Management Policy",
        data_categories_json: JSON.stringify(["ABHA Health ID (91-4421-9981-2210)", "Clinical Encounter Summary", "Ration Card BPL Status"]),
        granted_date: "14 Jul 2026",
        valid_until: "1 Year",
        is_granted: 1,
        is_mandatory: 0,
        last_accessed: "14 Jul 2026, 11:32 AM"
      },
      {
        id: "CONS-04",
        citizen_maha_id: "MH-2024-PATIL-8921",
        department: "Brihanmumbai Municipal Corp & Urban Local Bodies",
        dept_category: "Urban Governance",
        purpose: "Cross-verification of rural property records for agricultural tax exemption certificate during commercial property acquisition in MMR region.",
        legal_mandate: "MMC Act 1888",
        data_categories_json: JSON.stringify(["Land Holding Area", "Khata Number"]),
        granted_date: "10 Jun 2026",
        valid_until: "Revoked",
        is_granted: 0,
        is_mandatory: 0,
        last_accessed: "Revoked by Citizen (10 Jun 2026)"
      },
      {
        id: "CONS-05",
        citizen_maha_id: "MH-2024-PATIL-8921",
        department: "Food, Civil Supplies & Consumer Protection (MahaFood)",
        dept_category: "Civil Supplies",
        purpose: "One Nation One Ration Card (ONORC) biometric authentication for subsidized monthly grain entitlement at Fair Price Shops.",
        legal_mandate: "National Food Security Act (NFSA 2013)",
        data_categories_json: JSON.stringify(["Aadhaar Biometric Token", "Family Composition", "FPS Allocation"]),
        granted_date: "01 Jan 2024",
        valid_until: "Perpetual",
        is_granted: 1,
        is_mandatory: 1,
        last_accessed: "04 Aug 2026, 10:15 AM"
      }
    ];

    for (const c of consents) {
      sqlDb.run(
        `INSERT INTO citizen_consents (id, citizen_maha_id, department, dept_category, purpose, legal_mandate, data_categories_json, granted_date, valid_until, is_granted, is_mandatory, last_accessed)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [c.id, c.citizen_maha_id, c.department, c.dept_category, c.purpose, c.legal_mandate, c.data_categories_json, c.granted_date, c.valid_until, c.is_granted, c.is_mandatory, c.last_accessed]
      );
    }

    // Seed Audit Logs
    const logs = [
      {
        id: "AUD-2026-991",
        timestamp: "28 Aug 2026, 09:42 AM",
        department: "Agriculture & Farmers Welfare (MahaDBT)",
        purpose: "Farmer Drought Compensation & Kharif 2026 Crop Area Verification",
        fields_accessed_json: JSON.stringify(["Gat No. 142/2", "Cultivable Area: 1.84 Ha", "Crop: Onion & Soybean"]),
        authorization_token: "AUTH-TKN-AGR-MH-9921",
        status: "Allowed (Consent Active)",
        ip_node: "10.142.20.42 (MahaDBT Server)",
        citizen_maha_id: "MH-2024-PATIL-8921"
      },
      {
        id: "AUD-2026-990",
        timestamp: "04 Aug 2026, 10:15 AM",
        department: "Food & Civil Supplies (MahaFood PDS)",
        purpose: "Monthly NFSA Grain Quota Biometric Authentication at Fair Price Shop #104",
        fields_accessed_json: JSON.stringify(["Ration Card: 270481005521", "Biometric Hash", "Family Members: 4"]),
        authorization_token: "AUTH-TKN-PDS-MH-8814",
        status: "Allowed (Consent Active)",
        ip_node: "10.142.20.36 (PDS State Server)",
        citizen_maha_id: "MH-2024-PATIL-8921"
      },
      {
        id: "AUD-2026-989",
        timestamp: "14 Jul 2026, 11:32 AM",
        department: "Public Health (Arogya Vibhag / ABDM)",
        purpose: "OPD Consultation & Hypertension Clinical Record Sync at District Hospital Nashik",
        fields_accessed_json: JSON.stringify(["ABHA ID: 91-4421-9981-2210", "Vitals Record", "e-Prescription: Telmisartan 40mg"]),
        authorization_token: "AUTH-TKN-HLT-MH-7719",
        status: "Allowed (Consent Active)",
        ip_node: "10.142.20.18 (ABDM Gateway Node)",
        citizen_maha_id: "MH-2024-PATIL-8921"
      }
    ];

    for (const l of logs) {
      sqlDb.run(
        `INSERT INTO audit_logs (id, timestamp, department, purpose, fields_accessed_json, authorization_token, status, ip_node, citizen_maha_id)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [l.id, l.timestamp, l.department, l.purpose, l.fields_accessed_json, l.authorization_token, l.status, l.ip_node, l.citizen_maha_id]
      );
    }
  }

  // Seed API Metrics
  const metricsCount = queryOne('SELECT COUNT(*) as count FROM api_metrics');
  if (!metricsCount || metricsCount.count === 0) {
    console.log('Seeding 7-Day API Traffic Metrics...');
    const metrics = [
      { day: "22 Aug", total_calls: 2420000, revenue_calls: 710000, transport_calls: 540000, health_calls: 380000, police_calls: 320000, other_calls: 470000, latency: 45, success_rate: 99.92 },
      { day: "23 Aug", total_calls: 2580000, revenue_calls: 750000, transport_calls: 580000, health_calls: 395000, police_calls: 345000, other_calls: 510000, latency: 43, success_rate: 99.91 },
      { day: "24 Aug", total_calls: 2190000, revenue_calls: 640000, transport_calls: 490000, health_calls: 340000, police_calls: 310000, other_calls: 410000, latency: 39, success_rate: 99.95 },
      { day: "25 Aug", total_calls: 2710000, revenue_calls: 790000, transport_calls: 610000, health_calls: 405000, police_calls: 375000, other_calls: 530000, latency: 48, success_rate: 99.88 },
      { day: "26 Aug", total_calls: 2890000, revenue_calls: 830000, transport_calls: 630000, health_calls: 420000, police_calls: 390000, other_calls: 620000, latency: 44, success_rate: 99.89 },
      { day: "27 Aug", total_calls: 2940000, revenue_calls: 855000, transport_calls: 645000, health_calls: 430000, police_calls: 395000, other_calls: 615000, latency: 41, success_rate: 99.94 },
      { day: "28 Aug (Today)", total_calls: 2845920, revenue_calls: 842190, transport_calls: 621450, health_calls: 412800, police_calls: 389200, other_calls: 580280, latency: 42, success_rate: 99.94 }
    ];

    for (const m of metrics) {
      sqlDb.run(
        `INSERT INTO api_metrics (day, total_calls, revenue_calls, transport_calls, health_calls, police_calls, other_calls, latency, success_rate)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [m.day, m.total_calls, m.revenue_calls, m.transport_calls, m.health_calls, m.police_calls, m.other_calls, m.latency, m.success_rate]
      );
    }
  }

  saveDb();
  console.log('✓ Database schema and seed verification complete!');
}
