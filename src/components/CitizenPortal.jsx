import React, { useState } from 'react';
import { 
  UserCheck, 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  FileText, 
  Download, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  Search, 
  Filter, 
  HelpCircle, 
  ChevronRight, 
  ExternalLink, 
  X, 
  Eye, 
  Sparkles, 
  Printer, 
  Calendar,
  Layers,
  User,
  Phone,
  MapPin,
  FileCheck,
  PlusCircle,
  Link2,
  FileBadge,
  Check,
  RefreshCw,
  Fingerprint
} from 'lucide-react';

export default function CitizenPortal({ 
  profile, 
  consents, 
  onToggleConsent, 
  onAddConsent,
  accessLogs, 
  addToast, 
  language 
}) {
  const [filterDept, setFilterDept] = useState('ALL');
  const [searchLog, setSearchLog] = useState('');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isLinkDocModalOpen, setIsLinkDocModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Link Document Form State
  const [docType, setDocType] = useState('LAND_712');
  const [docInputs, setDocInputs] = useState({
    district: 'Nashik',
    taluka: 'Niphad',
    village: 'Pimpalgaon Baswant',
    surveyNo: '142/2',
    vehicleNo: 'MH-15-DC-4421',
    chassisNo: '44120',
    abhaId: '91-4421-9981-2210',
    rationCardNo: '270481005521',
    certBarcode: 'MH-REV-CERT-2026-99120',
    consentAgreed: true
  });
  const [isVerifyingDoc, setIsVerifyingDoc] = useState(false);
  const [verifiedDocPreview, setVerifiedDocPreview] = useState(null);

  // Login simulation state
  const [loginPhone, setLoginPhone] = useState('9823012345');
  const [loginOtp, setLoginOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const activeConsentsCount = consents.filter(c => c.isGranted).length;
  const revokedConsentsCount = consents.filter(c => !c.isGranted).length;

  const handleToggle = (consent) => {
    onToggleConsent(consent.id);
  };

  const handleDownloadReport = () => {
    addToast({
      type: 'success',
      title: 'Report Downloaded',
      message: 'Official DPDP Act (2023) Section 11 Data Disclosure Report (PDF) saved.',
      subtext: `Ref: DPDP-REP-PATIL-${Math.floor(1000 + Math.random() * 9000)}`
    });
    setIsReportModalOpen(false);
  };

  const handleExportJson = () => {
    const dataToExport = {
      citizen: profile,
      consents: consents,
      accessLogs: accessLogs,
      exportedAt: new Date().toISOString(),
      complianceCertificate: 'GovConnect SetuGov DPDP v2.4'
    };
    navigator.clipboard.writeText(JSON.stringify(dataToExport, null, 2));
    addToast({
      type: 'info',
      title: 'JSON Exported',
      message: 'Raw cryptographic audit trail copied to clipboard.'
    });
  };

  // Simulate Document Verification with State Databases
  const handleVerifyDocument = () => {
    setIsVerifyingDoc(true);
    setVerifiedDocPreview(null);

    setTimeout(() => {
      setIsVerifyingDoc(false);
      if (docType === 'LAND_712') {
        setVerifiedDocPreview({
          title: 'Village Form VII-XII Land Record Verified',
          source: 'Revenue & Forest Dept (MahaBhulekh)',
          details: {
            'Landholder': profile.name,
            'Location': `${docInputs.village}, ${docInputs.taluka}, ${docInputs.district}`,
            'Gat / Survey': docInputs.surveyNo,
            'Area': '1.84 Hectares (Cultivable)',
            'Tenure': 'Occupant Class 1 (भोगवटादार वर्ग १)',
            'Status': 'Digital Signature Valid (Talathi Office)'
          },
          consentDept: 'Agriculture & Farmers Welfare (MahaDBT)',
          purpose: 'Automated validation of 7/12 land records for Namo Shetkari Mahasanman & Crop Loss DBT.',
          dataCategories: ['7/12 Land Parcel Area', 'Kharif Crop Survey', 'Bank Account Linkage']
        });
      } else if (docType === 'VEHICLE_RC') {
        setVerifiedDocPreview({
          title: 'Vehicle Registration Certificate (RC) Verified',
          source: 'Transport Dept (Vahan 4.0)',
          details: {
            'Registration No': docInputs.vehicleNo,
            'Owner': profile.name,
            'Maker / Model': 'Tata Nexon EV Max (XZ+ Lux)',
            'Vehicle Class': 'LMV (Electric)',
            'Insurance Validity': '16 May 2027 (Active)',
            'Road Tax': 'Paid Lifetime'
          },
          consentDept: 'Motor Vehicles & Transport Dept (RTO / Vahan)',
          purpose: 'Identity verification for automated Smart Card Driving License and vehicle fitness sync.',
          dataCategories: ['Vehicle Registration Number', 'Permanent Address', 'Mobile Hash']
        });
      } else if (docType === 'ABHA_HEALTH') {
        setVerifiedDocPreview({
          title: 'Ayushman Bharat Health Account (ABHA) Verified',
          source: 'National Health Authority & Arogya Vibhag',
          details: {
            'ABHA ID': docInputs.abhaId,
            'ABHA Address': 'ramesh.patil@abdm',
            'Linked Hospital': 'District General Hospital, Nashik',
            'Health Scheme': 'MJPJAY / PM-JAY Empaneled',
            'Status': 'Active (KYC Level 3)'
          },
          consentDept: 'Public Health & Family Welfare (ABDM)',
          purpose: 'Linkage of electronic health records for cashless admission claims under MJPJAY.',
          dataCategories: ['ABHA Health ID', 'Clinical Encounter Summary', 'BPL Ration Status']
        });
      } else {
        setVerifiedDocPreview({
          title: 'MahaPDS Ration Card Record Verified',
          source: 'Food, Civil Supplies & Consumer Protection',
          details: {
            'Ration Card No': docInputs.rationCardNo,
            'Card Category': 'PHH (Priority Household - Saffron)',
            'Head of Family': 'Sunita Ramesh Patil',
            'Total Members': '4 Members (100% Aadhaar Seeded)',
            'Assigned FPS': 'FPS #104, Pimpalgaon Baswant'
          },
          consentDept: 'Food, Civil Supplies & Consumer Protection (MahaFood)',
          purpose: 'One Nation One Ration Card (ONORC) monthly foodgrain entitlement validation.',
          dataCategories: ['Ration Card Number', 'Biometric Token', 'Family Hierarchy']
        });
      }
    }, 900);
  };

  // Submit and link document
  const handleConfirmLinkDocument = () => {
    if (!verifiedDocPreview) return;

    const newConsent = {
      id: `CONS-${Math.floor(10 + Math.random() * 90)}`,
      department: verifiedDocPreview.consentDept,
      deptCategory: docType === 'LAND_712' ? 'Agriculture & Land' : docType === 'VEHICLE_RC' ? 'Transport' : docType === 'ABHA_HEALTH' ? 'Healthcare' : 'Civil Supplies',
      purpose: verifiedDocPreview.purpose,
      legalMandate: 'DPDP Act (2023) Section 6 & State Digital Governance Rules',
      dataCategories: verifiedDocPreview.dataCategories,
      grantedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      validUntil: '3 Years (Auto-Renewable)',
      isGranted: true,
      isMandatory: false,
      sensitivity: 'High',
      accessFrequency: 'On Scheme Application',
      lastAccessed: 'Just now (Linked by Citizen)'
    };

    if (onAddConsent) {
      onAddConsent(newConsent);
    }

    setIsLinkDocModalOpen(false);
    setVerifiedDocPreview(null);

    addToast({
      type: 'success',
      title: 'Document Linked & Consent Registered',
      message: `${verifiedDocPreview.title} successfully linked to MahaID ${profile.mahaId}.`,
      subtext: 'DPDP Act (2023) Consent Ledger Updated'
    });
  };

  // Login simulation handler
  const handleSendOtp = (e) => {
    e.preventDefault();
    if (loginPhone.length < 10) {
      addToast({ type: 'error', title: 'Invalid Mobile', message: 'Please enter a valid 10-digit mobile number.' });
      return;
    }
    setOtpSent(true);
    addToast({ type: 'info', title: 'OTP Dispatched', message: 'Enter OTP 8841 sent to your Aadhaar-linked mobile.' });
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (loginOtp !== '8841' && loginOtp.length !== 4) {
      addToast({ type: 'error', title: 'Invalid OTP', message: 'Please enter valid 4-digit OTP (demo: 8841).' });
      return;
    }
    setIsLoginModalOpen(false);
    setOtpSent(false);
    setLoginOtp('');
    addToast({
      type: 'success',
      title: 'Authenticated with DigiLocker',
      message: `Welcome back, ${profile.name}! KYC Level 3 Verified.`
    });
  };

  // Filtered logs
  const filteredLogs = accessLogs.filter(log => {
    const matchesSearch = log.department.toLowerCase().includes(searchLog.toLowerCase()) ||
                          log.purpose.toLowerCase().includes(searchLog.toLowerCase()) ||
                          log.authorizationToken.toLowerCase().includes(searchLog.toLowerCase());
    const matchesDept = filterDept === 'ALL' || log.department.includes(filterDept);
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
            <UserCheck className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-xl font-black text-[#0B2545]">
              {language === 'MR' ? 'नागरिक संमती व डेटा सुरक्षा पोर्टल' : 'Citizen Digital Consent & Privacy Portal'}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              {language === 'MR' 
                ? 'डिजिटल वैयक्तिक डेटा संरक्षण कायदा (DPDP २०२३) अंतर्गत तुमच्या डेटावर तुमचे पूर्ण नियंत्रण' 
                : 'Empowering Maharashtra citizens with granular consent control & real-time data access transparency.'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsLinkDocModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0B2545] hover:bg-[#134074] text-white text-xs font-bold shadow-md shadow-blue-950/20 transition transform active:scale-95"
          >
            <PlusCircle className="w-4 h-4 text-amber-400" />
            <span>Link Document / Record</span>
          </button>

          <button
            onClick={() => setIsReportModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#046A38] hover:bg-[#03542C] text-white text-xs font-bold shadow-md shadow-emerald-950/20 transition transform active:scale-95"
          >
            <FileText className="w-4 h-4 text-amber-300" />
            <span>Request Data Report</span>
          </button>
        </div>
      </div>

      {/* Citizen Identity & Privacy Score Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          {/* Column 1: Citizen Profile Details */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0B2545] to-[#1D4ED8] flex items-center justify-center text-white font-black text-xl shadow-md">
                  RP
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-900">{profile.name}</h3>
                    <span className="text-xs text-slate-500 font-semibold font-mukta">({profile.marathiName})</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      DigiLocker Verified (Level 3)
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1 font-mono">
                    <span>MahaID: <strong className="text-slate-800">{profile.mahaId}</strong></span>
                    <span>•</span>
                    <span>Aadhaar VID: <strong className="text-slate-800">{profile.aadhaarVidMasked}</strong></span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="hidden sm:flex items-center gap-1 text-xs text-blue-700 font-bold hover:bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-200 transition"
              >
                <Fingerprint className="w-3.5 h-3.5" />
                <span>MeriPehchaan Auth</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate">{profile.residentialAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Mobile: {profile.phoneMasked}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Privacy Shield Score & Quick Stats */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Privacy Shield Index</div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-black text-emerald-700">{profile.privacyScore}</span>
                <span className="text-xs text-slate-400 font-bold">/ 100</span>
              </div>
              <div className="text-[11px] text-emerald-800 font-medium mt-0.5">
                Strong Consent Governance
              </div>
            </div>

            <div className="text-right space-y-1 text-xs">
              <div className="text-slate-600">
                Active Consents: <strong className="text-emerald-700">{activeConsentsCount}</strong>
              </div>
              <div className="text-slate-600">
                Revoked: <strong className="text-rose-700">{revokedConsentsCount}</strong>
              </div>
              <div className="text-[10px] text-slate-400 pt-1">
                DPDP Act 2023 Compliant
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Granular Department Consent Management Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-[#0B2545] flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-600" />
              Granular Departmental Data-Sharing Consents
            </h3>
            <p className="text-xs text-slate-500">
              Grant or revoke data sharing permissions per department in real time. Changes take effect across SetuGov Gateway instantly.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-slate-600">Legend:</span>
            <span className="flex items-center gap-1 text-emerald-700 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" /> Active
            </span>
            <span className="flex items-center gap-1 text-rose-700 font-bold">
              <XCircle className="w-3.5 h-3.5" /> Revoked
            </span>
          </div>
        </div>

        {/* Consent Cards Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {consents.map((consent) => {
            const isGranted = consent.isGranted;

            return (
              <div 
                key={consent.id}
                className={`p-5 rounded-2xl border transition-all duration-200 ${
                  isGranted 
                    ? 'bg-white border-slate-200 hover:border-emerald-300 hover:shadow-md' 
                    : 'bg-slate-50/80 border-slate-200 opacity-90'
                }`}
              >
                {/* Card Header with Toggle Switch */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{consent.department}</span>
                      {consent.isMandatory && (
                        <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded">
                          Statutory
                        </span>
                      )}
                    </div>
                    <span className="inline-block text-[11px] text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded">
                      {consent.deptCategory}
                    </span>
                  </div>

                  {/* Interactive Toggle Switch */}
                  <div className="flex items-center gap-2 shrink-0">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isGranted}
                        disabled={consent.isMandatory}
                        onChange={() => handleToggle(consent)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                  </div>
                </div>

                {/* Purpose of Data Access */}
                <div className="mt-3 text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div className="font-bold text-slate-700 mb-0.5">Authorised Purpose:</div>
                  {consent.purpose}
                </div>

                {/* Data Categories Shared */}
                <div className="mt-3 space-y-1">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Data Fields Permitted:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {consent.dataCategories.map((field) => (
                      <span 
                        key={field} 
                        className={`text-[11px] font-mono px-2 py-0.5 rounded-md border ${
                          isGranted 
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200 font-medium' 
                            : 'bg-slate-100 text-slate-400 border-slate-200 line-through'
                        }`}
                      >
                        {field}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Metadata */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Last accessed: <strong className="text-slate-700">{consent.lastAccessed}</strong></span>
                  </div>
                  <div className={`font-bold ${isGranted ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {isGranted ? 'Consent Active' : 'Access Blocked'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Data Access Audit Trail (Transparency Timeline) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-[#0B2545] flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-blue-600" />
              DPDP Real-Time Data Access Audit Trail
            </h3>
            <p className="text-xs text-slate-500">
              Immutable chronological record of every government department query involving your identity or records.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative min-w-[200px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search audit trail..."
                value={searchLog}
                onChange={(e) => setSearchLog(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
              />
            </div>

            {/* Department Filter */}
            <select
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              className="py-2 px-3 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50 text-slate-700 font-medium"
            >
              <option value="ALL">All Departments</option>
              <option value="Agriculture">Agriculture Dept</option>
              <option value="Transport">Transport (RTO)</option>
              <option value="Health">Public Health (ABDM)</option>
              <option value="Food">Food & Civil Supplies</option>
              <option value="Police">State Police</option>
            </select>
          </div>
        </div>

        {/* Audit Trail Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Requesting Department</th>
                <th className="py-3 px-4">Official Purpose</th>
                <th className="py-3 px-4">Data Fields Read</th>
                <th className="py-3 px-4">Auth Token</th>
                <th className="py-3 px-4">Gateway Decision</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((log) => {
                const isAllowed = log.status.startsWith('Allowed');

                return (
                  <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Timestamp */}
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                      {log.timestamp}
                    </td>

                    {/* Department */}
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {log.department}
                    </td>

                    {/* Purpose */}
                    <td className="py-3.5 px-4 text-slate-700">
                      {log.purpose}
                    </td>

                    {/* Fields Accessed */}
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {log.fieldsAccessed.map(f => (
                          <span key={f} className="text-[10px] font-mono bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded border border-slate-200">
                            {f}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Token */}
                    <td className="py-3.5 px-4 font-mono text-[10px] text-blue-700">
                      {log.authorizationToken}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        isAllowed 
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                          : 'bg-rose-100 text-rose-800 border border-rose-200'
                      }`}>
                        {isAllowed ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <XCircle className="w-3 h-3 text-rose-600" />}
                        {log.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: Link New Document / KYC Record */}
      {isLinkDocModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] text-xs">
            {/* Header */}
            <div className="bg-[#0B2545] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Link2 className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="text-sm font-bold">
                    Link Government Document & Authorize Data Exchange
                  </h3>
                  <p className="text-[11px] text-slate-300">
                    Fetch verified record from State Data Custodian and register your DPDP Act consent.
                  </p>
                </div>
              </div>
              <button onClick={() => { setIsLinkDocModalOpen(false); setVerifiedDocPreview(null); }} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 overflow-y-auto flex-1">
              {/* Document Type Selector */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Select Document / Scheme Type</label>
                <select
                  value={docType}
                  onChange={(e) => { setDocType(e.target.value); setVerifiedDocPreview(null); }}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-800 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="LAND_712">MahaBhulekh 7/12 Land Record (महसूल विभाग / 7-12 उतारा)</option>
                  <option value="VEHICLE_RC">Vahan 4.0 Vehicle RC & Fitness (परिवहन विभाग / आरटीओ वाहन)</option>
                  <option value="ABHA_HEALTH">Ayushman Bharat ABHA Health Account (आरोग्य विभाग / ABDM)</option>
                  <option value="PDS_RATION">MahaFood PDS Ration Card (अन्न व नागरी पुरवठा / रेशन कार्ड)</option>
                </select>
              </div>

              {/* Dynamic Inputs based on docType */}
              {docType === 'LAND_712' && (
                <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">District</label>
                    <input type="text" value={docInputs.district} onChange={(e) => setDocInputs({ ...docInputs, district: e.target.value })} className="w-full p-2 rounded-lg border text-slate-800 bg-white" />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Taluka</label>
                    <input type="text" value={docInputs.taluka} onChange={(e) => setDocInputs({ ...docInputs, taluka: e.target.value })} className="w-full p-2 rounded-lg border text-slate-800 bg-white" />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Village</label>
                    <input type="text" value={docInputs.village} onChange={(e) => setDocInputs({ ...docInputs, village: e.target.value })} className="w-full p-2 rounded-lg border text-slate-800 bg-white" />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Survey / Gat Number</label>
                    <input type="text" value={docInputs.surveyNo} onChange={(e) => setDocInputs({ ...docInputs, surveyNo: e.target.value })} className="w-full p-2 rounded-lg border text-slate-800 bg-white" />
                  </div>
                </div>
              )}

              {docType === 'VEHICLE_RC' && (
                <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Vehicle Registration Number</label>
                    <input type="text" value={docInputs.vehicleNo} onChange={(e) => setDocInputs({ ...docInputs, vehicleNo: e.target.value })} className="w-full p-2 rounded-lg border text-slate-800 bg-white font-mono" />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Chassis Number (Last 5 Digits)</label>
                    <input type="text" value={docInputs.chassisNo} onChange={(e) => setDocInputs({ ...docInputs, chassisNo: e.target.value })} className="w-full p-2 rounded-lg border text-slate-800 bg-white font-mono" />
                  </div>
                </div>
              )}

              {docType === 'ABHA_HEALTH' && (
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">14-Digit ABHA Health ID</label>
                    <input type="text" value={docInputs.abhaId} onChange={(e) => setDocInputs({ ...docInputs, abhaId: e.target.value })} className="w-full p-2 rounded-lg border text-slate-800 bg-white font-mono" />
                  </div>
                </div>
              )}

              {docType === 'PDS_RATION' && (
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">12-Digit MahaPDS Ration Card Number</label>
                    <input type="text" value={docInputs.rationCardNo} onChange={(e) => setDocInputs({ ...docInputs, rationCardNo: e.target.value })} className="w-full p-2 rounded-lg border text-slate-800 bg-white font-mono" />
                  </div>
                </div>
              )}

              {/* Verify Button */}
              {!verifiedDocPreview && (
                <div className="text-center pt-2">
                  <button
                    onClick={handleVerifyDocument}
                    disabled={isVerifyingDoc}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#0B2545] hover:bg-[#134074] text-white font-bold transition shadow-sm"
                  >
                    {isVerifyingDoc ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                        <span>Querying Authoritative State Repository via SetuGov...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Fetch & Verify from Department Database</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Verified Result Card */}
              {verifiedDocPreview && (
                <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-300 space-y-3 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      <span className="font-bold text-emerald-950">{verifiedDocPreview.title}</span>
                    </div>
                    <span className="text-[10px] bg-emerald-200 text-emerald-900 font-bold px-2 py-0.5 rounded-full">
                      Authentic Record
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-emerald-900">
                    {Object.entries(verifiedDocPreview.details).map(([key, val]) => (
                      <div key={key}>
                        <span className="text-emerald-700 font-semibold">{key}: </span>
                        <strong>{val}</strong>
                      </div>
                    ))}
                  </div>

                  {/* DPDP Consent Checkbox */}
                  <div className="bg-white p-3 rounded-xl border border-emerald-200 text-slate-700 space-y-1">
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={docInputs.consentAgreed}
                        onChange={(e) => setDocInputs({ ...docInputs, consentAgreed: e.target.checked })}
                        className="mt-0.5 text-emerald-600 rounded"
                      />
                      <span className="text-[11px] leading-snug">
                        I hereby grant purpose-limited digital consent under <strong>DPDP Act 2023</strong> to link this verified record with my MahaID profile for automated state welfare disbursements and digital service verification.
                      </span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
              <button
                onClick={() => { setIsLinkDocModalOpen(false); setVerifiedDocPreview(null); }}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-200 font-semibold"
              >
                Cancel
              </button>

              {verifiedDocPreview && (
                <button
                  onClick={handleConfirmLinkDocument}
                  disabled={!docInputs.consentAgreed}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#046A38] hover:bg-[#03542C] text-white font-bold shadow-md shadow-emerald-950/20 disabled:opacity-50 transition"
                >
                  <Check className="w-4 h-4 text-amber-300" />
                  <span>Confirm Linkage & Register Consent</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: MeriPehchaan / National SSO Authentication Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-xs">
            <div className="bg-[#0B2545] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Fingerprint className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="text-sm font-bold">MeriPehchaan / DigiLocker Single Sign-On</h3>
                  <p className="text-[10px] text-slate-300">National Single Sign-On (NSSO) Gateway</p>
                </div>
              </div>
              <button onClick={() => setIsLoginModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Aadhaar-Linked Mobile Number</label>
                    <div className="flex gap-2">
                      <span className="p-2 bg-slate-100 rounded-lg border font-bold text-slate-600">+91</span>
                      <input
                        type="text"
                        value={loginPhone}
                        onChange={(e) => setLoginPhone(e.target.value)}
                        placeholder="Enter 10 digit mobile"
                        className="w-full p-2 border rounded-xl font-mono text-slate-800"
                      />
                    </div>
                  </div>

                  <button type="submit" className="w-full py-2.5 rounded-xl bg-[#0B2545] text-white font-bold">
                    Generate Aadhaar OTP
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Enter 4-Digit OTP (Demo: 8841)</label>
                    <input
                      type="text"
                      maxLength={4}
                      value={loginOtp}
                      onChange={(e) => setLoginOtp(e.target.value)}
                      placeholder="8841"
                      className="w-full p-2.5 border rounded-xl font-mono text-center text-lg font-bold tracking-widest text-slate-900"
                    />
                  </div>

                  <button type="submit" className="w-full py-2.5 rounded-xl bg-[#046A38] text-white font-bold">
                    Verify & Login via DigiLocker
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Request My Data Disclosure Report */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="bg-[#0B2545] text-white p-5 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  Official Data Disclosure & Consent Report
                </h3>
                <p className="text-xs text-slate-300">
                  Issued under Section 11 of the Digital Personal Data Protection Act, 2023
                </p>
              </div>
              <button 
                onClick={() => setIsReportModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Certificate Preview Body */}
            <div className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              <div className="border-2 border-slate-200 rounded-2xl p-5 bg-slate-50/50 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div>
                    <div className="text-xs font-bold text-[#0B2545] uppercase tracking-wider">Government of Maharashtra</div>
                    <div className="text-[11px] text-slate-500">MahaIT & SetuGov Data Protection Authority</div>
                  </div>
                  <div className="text-right text-[10px] text-slate-500 font-mono">
                    <div>Ref: DPDP-MH-2026-PATIL-8921</div>
                    <div>Date: 28 Aug 2026, 10:05 IST</div>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-bold text-slate-800">Citizen Identification:</div>
                  <div className="grid grid-cols-2 gap-2 mt-1 text-slate-600">
                    <div>Name: <strong>{profile.name}</strong></div>
                    <div>MahaID: <strong>{profile.mahaId}</strong></div>
                    <div>Aadhaar VID: <strong>{profile.aadhaarVidMasked}</strong></div>
                    <div>KYC Status: <strong>{profile.kycCompliance}</strong></div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <div className="text-xs font-bold text-slate-800 mb-1">Active Departmental Data Access Summary:</div>
                  <ul className="space-y-1 text-slate-600 list-disc list-inside text-[11px]">
                    <li><strong>Agriculture Dept:</strong> 7/12 Land Parcel & Kharif 2026 Crop Area (Active)</li>
                    <li><strong>Transport Dept (RTO):</strong> Address & Identity for DL Renewal (Active)</li>
                    <li><strong>Public Health (ABDM):</strong> Clinical Encounter & ABHA Linkage (Active)</li>
                    <li><strong>Food & Civil Supplies:</strong> Monthly PDS NFSA Biometric Authentication (Active)</li>
                  </ul>
                </div>

                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-emerald-900 text-[11px]">
                  <div className="font-bold flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    Cryptographic Integrity Verified
                  </div>
                  <p className="mt-0.5">
                    This document is digitally signed by the State Interoperability Gateway root key (<code className="font-bold">SETU-ROOT-CA-MH-2026</code>) and serves as an authoritative legal disclosure.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={handleExportJson}
                className="text-xs font-bold text-slate-700 hover:text-slate-900 px-3 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 transition"
              >
                Copy Raw JSON Audit Trail
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsReportModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-600 hover:bg-slate-200 font-semibold"
                >
                  Close
                </button>
                <button
                  onClick={handleDownloadReport}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#046A38] hover:bg-[#03542C] text-white text-xs font-bold shadow-md shadow-emerald-950/20 transition"
                >
                  <Download className="w-4 h-4 text-amber-300" />
                  <span>Download Signed PDF Report</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
