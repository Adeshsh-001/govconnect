export const DEPARTMENTS = [
  {
    id: "MH-REV-BHULEKH",
    name: "Revenue & Forest Department (MahaBhulekh)",
    marathiName: "महसूल व वन विभाग (महाभूलेख)",
    category: "Land & Revenue",
    code: "REV-01",
    status: "Connected",
    lastSync: "Just now",
    latency: 38,
    dailyCalls: 842190,
    health: 99.9,
    schemasProvided: ["LandRecord712.v3", "PropertyMutation.v1"],
    schemasConsumed: ["AadhaarKyc.v2", "PDSFamily.v1"],
    nodalOfficer: "Shri S. K. Deshmukh (IAS)",
    nodeIp: "10.142.20.11",
    sslExpiry: "2027-11-15 (Valid)",
    description: "Maintains 7/12 land extracts, 8-A khatepustika, property card records, and mutation entries for all 36 districts of Maharashtra."
  },
  {
    id: "MH-MVD-VAHAN",
    name: "Motor Vehicles & Transport Dept (RTO / Vahan)",
    marathiName: "मोटार वाहन व परिवहन विभाग (आरटीओ / वाहन)",
    category: "Transport",
    code: "TRN-02",
    status: "Connected",
    lastSync: "2 mins ago",
    latency: 44,
    dailyCalls: 621450,
    health: 99.7,
    schemasProvided: ["VehicleRC_Fitness.v2", "DriverLicense.v1"],
    schemasConsumed: ["AadhaarKyc.v2", "PoliceVerification.v2"],
    nodalOfficer: "Smt. Manisha Verma (IPS)",
    nodeIp: "10.142.20.14",
    sslExpiry: "2027-08-20 (Valid)",
    description: "Authoritative repository for 3.4 crore registered vehicles, PUC certificates, commercial permits, and driving license records across Maharashtra."
  },
  {
    id: "MH-PHD-AROGYA",
    name: "Public Health & Family Welfare (Arogya Vibhag)",
    marathiName: "सार्वजनिक आरोग्य विभाग (आरोग्य विभाग / ABDM)",
    category: "Healthcare",
    code: "HLT-03",
    status: "Connected",
    lastSync: "1 min ago",
    latency: 52,
    dailyCalls: 412800,
    health: 99.8,
    schemasProvided: ["HealthEncounter_EHR.v1", "ImmunizationRecord.v2"],
    schemasConsumed: ["AadhaarKyc.v2", "RationFamily.v1"],
    nodalOfficer: "Dr. Nitin Ambadekar (Director Health)",
    nodeIp: "10.142.20.18",
    sslExpiry: "2027-05-10 (Valid)",
    description: "Interoperable health data layer integrated with Ayushman Bharat Digital Mission (ABDM), MJPJAY health scheme claims, and civil hospitals."
  },
  {
    id: "MH-POL-CCTNS",
    name: "Maharashtra State Police & CID (CCTNS / e-Challan)",
    marathiName: "महाराष्ट्र राज्य पोलीस व गुन्हे अन्वेषण (CCTNS)",
    category: "Home & Law Enforcement",
    code: "POL-04",
    status: "Connected",
    lastSync: "3 mins ago",
    latency: 31,
    dailyCalls: 389200,
    health: 100.0,
    schemasProvided: ["PoliceVerification_NOC.v2", "TrafficChallan.v1"],
    schemasConsumed: ["VehicleRC_Fitness.v2", "LandRecord712.v3", "AadhaarKyc.v2"],
    nodalOfficer: "Shri Amitabh Gupta (IPS)",
    nodeIp: "10.142.20.22",
    sslExpiry: "2028-01-30 (Valid)",
    description: "Real-time verification system for character certificates, traffic e-challans, passport verification, and inter-agency intelligence sharing."
  },
  {
    id: "MH-BMC-MUNICIPAL",
    name: "Brihanmumbai Municipal Corp (BMC / Urban Dev)",
    marathiName: "बृहन्मुंबई महानगरपालिका व नगरविकास",
    category: "Urban Local Bodies",
    code: "ULB-05",
    status: "Connected",
    lastSync: "5 mins ago",
    latency: 68,
    dailyCalls: 310500,
    health: 98.9,
    schemasProvided: ["PropertyTax_Assessment.v1", "WaterBilling.v1", "TradeLicense.v2"],
    schemasConsumed: ["LandRecord712.v3", "AadhaarKyc.v2"],
    nodalOfficer: "Shri Bhushan Gagrani (IAS)",
    nodeIp: "10.142.20.30",
    sslExpiry: "2026-12-12 (Valid)",
    description: "Metropolitan municipal governance node providing property tax assessments, building proposal clearances, trade licenses, and water utility metrics."
  },
  {
    id: "MH-FCS-MAHAPDS",
    name: "Food, Civil Supplies & Consumer Protection (MahaFood)",
    marathiName: "अन्न, नागरी पुरवठा व ग्राहक संरक्षण (महाअन्न)",
    category: "Civil Supplies",
    code: "FCS-06",
    status: "Connected",
    lastSync: "7 mins ago",
    latency: 41,
    dailyCalls: 215400,
    health: 99.6,
    schemasProvided: ["RationFamily_NFSA.v1", "FairPriceQuota.v1"],
    schemasConsumed: ["AadhaarKyc.v2", "LandRecord712.v3"],
    nodalOfficer: "Smt. Sujata Saunik (IAS)",
    nodeIp: "10.142.20.36",
    sslExpiry: "2027-04-18 (Valid)",
    description: "Public Distribution System (PDS) database governing 1.5 crore ration cards, One Nation One Ration Card (ONORC) portability, and grain allocation."
  },
  {
    id: "MH-AGR-SHETKARI",
    name: "Agriculture & Farmers Welfare (MahaDBT Shetkari)",
    marathiName: "कृषी व शेतकरी कल्याण विभाग",
    category: "Agriculture & DBT",
    code: "AGR-07",
    status: "Connected",
    lastSync: "4 mins ago",
    latency: 49,
    dailyCalls: 185200,
    health: 99.4,
    schemasProvided: ["FarmerSubsidy_DBT.v2", "CropInsuranceClaim.v1"],
    schemasConsumed: ["LandRecord712.v3", "AadhaarKyc.v2"],
    nodalOfficer: "Shri Vikas Chandra Rastogi (IAS)",
    nodeIp: "10.142.20.42",
    sslExpiry: "2027-09-05 (Valid)",
    description: "Disburses Namo Shetkari Mahasanman Yojana, PM-KISAN, crop loss drought compensation, and farm equipment subsidies via land record validation."
  },
  {
    id: "MH-EDU-MAHADBT",
    name: "Higher & Technical Education (Scholarship Node)",
    marathiName: "उच्च व तंत्रशिक्षण विभाग (महाडीबीटी शिष्यवृत्ती)",
    category: "Education",
    code: "EDU-08",
    status: "Pending",
    lastSync: "Awaiting TLS Cert",
    latency: 0,
    dailyCalls: 0,
    health: 92.0,
    schemasProvided: ["UniversityEnrollment.v1", "DegreeVerification.v1"],
    schemasConsumed: ["AadhaarKyc.v2", "RationFamily_NFSA.v1", "LandRecord712.v3"],
    nodalOfficer: "Dr. Shailendra Deolankar (Director Higher Ed)",
    nodeIp: "10.142.20.50",
    sslExpiry: "Pending Key Exchange",
    description: "Unified scholarship eligibility validation node linking caste certificates, domicile verification, and university degree registries."
  }
];

export const API_METRICS_7DAYS = [
  { day: "22 Aug", totalCalls: 2420000, revenueCalls: 710000, transportCalls: 540000, healthCalls: 380000, policeCalls: 320000, otherCalls: 470000, latency: 45, successRate: 99.92 },
  { day: "23 Aug", totalCalls: 2580000, revenueCalls: 750000, transportCalls: 580000, healthCalls: 395000, policeCalls: 345000, otherCalls: 510000, latency: 43, successRate: 99.91 },
  { day: "24 Aug", totalCalls: 2190000, revenueCalls: 640000, transportCalls: 490000, healthCalls: 340000, policeCalls: 310000, otherCalls: 410000, latency: 39, successRate: 99.95 },
  { day: "25 Aug", totalCalls: 2710000, revenueCalls: 790000, transportCalls: 610000, healthCalls: 405000, policeCalls: 375000, otherCalls: 530000, latency: 48, successRate: 99.88 },
  { day: "26 Aug", totalCalls: 2890000, revenueCalls: 830000, transportCalls: 630000, healthCalls: 420000, policeCalls: 390000, otherCalls: 620000, latency: 44, successRate: 99.89 },
  { day: "27 Aug", totalCalls: 2940000, revenueCalls: 855000, transportCalls: 645000, healthCalls: 430000, policeCalls: 395000, otherCalls: 615000, latency: 41, successRate: 99.94 },
  { day: "28 Aug (Today)", totalCalls: 2845920, revenueCalls: 842190, transportCalls: 621450, healthCalls: 412800, policeCalls: 389200, otherCalls: 580280, latency: 42, successRate: 99.94 }
];

export const STANDARDIZED_SCHEMAS = [
  {
    id: "schema-land-712",
    name: "MahaBhulekh 7/12 Land Record Schema",
    schemaCode: "MahaBhulekh.LandRecord712.v3",
    version: "v3.2.0 (NDGFP-Aligned)",
    domain: "Revenue & Land Administration",
    classification: "Confidential / Citizen PII",
    leadDepartment: "Revenue & Forest Department, Maharashtra",
    description: "Standardized JSON schema representing Village Form VII (Record of Rights) and Form XII (Crop & Land Usage) with geo-coordinate bounding boxes and mutation status.",
    fieldsCount: 14,
    fields: [
      { name: "districtCode", type: "string (LGD)", required: true, desc: "Local Government Directory 3-digit district code" },
      { name: "talukaCode", type: "string (LGD)", required: true, desc: "LGD sub-district code" },
      { name: "villageCode", type: "string (LGD)", required: true, desc: "LGD 6-digit village census code" },
      { name: "surveyNumber", type: "string", required: true, desc: "Revenue survey number / Gat number" },
      { name: "subDivisionNumber", type: "string", required: true, desc: "Hissa / subdivision identifier" },
      { name: "totalAreaHectares", type: "number (float)", required: true, desc: "Total land parcel area in hectares (Pot Kharaba excluded)" },
      { name: "khataNumber", type: "string", required: true, desc: "Khata (Account) number of the landholder" },
      { name: "landTenureClass", type: "enum (Class-1 | Class-2)", required: true, desc: "Occupancy tenure type (Bhogvatdar 1 or 2)" },
      { name: "owners", type: "array<Owner>", required: true, desc: "List of co-owners with Aadhaar VID hash and share ratio" },
      { name: "encumbranceDetails", type: "array<BankLoan>", required: false, desc: "Active bank mortgages or court injunctions" },
      { name: "currentCrops", type: "array<CropEntry>", required: true, desc: "Kharif/Rabi crop survey data for the ongoing agricultural year" },
      { name: "digitallySignedBy", type: "string (DSig)", required: true, desc: "e-Sign token of the Circle Officer / Talathi" }
    ],
    samplePayload: {
      "schemaVersion": "3.2.0",
      "transactionId": "TXN-MH-BHU-20260828-99214",
      "timestamp": "2026-08-28T09:42:10+05:30",
      "landRecord": {
        "stateCode": "27",
        "districtName": "Nashik",
        "districtCode": "481",
        "talukaName": "Niphad",
        "talukaCode": "03841",
        "villageName": "Pimpalgaon Baswant",
        "villageCode": "550124",
        "gatNumber": "142",
        "hissaNumber": "2/B",
        "khataNumber": "KH-8841",
        "tenureType": "Occupant Class 1 (भोगवटादार वर्ग १)",
        "totalArea": {
          "cultivableHectares": 1.84,
          "potKharabaHectares": 0.06,
          "unit": "Hectares"
        },
        "landHolders": [
          {
            "holderName": "Ramesh Santosh Patil (रमेश संतोष पाटील)",
            "relationType": "Self",
            "aadhaarTokenHash": "SHA256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
            "shareRatio": "1.00",
            "isPrimary": true
          }
        ],
        "cropSurvey": [
          {
            "season": "Kharif 2026",
            "cropName": "Onion (कांदा)",
            "cropCode": "CRP-ONN-01",
            "cultivatedAreaHectares": 1.20,
            "irrigationSource": "Well & Drip Irrigation"
          },
          {
            "season": "Kharif 2026",
            "cropName": "Soybean (सोयाबीन)",
            "cropCode": "CRP-SOY-04",
            "cultivatedAreaHectares": 0.64,
            "irrigationSource": "Rainfed"
          }
        ],
        "encumbrance": {
          "hasActiveLoan": true,
          "lenderBank": "Bank of Maharashtra, Niphad Branch",
          "loanAmountInr": 150000,
          "loanType": "Kisan Credit Card (KCC)",
          "chargeCreatedDate": "2024-06-12"
        },
        "eMutationStatus": {
          "pendingMutations": 0,
          "lastMutationNumber": "FER-2025-0814",
          "lastMutationDate": "2025-03-10"
        }
      },
      "verificationToken": "SETU-DSIG-MH-REV-OK-99120"
    }
  },
  {
    id: "schema-vahan-rc",
    name: "MahaVahan Vehicle RC & Fitness Schema",
    schemaCode: "MahaVahan.VehicleRC_Fitness.v2",
    version: "v2.4.1",
    domain: "Transport & Road Safety",
    classification: "Restricted / Asset Registry",
    leadDepartment: "Motor Vehicles Department (Transport Dept, MH)",
    description: "Interoperable vehicle registration, engine chassis mapping, emission standard, valid insurance status, and commercial fitness expiry.",
    fieldsCount: 12,
    fields: [
      { name: "registrationNumber", type: "string (e.g. MH-15-DC-4421)", required: true, desc: "High Security Registration Plate identifier" },
      { name: "chassisNumberMasked", type: "string", required: true, desc: "Last 5 digits visible for validation" },
      { name: "engineNumberMasked", type: "string", required: true, desc: "Last 5 digits visible for validation" },
      { name: "vehicleClass", type: "string", required: true, desc: "LMV / HGV / Two-Wheeler / Commercial" },
      { name: "fuelType", type: "enum (Petrol | Diesel | Electric | CNG)", required: true, desc: "Engine fuel type" },
      { name: "emissionNorm", type: "string", required: true, desc: "Bharat Stage VI / Stage IV" },
      { name: "insuranceValidUntil", type: "string (ISO Date)", required: true, desc: "Valid insurance policy expiry date" },
      { name: "pucValidUntil", type: "string (ISO Date)", required: true, desc: "Pollution Under Control certificate validity" },
      { name: "fitnessValidUntil", type: "string (ISO Date)", required: true, desc: "RTO vehicle roadworthiness fitness date" },
      { name: "taxValidUntil", type: "string (ISO Date)", required: true, desc: "One-time / Annual Road tax validity" },
      { name: "ownerAadhaarHash", type: "string (SHA256)", required: true, desc: "Tokenized owner UID" }
    ],
    samplePayload: {
      "schemaVersion": "2.4.1",
      "transactionId": "TXN-MH-VAH-20260828-33104",
      "timestamp": "2026-08-28T09:44:02+05:30",
      "vehicleData": {
        "regNumber": "MH-15-DC-4421",
        "rtoOffice": "MH-15 (Nashik RTO)",
        "vehicleClass": "LMV (Light Motor Vehicle - Car)",
        "makerModel": "Tata Nexon EV Max (XZ+ Lux)",
        "fuelType": "ELECTRIC (Zero Emission)",
        "emissionStandard": "EV / BS-VI Equivalent",
        "manufacturingMonthYear": "04/2024",
        "ownerMaskedName": "Ramesh S. P****",
        "maskedChassis": "MAT617******44120",
        "registrationDate": "2024-05-18",
        "fitnessValidUntil": "2039-05-17",
        "insuranceDetails": {
          "company": "New India Assurance Co. Ltd.",
          "policyNumber": "NIA-2026-990142-MH",
          "validUpto": "2027-05-16",
          "status": "ACTIVE"
        },
        "pucDetails": {
          "status": "EXEMPT_EV",
          "certificateNumber": "N/A"
        },
        "roadTaxStatus": "PAID_LIFETIME",
        "hypothecation": {
          "isFinanced": true,
          "financerName": "State Bank of India (Auto Loan Cell)"
        }
      }
    }
  },
  {
    id: "schema-abdm-health",
    name: "ABDM Health Records & Clinical Encounter",
    schemaCode: "ArogyaHealth.ABDM_EHR_Encounter.v1",
    version: "v1.1.2 (FHIR R4 Compatible)",
    domain: "Public Health & Clinical Registry",
    classification: "Highly Sensitive PII (DPDP Protected)",
    leadDepartment: "Public Health Department & National Health Authority",
    description: "FHIR-compliant electronic health encounter bundle containing ABHA ID linkage, diagnosis summaries, immunizations, and doctor e-prescriptions.",
    fieldsCount: 11,
    fields: [
      { name: "abhaId", type: "string (e.g. 91-4421-9981-2210)", required: true, desc: "Ayushman Bharat Health Account 14-digit identifier" },
      { name: "abhaAddress", type: "string (e.g. ramesh.patil@abdm)", required: true, desc: "ABDM handle for data exchange routing" },
      { name: "facilityCode", type: "string (NIN/HFR)", required: true, desc: "Health Facility Registry identifier (District Hospital / PHC)" },
      { name: "encounterDate", type: "string (ISO Date)", required: true, desc: "Date and time of clinical interaction" },
      { name: "encounterType", type: "enum (OPD | IPD | Emergency)", required: true, desc: "Type of patient visit" },
      { name: "diagnoses", type: "array<ICD10Code>", required: true, desc: "Standardized ICD-10 diagnostic codes" },
      { name: "vitalSigns", type: "object", required: false, desc: "BP, SpO2, Pulse, Blood Sugar levels" },
      { name: "prescribedMedications", type: "array<DrugEntry>", required: false, desc: "Generic drug name, dosage, frequency" },
      { name: "mjpjaySchemeClaim", type: "object", required: false, desc: "Mahatma Jyotirao Phule Jan Arogya Yojana pre-auth reference" }
    ],
    samplePayload: {
      "schemaVersion": "1.1.2",
      "abhaId": "91-4421-9981-2210",
      "abhaAddress": "ramesh.patil@abdm",
      "consentTokenRef": "DPDP-MH-2026-HLT-CONSENT-9912",
      "encounterBundle": {
        "encounterId": "ENC-DH-NSK-2026-4410",
        "date": "2026-07-14T11:30:00+05:30",
        "facilityName": "District General Hospital, Nashik",
        "facilityHFRId": "MH-HFR-220194",
        "doctorName": "Dr. Pradeep Jadhav, MD (Medicine)",
        "encounterType": "OPD Consultation",
        "diagnoses": [
          { "icdCode": "I10", "description": "Essential (Primary) Hypertension", "status": "Active / Managed" }
        ],
        "vitals": {
          "bloodPressure": "128/82 mmHg",
          "pulseBpm": 74,
          "spO2": "99%",
          "bmi": 23.8
        },
        "activeMedications": [
          { "drugName": "Telmisartan 40mg", "dosage": "Once daily (Morning)", "daysPrescribed": 90 }
        ],
        "healthScheme": {
          "isMJPJAYBeneficiary": true,
          "rationCardCategory": "BPL (Yellow Card / PHH)"
        }
      }
    }
  },
  {
    id: "schema-pds-ration",
    name: "MahaPDS Ration & Food Security Schema",
    schemaCode: "MahaFoodPDS.RationFamily_NFSA.v1",
    version: "v1.3.0",
    domain: "Food & Civil Supplies",
    classification: "Restricted / Social Welfare",
    leadDepartment: "Food, Civil Supplies and Consumer Protection Dept",
    description: "National Food Security Act (NFSA) household entitlement record, biometric seeding status, FPS shop mapping, and monthly grain quota balance.",
    fieldsCount: 10,
    fields: [
      { name: "rationCardNumber", type: "string (12-digit)", required: true, desc: "Unique RC Number under MahaPDS" },
      { name: "cardType", type: "enum (PHH | AAY | NPHH | White)", required: true, desc: "NFSA category classification" },
      { name: "headOfFamily", type: "string", required: true, desc: "Name of the eldest female head of household" },
      { name: "fairPriceShopNumber", type: "string", required: true, desc: "Assigned FPS dealer ID in village/ward" },
      { name: "totalFamilyMembers", type: "number", required: true, desc: "Number of eligible Aadhaar-seeded beneficiaries" },
      { name: "monthlyGrainQuotaKg", type: "object", required: true, desc: "Wheat, Rice, Coarse grains allocation in kg" },
      { name: "onorcEligible", type: "boolean", required: true, desc: "One Nation One Ration Card nationwide portability flag" }
    ],
    samplePayload: {
      "schemaVersion": "1.3.0",
      "rationCardNumber": "270481005521",
      "cardCategory": "PHH (Priority Household - Yellow / Saffron)",
      "fpsShopId": "FPS-NSK-NIP-104",
      "fpsDealerName": "Pimpalgaon Sahakari Grahak Bhandar",
      "familyHead": "Sunita Ramesh Patil (सुनिता रमेश पाटील)",
      "totalMembers": 4,
      "aadhaarSeedingRatio": "4/4 (100% Biometric Seeded)",
      "monthlyEntitlements": {
        "wheatKg": 12,
        "riceKg": 8,
        "coarseGrainsKg": 0,
        "pricePerKgInr": 0,
        "subsidyScheme": "PM Garib Kalyan Anna Yojana (PMGKAY - Free Distribution)"
      },
      "lastDisbursement": {
        "transactionDate": "2026-08-04T10:15:30+05:30",
        "biometricAuthType": "IRIS_AND_FINGERPRINT",
        "collectedBy": "Ramesh S. Patil"
      },
      "onorcPortabilityActive": true
    }
  },
  {
    id: "schema-police-cctns",
    name: "Maharashtra Police CCTNS Verification & E-Challan",
    schemaCode: "MahaPolice.CCTNS_Verification.v2",
    version: "v2.1.0",
    domain: "Home & Law Enforcement",
    classification: "Confidential / Law Enforcement",
    leadDepartment: "Maharashtra Police & CID",
    description: "Background character verification status, pending traffic e-challans, and FIR clearance record for employment, passport, and licensing.",
    fieldsCount: 9,
    fields: [
      { name: "citizenVidHash", type: "string (SHA256)", required: true, desc: "Tokenized Aadhaar VID" },
      { name: "policeStationJurisdiction", type: "string", required: true, desc: "Local police station name & PIN" },
      { name: "criminalRecordHistory", type: "boolean", required: true, desc: "Adverse FIR or pending cognizable offence" },
      { name: "trafficChallanPendingCount", type: "number", required: true, desc: "Number of unpaid e-challans" },
      { name: "trafficChallanTotalDuesInr", type: "number", required: true, desc: "Outstanding penalty sum in INR" },
      { name: "verificationStatus", type: "enum (CLEARED | ADVERSE | UNDER_INQUIRY)", required: true, desc: "Final verification output" }
    ],
    samplePayload: {
      "schemaVersion": "2.1.0",
      "verificationToken": "CCTNS-MH-NOC-2026-981240",
      "inquiryTimestamp": "2026-08-28T09:45:00+05:30",
      "policeStation": "Pimpalgaon Baswant Police Station, Nashik Rural",
      "stationCode": "PS-MH-NSKR-012",
      "verificationSummary": {
        "hasAdverseRecord": false,
        "firCount": 0,
        "preventiveAction": "NONE",
        "status": "CLEAR / NO ADVERSE RECORD FOUND",
        "validUntil": "2027-02-28"
      },
      "eChallanStatus": {
        "pendingCount": 0,
        "totalDuesInr": 0,
        "lastPaidChallan": {
          "challanNo": "MH1520251104991",
          "amountInr": 500,
          "violation": "Over-speeding on Samruddhi Mahamarg",
          "paidDate": "2025-11-06",
          "status": "PAID"
        }
      }
    }
  }
];

export const INITIAL_INTEGRATIONS_QUEUE = [
  {
    id: "REQ-2026-084",
    requestingDept: "Agriculture & Farmers Welfare (MahaDBT Shetkari)",
    sourceDept: "Revenue & Forest Department (MahaBhulekh)",
    schemaNeeded: "MahaBhulekh.LandRecord712.v3",
    purpose: "Real-time automated verification of farmer land parcel area and crop survey for instant Namo Shetkari DBT disbursement.",
    dataClassification: "Confidential / Citizen PII",
    slaPriority: "Mission Critical",
    submittedBy: "Shri V. C. Rastogi (Secretary, Agriculture)",
    submittedAt: "28 Aug 2026, 08:30 AM",
    status: "Approved",
    gatewayRoute: "/api/v2/exchange/agri-bhulekh-dbt",
    approvalStage: "TLS Keys Exchanged - Ready for Live Deployment"
  },
  {
    id: "REQ-2026-085",
    requestingDept: "Maharashtra State Police & CID (Traffic Branch)",
    sourceDept: "Motor Vehicles & Transport Dept (RTO / Vahan)",
    schemaNeeded: "MahaVahan.VehicleRC_Fitness.v2",
    purpose: "Real-time automated vehicle registration and blacklisted stolen vehicle detection on CCTV ANPR cameras along Mumbai-Pune Expressway & Samruddhi Highway.",
    dataClassification: "Restricted / Asset Registry",
    slaPriority: "Mission Critical",
    submittedBy: "DCP Traffic Control Room, Mumbai",
    submittedAt: "27 Aug 2026, 04:15 PM",
    status: "Approved",
    gatewayRoute: "/api/v2/exchange/police-vahan-anpr",
    approvalStage: "Live & Routing"
  },
  {
    id: "REQ-2026-086",
    requestingDept: "Higher & Technical Education Department",
    sourceDept: "Food, Civil Supplies & Consumer Protection (MahaFood)",
    schemaNeeded: "MahaFoodPDS.RationFamily_NFSA.v1",
    purpose: "Verification of BPL / EWS economic status for Post-Matric Tuition Fee Exemption scholarships for undergraduate engineering and medical students.",
    dataClassification: "Restricted / Social Welfare",
    slaPriority: "Urgent",
    submittedBy: "Joint Director, Technical Education, Pune",
    submittedAt: "28 Aug 2026, 09:10 AM",
    status: "Pending Review",
    gatewayRoute: "/api/v2/exchange/edu-pds-scholarship",
    approvalStage: "Awaiting Data Custodian (MahaFood) Consent Authorization"
  },
  {
    id: "REQ-2026-087",
    requestingDept: "Brihanmumbai Municipal Corp (Property Tax Dept)",
    sourceDept: "Revenue & Forest Department (MahaBhulekh)",
    schemaNeeded: "MahaBhulekh.LandRecord712.v3",
    purpose: "Cross-matching suburban Mumbai CTS land survey numbers with municipal property GIS tax grid to prevent property tax undervaluation.",
    dataClassification: "Confidential / Citizen PII",
    slaPriority: "Normal",
    submittedBy: "Assessor & Collector, BMC Head Office",
    submittedAt: "26 Aug 2026, 02:40 PM",
    status: "Pending Review",
    gatewayRoute: "/api/v2/exchange/bmc-bhulekh-cts",
    approvalStage: "Security Compliance Review with MahaIT / CERT-In"
  }
];

export const RECENT_API_LOGS = [
  {
    id: "LOG-99210",
    timestamp: "10:04:12",
    sourceDept: "Agriculture Dept",
    targetDept: "Revenue (MahaBhulekh)",
    endpoint: "/api/v2/mh-bhulekh/fetch-712?gat=142&vil=550124",
    method: "POST",
    statusCode: 200,
    latencyMs: 38,
    payloadSize: "4.2 KB",
    consentToken: "DPDP-MH-2026-AGR-8812",
    status: "SUCCESS"
  },
  {
    id: "LOG-99209",
    timestamp: "10:03:55",
    sourceDept: "State Police (CCTNS)",
    targetDept: "Transport (Vahan 4.0)",
    endpoint: "/api/v2/mh-vahan/lookup-rc?plate=MH15DC4421",
    method: "GET",
    statusCode: 200,
    latencyMs: 44,
    payloadSize: "2.8 KB",
    consentToken: "EXEMPT-LEGAL-INVESTIGATION-2026",
    status: "SUCCESS"
  },
  {
    id: "LOG-99208",
    timestamp: "10:03:10",
    sourceDept: "BMC Municipal",
    targetDept: "Revenue (MahaBhulekh)",
    endpoint: "/api/v2/mh-bhulekh/property-card?cts=8142",
    method: "POST",
    statusCode: 200,
    latencyMs: 65,
    payloadSize: "5.1 KB",
    consentToken: "DPDP-MH-2026-BMC-4412",
    status: "SUCCESS"
  },
  {
    id: "LOG-99207",
    timestamp: "10:02:41",
    sourceDept: "Public Health (ABDM)",
    targetDept: "Food & Civil Supplies (PDS)",
    endpoint: "/api/v2/mh-pds/verify-bpl-quota?rc=270481005521",
    method: "GET",
    statusCode: 200,
    latencyMs: 40,
    payloadSize: "1.9 KB",
    consentToken: "DPDP-MH-2026-HLT-9912",
    status: "SUCCESS"
  },
  {
    id: "LOG-99206",
    timestamp: "10:01:18",
    sourceDept: "Higher Education",
    targetDept: "Revenue (MahaBhulekh)",
    endpoint: "/api/v2/mh-bhulekh/fetch-712?gat=994&vil=550180",
    method: "POST",
    statusCode: 429,
    latencyMs: 12,
    payloadSize: "0.4 KB",
    consentToken: "DPDP-MH-2026-EDU-0012",
    status: "RATE_LIMITED"
  },
  {
    id: "LOG-99205",
    timestamp: "09:59:44",
    sourceDept: "Agriculture Dept",
    targetDept: "Public Health (ABDM)",
    endpoint: "/api/v1/health/check-disability?vid=889124001",
    method: "GET",
    statusCode: 200,
    latencyMs: 51,
    payloadSize: "3.1 KB",
    consentToken: "DPDP-MH-2026-AGR-8812",
    status: "SUCCESS"
  }
];

export const CITIZEN_PROFILE = {
  name: "Ramesh Santosh Patil",
  marathiName: "रमेश संतोष पाटील",
  mahaId: "MH-2024-PATIL-8921",
  aadhaarVidMasked: "•••• •••• 8921",
  digiLockerStatus: "Linked & Verified (Level 3)",
  phoneMasked: "+91 98230 •••••",
  emailMasked: "ramesh.patil.nsk@*****.com",
  residentialAddress: "Gat No. 142/2, Pimpalgaon Baswant, Taluka Niphad, District Nashik, Maharashtra - 422209",
  kycCompliance: "DPDP Act (2023) Verified",
  privacyScore: 88
};

export const CITIZEN_CONSENTS = [
  {
    id: "CONS-01",
    department: "Agriculture & Farmers Welfare (MahaDBT)",
    deptCategory: "Agriculture",
    purpose: "Validation of 7/12 land records & crop survey for automated credit of Namo Shetkari Mahasanman Subsidy & PM-KISAN instalments.",
    legalMandate: "MahaDBT Framework Act (2018) & PM-KISAN Direct Benefit Transfer Rules",
    dataCategories: ["MahaBhulekh 7/12 Land Parcel", "Kharif Crop Survey", "Bank Account Linkage"],
    grantedDate: "12 May 2024",
    validUntil: "11 May 2027 (Auto-Renewable)",
    isGranted: true,
    isMandatory: false,
    sensitivity: "High",
    accessFrequency: "Monthly (Before DBT Run)",
    lastAccessed: "28 Aug 2026, 09:42 AM"
  },
  {
    id: "CONS-02",
    department: "Motor Vehicles & Transport Dept (RTO / Vahan)",
    deptCategory: "Transport",
    purpose: "Verification of residential address & identity for automated Smart Card Driving License renewal and High Security Number Plate dispatch.",
    legalMandate: "Central Motor Vehicles Act (1988) Section 9",
    dataCategories: ["Aadhaar Virtual ID", "Permanent Address", "Mobile Number"],
    grantedDate: "18 May 2024",
    validUntil: "17 May 2029",
    isGranted: true,
    isMandatory: false,
    sensitivity: "Medium",
    accessFrequency: "On Citizen Request",
    lastAccessed: "18 May 2024, 02:15 PM"
  },
  {
    id: "CONS-03",
    department: "Public Health & Family Welfare (Arogya Vibhag / MJPJAY)",
    deptCategory: "Healthcare",
    purpose: "Linkage of ABDM electronic health record with Mahatma Jyotirao Phule Jan Arogya Yojana for cashless hospital admissions across empaneled hospitals in Maharashtra.",
    legalMandate: "National Health Authority ABDM Governance Charter",
    dataCategories: ["ABHA Health ID (91-4421-9981-2210)", "Clinical Encounter Summary", "Ration Card BPL Status"],
    grantedDate: "05 Jan 2025",
    validUntil: "04 Jan 2028",
    isGranted: true,
    isMandatory: false,
    sensitivity: "High (Special PII)",
    accessFrequency: "During Hospital Admission Only",
    lastAccessed: "14 Jul 2026, 11:32 AM"
  },
  {
    id: "CONS-04",
    department: "Brihanmumbai Municipal Corp & Urban Local Bodies",
    deptCategory: "Urban Governance",
    purpose: "Cross-verification of rural property records for agricultural tax exemption certificate during commercial property acquisition in MMR region.",
    legalMandate: "Maharashtra Municipal Corporations Act (1949)",
    dataCategories: ["Land Holding Area", "Khata Number"],
    grantedDate: "10 Feb 2025",
    validUntil: "09 Feb 2026",
    isGranted: false,
    isMandatory: false,
    sensitivity: "Medium",
    accessFrequency: "On Application",
    lastAccessed: "Revoked by Citizen (10 Jun 2026)"
  },
  {
    id: "CONS-05",
    department: "Food, Civil Supplies & Consumer Protection (MahaFood)",
    deptCategory: "Civil Supplies",
    purpose: "One Nation One Ration Card (ONORC) biometric authentication for subsidized monthly grain entitlement at Fair Price Shops.",
    legalMandate: "National Food Security Act (NFSA 2013)",
    dataCategories: ["Aadhaar Biometric Token", "Family Composition", "FPS Allocation"],
    grantedDate: "01 Jan 2024",
    validUntil: "Perpetual (Statutory Scheme)",
    isGranted: true,
    isMandatory: true,
    sensitivity: "High",
    accessFrequency: "Monthly (At Fair Price Shop)",
    lastAccessed: "04 Aug 2026, 10:15 AM"
  },
  {
    id: "CONS-06",
    department: "Higher & Technical Education (MahaDBT)",
    deptCategory: "Education & Scholarships",
    purpose: "Verification of parental land holding and annual agricultural income for ward's Post-Matric Government College Scholarship application.",
    legalMandate: "Government of Maharashtra Scholarship Policy 2021",
    dataCategories: ["7/12 Land Parcel Area", "Agricultural Income Assessment"],
    grantedDate: "20 Jul 2025",
    validUntil: "19 Jul 2026",
    isGranted: false,
    isMandatory: false,
    sensitivity: "Medium",
    accessFrequency: "Annual (Scholarship Season)",
    lastAccessed: "Revoked by Citizen (01 Aug 2026)"
  }
];

export const CITIZEN_ACCESS_LOGS = [
  {
    id: "AUD-2026-991",
    timestamp: "28 Aug 2026, 09:42 AM",
    department: "Agriculture & Farmers Welfare (MahaDBT)",
    purpose: "Farmer Drought Compensation & Kharif 2026 Crop Area Verification",
    fieldsAccessed: ["Gat No. 142/2", "Cultivable Area: 1.84 Ha", "Crop: Onion & Soybean", "Bank Account Hash"],
    authorizationToken: "AUTH-TKN-AGR-MH-9921",
    status: "Allowed (Consent Active)",
    ipNode: "10.142.20.42 (MahaDBT Shetkari Gateway)"
  },
  {
    id: "AUD-2026-990",
    timestamp: "04 Aug 2026, 10:15 AM",
    department: "Food & Civil Supplies (MahaFood PDS)",
    purpose: "Monthly NFSA Grain Quota Biometric Authentication at Fair Price Shop #104",
    fieldsAccessed: ["Ration Card: 270481005521", "Biometric Hash", "Family Members Count: 4"],
    authorizationToken: "AUTH-TKN-PDS-MH-8814",
    status: "Allowed (Consent Active)",
    ipNode: "10.142.20.36 (MahaPDS PoS Node)"
  },
  {
    id: "AUD-2026-989",
    timestamp: "14 Jul 2026, 11:32 AM",
    department: "Public Health (Arogya Vibhag / ABDM)",
    purpose: "OPD Consultation & Hypertension Clinical Record Sync at District Hospital Nashik",
    fieldsAccessed: ["ABHA ID: 91-4421-9981-2210", "Vitals Record", "e-Prescription: Telmisartan 40mg"],
    authorizationToken: "AUTH-TKN-HLT-MH-7719",
    status: "Allowed (Consent Active)",
    ipNode: "10.142.20.18 (ABDM Gateway)"
  },
  {
    id: "AUD-2026-988",
    timestamp: "01 Aug 2026, 03:20 PM",
    department: "Higher & Technical Education (MahaDBT)",
    purpose: "Scholarship Income Verification Query",
    fieldsAccessed: ["7/12 Land Parcel Area", "Agricultural Income Assessment"],
    authorizationToken: "AUTH-TKN-EDU-MH-4412",
    status: "Blocked (Consent Revoked by Citizen)",
    ipNode: "10.142.20.50 (Education Node)"
  },
  {
    id: "AUD-2026-987",
    timestamp: "10 Jun 2026, 04:45 PM",
    department: "Brihanmumbai Municipal Corp (BMC)",
    purpose: "Property Tax Assessment Query",
    fieldsAccessed: ["Land Holding Area", "Khata Number"],
    authorizationToken: "AUTH-TKN-BMC-MH-3310",
    status: "Blocked (Consent Revoked by Citizen)",
    ipNode: "10.142.20.30 (BMC Gateway)"
  },
  {
    id: "AUD-2026-986",
    timestamp: "18 May 2024, 02:15 PM",
    department: "Motor Vehicles & Transport Dept (RTO / Vahan)",
    purpose: "Vehicle Registration & Smart Card Dispatch for MH-15-DC-4421",
    fieldsAccessed: ["Aadhaar Virtual ID", "Permanent Address", "Mobile Number"],
    authorizationToken: "AUTH-TKN-TRN-MH-1120",
    status: "Allowed (Consent Active)",
    ipNode: "10.142.20.14 (Vahan Gateway)"
  }
];
