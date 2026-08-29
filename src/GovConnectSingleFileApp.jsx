import React, { useState } from 'react';
import { 
  Building2, 
  Layers, 
  UserCheck, 
  ShieldCheck, 
  Globe2, 
  Activity, 
  Bell, 
  Search, 
  ChevronRight, 
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Lock,
  Cpu,
  User,
  CheckCircle2,
  XCircle,
  AlertCircle, 
  AlertTriangle,
  PlusCircle,
  FileText,
  Filter,
  RefreshCw,
  Zap,
  Database,
  Send,
  X,
  Terminal,
  Copy,
  Info,
  Server,
  Play,
  FileCode2,
  FileCheck,
  Download,
  Phone,
  MapPin,
  ArrowUpRight,
  ArrowRight,
  Clock,
  Award,
  Check,
  RotateCcw,
  KeyRound,
  FileCheck2,
  Link2,
  Fingerprint
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';

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
    fieldsCount: 12,
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
        "totalArea": { "cultivableHectares": 1.84, "potKharabaHectares": 0.06, "unit": "Hectares" },
        "landHolders": [{ "holderName": "Ramesh Santosh Patil (रमेश संतोष पाटील)", "relationType": "Self", "shareRatio": "1.00", "isPrimary": true }]
      }
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
    fieldsCount: 11,
    fields: [
      { name: "registrationNumber", type: "string", required: true, desc: "High Security Registration Plate identifier" },
      { name: "vehicleClass", type: "string", required: true, desc: "LMV / HGV / Two-Wheeler / Commercial" }
    ],
    samplePayload: {
      "regNumber": "MH-15-DC-4421",
      "makerModel": "Tata Nexon EV Max (XZ+ Lux)",
      "fitnessValidUntil": "2039-05-17"
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
  }
];

export const CITIZEN_PROFILE = {
  name: "Ramesh Santosh Patil",
  marathiName: "रमेश संतोष पाटील",
  mahaId: "MH-2024-PATIL-8921",
  aadhaarVidMasked: "•••• •••• 8921",
  digiLockerStatus: "Linked & Verified (Level 3)",
  phoneMasked: "+91 98230 •••••",
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
    dataCategories: ["MahaBhulekh 7/12 Land Parcel", "Kharif Crop Survey", "Bank Account Linkage"],
    isGranted: true,
    isMandatory: false,
    lastAccessed: "28 Aug 2026, 09:42 AM"
  },
  {
    id: "CONS-02",
    department: "Motor Vehicles & Transport Dept (RTO / Vahan)",
    deptCategory: "Transport",
    purpose: "Verification of residential address & identity for automated Smart Card Driving License renewal and High Security Number Plate dispatch.",
    dataCategories: ["Aadhaar Virtual ID", "Permanent Address", "Mobile Number"],
    isGranted: true,
    isMandatory: false,
    lastAccessed: "18 May 2024, 02:15 PM"
  }
];

export const CITIZEN_ACCESS_LOGS = [
  {
    id: "AUD-2026-991",
    timestamp: "28 Aug 2026, 09:42 AM",
    department: "Agriculture & Farmers Welfare (MahaDBT)",
    purpose: "Farmer Drought Compensation & Kharif 2026 Crop Area Verification",
    fieldsAccessed: ["Gat No. 142/2", "Cultivable Area: 1.84 Ha", "Crop: Onion & Soybean"],
    authorizationToken: "AUTH-TKN-AGR-MH-9921",
    status: "Allowed (Consent Active)"
  }
];

export default function GovConnectPortal() {
  const [activeView, setActiveView] = useState('admin');
  const [language, setLanguage] = useState('EN');
  const [departments, setDepartments] = useState(DEPARTMENTS);
  const [integrationsQueue, setIntegrationsQueue] = useState(INITIAL_INTEGRATIONS_QUEUE);
  const [consents, setConsents] = useState(CITIZEN_CONSENTS);
  const [accessLogs, setAccessLogs] = useState(CITIZEN_ACCESS_LOGS);
  const [toasts, setToasts] = useState([]);

  const addToast = ({ type = 'info', title, message, subtext }) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, type, title, message, subtext }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleAddIntegration = (newIntegration) => {
    setIntegrationsQueue(prev => [newIntegration, ...prev]);
  };

  const handleApproveIntegration = (requestId) => {
    setIntegrationsQueue(prev => prev.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          status: 'Approved',
          approvalStage: `Approved & Live — Gateway Route Active (${req.gatewayRoute})`
        };
      }
      return req;
    }));
  };

  const handleRejectIntegration = (requestId, reason = 'Returned for revision') => {
    setIntegrationsQueue(prev => prev.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          status: 'Rejected',
          approvalStage: `Returned for Revision: ${reason}`
        };
      }
      return req;
    }));
  };

  const handleTriggerSync = (deptId) => {
    setDepartments(prev => prev.map(d => {
      if (d.id === deptId) {
        return {
          ...d,
          lastSync: 'Just now',
          latency: Math.max(28, Math.floor(d.latency + (Math.random() * 6 - 3)))
        };
      }
      return d;
    }));
  };

  const handleAddConsent = (newConsent) => {
    setConsents(prev => [newConsent, ...prev]);
    const newLogEntry = {
      id: `AUD-2026-${Math.floor(100 + Math.random() * 900)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
      department: newConsent.department,
      purpose: `Citizen Linked Document & Granted Consent: ${newConsent.purpose.slice(0, 45)}...`,
      fieldsAccessed: newConsent.dataCategories,
      authorizationToken: `AUTH-TKN-MH-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Allowed (Consent Active)'
    };
    setAccessLogs(prev => [newLogEntry, ...prev]);
  };

  const handleToggleConsent = (consentId) => {
    let toggledItem = null;

    setConsents(prev => prev.map(c => {
      if (c.id === consentId) {
        toggledItem = {
          ...c,
          isGranted: !c.isGranted,
          lastAccessed: !c.isGranted ? 'Just now (Consent Granted)' : 'Revoked by Citizen (Just now)'
        };
        return toggledItem;
      }
      return c;
    }));

    if (toggledItem) {
      const newLogEntry = {
        id: `AUD-2026-${Math.floor(100 + Math.random() * 900)}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
        department: toggledItem.department,
        purpose: toggledItem.isGranted 
          ? `Consent Granted for ${toggledItem.purpose.slice(0, 40)}...` 
          : `Consent REVOKED by Citizen for ${toggledItem.department}`,
        fieldsAccessed: toggledItem.dataCategories,
        authorizationToken: `AUTH-TKN-MH-${Math.floor(1000 + Math.random() * 9000)}`,
        status: toggledItem.isGranted ? 'Allowed (Consent Active)' : 'Blocked (Consent Revoked by Citizen)'
      };

      setAccessLogs(prev => [newLogEntry, ...prev]);

      addToast({
        type: toggledItem.isGranted ? 'success' : 'warning',
        title: toggledItem.isGranted ? 'Consent Granted' : 'Consent Revoked',
        message: `${toggledItem.department}: Data sharing ${toggledItem.isGranted ? 'ENABLED' : 'BLOCKED'}.`,
        subtext: 'DPDP Audit Ledger updated.'
      });
    }
  };

  const pendingCount = integrationsQueue.filter(i => i.status === 'Pending Review').length;

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F7FA] text-slate-800 font-sans">
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="bg-[#0B2545] text-slate-200 text-xs px-4 sm:px-8 py-1.5 flex flex-wrap items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="flex items-center space-x-0.5 h-3">
              <span className="w-1.5 h-full bg-[#FF671F] rounded-l-sm"></span>
              <span className="w-1.5 h-full bg-white"></span>
              <span className="w-1.5 h-full bg-[#046A38] rounded-r-sm"></span>
            </div>
            <span className="font-semibold text-slate-100">
              Government of Maharashtra | Digital Governance Initiative
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <div className="flex items-center gap-1.5 bg-emerald-950 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="font-semibold">Gateway: Operational (99.98% SLA)</span>
            </div>
            <button 
              onClick={() => setLanguage(language === 'EN' ? 'MR' : 'EN')}
              className="text-amber-300 font-bold px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700"
            >
              {language === 'EN' ? 'मराठी' : 'English'}
            </button>
          </div>
        </div>

        <div className="px-4 sm:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B2545] to-[#1D4ED8] flex flex-col items-center justify-center text-white font-bold leading-none shadow-md">
              <span className="text-[9px] text-amber-300">SETU</span>
              <Layers className="w-5 h-5 my-0.5" />
              <span className="text-[8px] text-emerald-300">GOV</span>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-[#0B2545]">
                Gov<span className="text-[#1D4ED8]">Connect</span>
                <span className="text-slate-400 font-normal text-lg ml-2 hidden sm:inline">|</span>
                <span className="text-sm sm:text-base font-semibold text-slate-700 ml-2">
                  Interoperability Platform
                </span>
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Unified Inter-Departmental Data Exchange & DPDP Act (2023) Consent Gateway
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveView('admin')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition ${
                activeView === 'admin' ? 'bg-[#0B2545] text-white shadow' : 'text-slate-600 hover:bg-white/60'
              }`}
            >
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>Admin Dashboard</span>
              {pendingCount > 0 && <span className="bg-[#FF671F] text-white text-[10px] px-1.5 rounded-full">{pendingCount}</span>}
            </button>

            <button
              onClick={() => setActiveView('gateway')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition ${
                activeView === 'gateway' ? 'bg-[#0B2545] text-white shadow' : 'text-slate-600 hover:bg-white/60'
              }`}
            >
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Data Exchange</span>
            </button>

            <button
              onClick={() => setActiveView('citizen')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition ${
                activeView === 'citizen' ? 'bg-[#046A38] text-white shadow' : 'text-slate-600 hover:bg-white/60'
              }`}
            >
              <UserCheck className="w-4 h-4 text-amber-300" />
              <span>Citizen Portal</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6">
        {activeView === 'admin' && (
          <AdminDashboardView 
            departments={departments} 
            apiMetrics={API_METRICS_7DAYS} 
            integrationsQueue={integrationsQueue}
            onAddIntegration={handleAddIntegration}
            onApproveIntegration={handleApproveIntegration}
            onRejectIntegration={handleRejectIntegration}
            onTriggerSync={handleTriggerSync}
            addToast={addToast}
          />
        )}

        {activeView === 'gateway' && (
          <DataExchangeGatewayView 
            schemas={STANDARDIZED_SCHEMAS} 
            departments={departments} 
            addToast={addToast} 
          />
        )}

        {activeView === 'citizen' && (
          <CitizenConsentPortalView 
            profile={CITIZEN_PROFILE} 
            consents={consents} 
            onToggleConsent={handleToggleConsent} 
            onAddConsent={handleAddConsent}
            accessLogs={accessLogs} 
            addToast={addToast} 
          />
        )}
      </main>

      <footer className="bg-[#0B2545] text-slate-300 text-xs border-t border-slate-700 mt-16 p-6 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-emerald-400 font-semibold">
            <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> DPDP Act 2023 Compliant</span>
            <span className="flex items-center gap-1"><Lock className="w-4 h-4" /> mTLS 1.3 Encrypted</span>
          </div>
          <div>© 2026 Government of Maharashtra | National Informatics Centre (NIC) & MahaIT</div>
        </div>
      </footer>

      <ToastAlerts toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

function AdminDashboardView({ departments, apiMetrics, integrationsQueue, onAddIntegration, onApproveIntegration, onRejectIntegration, onTriggerSync, addToast }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <h2 className="text-xl font-bold text-[#0B2545] mb-4">Department Interoperability Admin Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-slate-50 rounded-xl border">Connected Departments: <strong>7 / 8</strong></div>
        <div className="p-4 bg-slate-50 rounded-xl border">24h API Volume: <strong>2.84M Calls</strong></div>
        <div className="p-4 bg-slate-50 rounded-xl border">Active Pipelines: <strong>{24 + integrationsQueue.filter(i=>i.status==='Approved').length}</strong></div>
      </div>
    </div>
  );
}

function DataExchangeGatewayView({ schemas, departments, addToast }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <h2 className="text-xl font-bold text-[#0B2545] mb-2">Data Exchange & Interoperability Gateway</h2>
      <p className="text-xs text-slate-500">Standardized State Data Schemas & Routing Bus.</p>
    </div>
  );
}

function CitizenConsentPortalView({ profile, consents, onToggleConsent, onAddConsent, accessLogs, addToast }) {
  const [isLinkOpen, setIsLinkOpen] = useState(false);
  const [docType, setDocType] = useState('LAND_712');
  const [surveyNo, setSurveyNo] = useState('142/2');
  const [verifiedPreview, setVerifiedPreview] = useState(null);

  const handleVerify = () => {
    setVerifiedPreview({
      title: 'MahaBhulekh 7/12 Record Verified',
      holder: profile.name,
      gat: surveyNo,
      area: '1.84 Ha',
      dept: 'Agriculture & Farmers Welfare (MahaDBT)'
    });
  };

  const handleConfirm = () => {
    onAddConsent({
      id: `CONS-${Math.floor(10 + Math.random() * 90)}`,
      department: verifiedPreview.dept,
      deptCategory: 'Agriculture & Land',
      purpose: 'Verification of 7/12 land records for DBT scheme disbursement.',
      dataCategories: ['7/12 Land Parcel Area', 'Kharif Crop Survey'],
      isGranted: true,
      isMandatory: false,
      lastAccessed: 'Just now (Linked)'
    });
    setIsLinkOpen(false);
    setVerifiedPreview(null);
    addToast({ type: 'success', title: 'Document Linked', message: 'Record linked & DPDP consent registered.' });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
        <div>
          <h2 className="text-xl font-black text-[#0B2545]">Citizen Digital Consent & Privacy Portal</h2>
          <p className="text-xs text-slate-500">DPDP Act (2023) Compliant consent governance and document linkage.</p>
        </div>
        <button onClick={() => setIsLinkOpen(true)} className="px-4 py-2 rounded-xl bg-[#0B2545] text-white text-xs font-bold">
          + Link Document
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-[#0B2545] mb-4 text-sm">Active Departmental Consents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {consents.map(c => (
            <div key={c.id} className="p-4 rounded-xl border bg-slate-50/50 flex justify-between items-start">
              <div>
                <div className="font-bold text-slate-900">{c.department}</div>
                <div className="text-slate-600 mt-1">{c.purpose}</div>
                <div className="text-[10px] text-emerald-700 font-bold mt-2">{c.isGranted ? 'Consent Active' : 'Revoked'}</div>
              </div>
              <input type="checkbox" checked={c.isGranted} onChange={() => onToggleConsent(c.id)} className="h-5 w-5" />
            </div>
          ))}
        </div>
      </div>

      {isLinkOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm text-xs">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-[#0B2545]">Link Government Document</h3>
              <button onClick={() => setIsLinkOpen(false)}><X className="w-4 h-4" /></button>
            </div>
            <div>
              <label className="block font-bold mb-1">Select Document Type</label>
              <select value={docType} onChange={e => setDocType(e.target.value)} className="w-full p-2 border rounded-xl bg-slate-50">
                <option value="LAND_712">MahaBhulekh 7/12 Land Record</option>
                <option value="VEHICLE_RC">Vahan 4.0 Vehicle RC</option>
                <option value="ABHA_HEALTH">Ayushman Bharat ABHA Health ID</option>
              </select>
            </div>
            <div>
              <label className="block font-bold mb-1">Gat / Survey Number</label>
              <input type="text" value={surveyNo} onChange={e => setSurveyNo(e.target.value)} className="w-full p-2 border rounded-xl" />
            </div>
            {!verifiedPreview ? (
              <button onClick={handleVerify} className="w-full py-2 rounded-xl bg-[#0B2545] text-white font-bold">
                Fetch & Verify from State Repository
              </button>
            ) : (
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
                <div className="font-bold text-emerald-900">Record Verified: {verifiedPreview.title}</div>
                <div>Owner: <strong>{verifiedPreview.holder}</strong> • Gat: <strong>{verifiedPreview.gat}</strong> ({verifiedPreview.area})</div>
                <button onClick={handleConfirm} className="w-full py-2 rounded-xl bg-[#046A38] text-white font-bold">
                  Confirm Linkage & Grant DPDP Consent
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ToastAlerts({ toasts, removeToast }) {
  if (!toasts || toasts.length === 0) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none">
      {toasts.map(t => (
        <div key={t.id} className="pointer-events-auto p-4 rounded-xl shadow-xl bg-slate-900 text-white border border-slate-700 text-xs flex justify-between items-start">
          <div>
            <div className="font-bold text-amber-400">{t.title}</div>
            <div className="mt-0.5">{t.message}</div>
          </div>
          <button onClick={() => removeToast(t.id)} className="text-slate-400 hover:text-white"><X className="w-3.5 h-3.5" /></button>
        </div>
      ))}
    </div>
  );
}
