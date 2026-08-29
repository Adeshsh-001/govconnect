import React, { useState } from 'react';
import { 
  Building2, 
  Activity, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  PlusCircle, 
  FileText, 
  Search, 
  Filter, 
  RefreshCw, 
  ChevronRight, 
  ShieldCheck, 
  Zap, 
  Database, 
  Send, 
  X, 
  Terminal, 
  Copy, 
  Server, 
  Check, 
  RotateCcw, 
  KeyRound, 
  FileCheck2, 
  UserPlus, 
  Fingerprint, 
  IdCard, 
  MapPin, 
  Phone, 
  FileCheck,
  UserCheck
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

export default function AdminDashboard({ 
  departments, 
  apiMetrics, 
  integrationsQueue, 
  onAddIntegration, 
  onApproveIntegration,
  onRejectIntegration,
  onTriggerSync, 
  onRegisterCitizen,
  addToast,
  language 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [queueFilter, setQueueFilter] = useState('ALL');
  const [chartMetric, setChartMetric] = useState('volume');
  
  // Modals State
  const [isNewIntegrationOpen, setIsNewIntegrationOpen] = useState(false);
  const [isCitizenRegisterOpen, setIsCitizenRegisterOpen] = useState(false);
  const [selectedDeptForLogs, setSelectedDeptForLogs] = useState(null);
  const [isLogsModalOpen, setIsLogsModalOpen] = useState(false);
  const [syncingDeptId, setSyncingDeptId] = useState(null);
  const [reviewingRequest, setReviewingRequest] = useState(null);

  // Form State for Request New Integration
  const [integrationFormData, setIntegrationFormData] = useState({
    requestingDept: 'Agriculture & Farmers Welfare (MahaDBT Shetkari)',
    sourceDept: 'Revenue & Forest Department (MahaBhulekh)',
    schemaNeeded: 'MahaBhulekh.LandRecord712.v3',
    purpose: '',
    dataClassification: 'Confidential / Citizen PII',
    slaPriority: 'Mission Critical',
    submittedBy: 'Shri V. C. Rastogi (Secretary, Agriculture)'
  });

  // Form State for Citizen Registration (Admin Onboarding Desk)
  const [citizenFormData, setCitizenFormData] = useState({
    fullName: '',
    marathiName: '',
    mobileNumber: '',
    aadhaarUid: '',
    gender: 'Male',
    dob: '1985-06-15',
    district: 'Nashik',
    taluka: 'Niphad',
    village: 'Pimpalgaon Baswant',
    address: 'Gat No. 142/2, Main Road',
    pinCode: '422209',
    landSurveyNo: '142/2',
    vehicleNo: 'MH-15-DC-4421',
    rationCardNo: '270481005521',
    abhaId: '91-4421-9981-2210',
    kycMode: 'DigiLocker / Biometric e-KYC (Level 3)'
  });

  const handleIntegrationSubmit = (e) => {
    e.preventDefault();
    if (!integrationFormData.purpose.trim()) {
      addToast({
        type: 'error',
        title: 'Validation Error',
        message: 'Please provide the legal mandate / official purpose of access.'
      });
      return;
    }

    const newIntegration = {
      id: `REQ-2026-${Math.floor(100 + Math.random() * 900)}`,
      ...integrationFormData,
      submittedAt: 'Just now',
      status: 'Pending Review',
      gatewayRoute: `/api/v2/exchange/${integrationFormData.requestingDept.slice(0,3).toLowerCase()}-${integrationFormData.sourceDept.slice(0,3).toLowerCase()}-pipeline`,
      approvalStage: 'Awaiting Nodal Data Custodian Authorization & DPDP Policy Review'
    };

    onAddIntegration(newIntegration);
    setIsNewIntegrationOpen(false);
    setIntegrationFormData({
      requestingDept: 'Agriculture & Farmers Welfare (MahaDBT Shetkari)',
      sourceDept: 'Revenue & Forest Department (MahaBhulekh)',
      schemaNeeded: 'MahaBhulekh.LandRecord712.v3',
      purpose: '',
      dataClassification: 'Confidential / Citizen PII',
      slaPriority: 'Mission Critical',
      submittedBy: 'Shri V. C. Rastogi (Secretary, Agriculture)'
    });

    addToast({
      type: 'success',
      title: 'Integration Request Submitted',
      message: `Request for ${integrationFormData.schemaNeeded} dispatched to SetuGov Interoperability Bus.`,
      subtext: `Ref: ${newIntegration.id}`
    });
  };

  const handleCitizenRegisterSubmit = (e) => {
    e.preventDefault();
    if (!citizenFormData.fullName.trim() || !citizenFormData.mobileNumber.trim()) {
      addToast({
        type: 'error',
        title: 'Missing Fields',
        message: 'Citizen full name and 10-digit mobile number are required.'
      });
      return;
    }

    const lastName = citizenFormData.fullName.split(' ').pop().toUpperCase() || 'CITIZEN';
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const generatedMahaId = `MH-2026-${lastName}-${randomSuffix}`;
    const maskedUid = citizenFormData.aadhaarUid ? `•••• •••• ${citizenFormData.aadhaarUid.slice(-4)}` : '•••• •••• 8921';

    const newCitizenProfile = {
      name: citizenFormData.fullName,
      marathiName: citizenFormData.marathiName || citizenFormData.fullName,
      mahaId: generatedMahaId,
      aadhaarVidMasked: maskedUid,
      digiLockerStatus: 'Linked & Verified (Level 3)',
      phoneMasked: `+91 ${citizenFormData.mobileNumber.slice(0, 5)} •••••`,
      residentialAddress: `${citizenFormData.address}, ${citizenFormData.village}, Taluka ${citizenFormData.taluka}, Dist ${citizenFormData.district}, Maharashtra - ${citizenFormData.pinCode}`,
      kycCompliance: 'DPDP Act (2023) Verified',
      privacyScore: 92,
      documentsLinked: {
        landRecord: citizenFormData.landSurveyNo,
        vehicleRc: citizenFormData.vehicleNo,
        rationCard: citizenFormData.rationCardNo,
        abhaId: citizenFormData.abhaId
      }
    };

    if (onRegisterCitizen) {
      onRegisterCitizen(newCitizenProfile);
    }

    setIsCitizenRegisterOpen(false);
    addToast({
      type: 'success',
      title: 'Citizen Enrolled & MahaID Generated',
      message: `${citizenFormData.fullName} registered successfully! Assigned MahaID: ${generatedMahaId}`,
      subtext: 'DigiLocker KYC Level 3 Verified • DPDP Consent Profile Created'
    });
  };

  const handleSyncDept = (dept) => {
    setSyncingDeptId(dept.id);
    setTimeout(() => {
      onTriggerSync(dept.id);
      setSyncingDeptId(null);
      addToast({
        type: 'success',
        title: 'mTLS Handshake Verified',
        message: `Gateway ping successful for ${dept.name}`,
        subtext: `Latency: ${dept.latency}ms | TLS 1.3 Active`
      });
    }, 600);
  };

  const handleOpenLogs = (dept) => {
    setSelectedDeptForLogs(dept);
    setIsLogsModalOpen(true);
  };

  const filteredDepartments = departments.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || d.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredQueue = integrationsQueue.filter(req => {
    if (queueFilter === 'ALL') return true;
    return req.status === queueFilter;
  });

  const categories = ['ALL', 'Land & Revenue', 'Transport', 'Healthcare', 'Home & Law Enforcement', 'Urban Local Bodies', 'Civil Supplies', 'Agriculture & DBT', 'Education'];
  const pendingRequestsCount = integrationsQueue.filter(i => i.status === 'Pending Review').length;
  const approvedRequestsCount = integrationsQueue.filter(i => i.status === 'Approved').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* View Header with Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-blue-100 text-blue-800">
            <Building2 className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-xl font-black text-[#0B2545]">
              {language === 'MR' ? 'प्रशासकीय नियंत्रण कक्ष' : 'Department Interoperability Admin Dashboard'}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              {language === 'MR' 
                ? 'सर्व जोडलेले विभाग, डेटा ट्रान्झॅक्शन्स, नागरिक नोंदणी व नवीन एकत्रीकरण विनंत्या व्यवस्थापित करा' 
                : 'Real-time monitoring of connected state departments, API traffic volume, citizen onboarding, and integration pipelines.'}
            </p>
          </div>
        </div>

        {/* Dual Admin Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Action 1: Register New Citizen User */}
          <button
            onClick={() => setIsCitizenRegisterOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-950/20 transition transform active:scale-95"
          >
            <UserPlus className="w-4 h-4 text-amber-300" />
            <span>Enrol Citizen (MahaID)</span>
          </button>

          {/* Action 2: Request New Department Integration */}
          <button
            onClick={() => setIsNewIntegrationOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0B2545] hover:bg-[#134074] text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-950/20 transition transform active:scale-95"
          >
            <PlusCircle className="w-4 h-4 text-amber-400" />
            <span>Request New Integration</span>
          </button>
        </div>
      </div>

      {/* 4 Core Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Connected Departments</span>
            <span className="p-2 rounded-xl bg-blue-50 text-blue-700">
              <Building2 className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#0B2545]">7</span>
            <span className="text-xs text-slate-400 font-medium">/ 8 Onboarded</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>1 Pending Onboarding (Higher Ed)</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">API Transactions Today</span>
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
              <Activity className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-800">2.84M</span>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" /> +14.2%
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <span>Success Rate:</span>
            <span className="font-bold text-emerald-700">99.94%</span>
            <span>(Avg: 42ms)</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending Data Requests</span>
            <span className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className={`text-3xl font-black ${pendingRequestsCount > 0 ? 'text-amber-700' : 'text-emerald-700'}`}>
              {pendingRequestsCount}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {pendingRequestsCount > 0 ? 'Awaiting Approval' : 'All Requests Cleared'}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-600 font-medium">
            <span>Approved Pipelines:</span>
            <span className="font-bold text-emerald-700">{approvedRequestsCount}</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Integrations</span>
            <span className="p-2 rounded-xl bg-purple-50 text-purple-700">
              <Zap className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-purple-900">{24 + approvedRequestsCount}</span>
            <span className="text-xs text-slate-400 font-medium">Live Gateway Pipelines</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-purple-800 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-700" />
            <span>DPDP Consent Broker Active</span>
          </div>
        </div>
      </div>

      {/* 7-Day API Call Volume & Latency Chart */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-[#0B2545] flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600" />
              API Call Volume & Traffic Analysis (Last 7 Days)
            </h3>
            <p className="text-xs text-slate-500">
              Aggregated daily requests routed across SetuGov Interoperability Gateway with latency distribution.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
            <button
              onClick={() => setChartMetric('volume')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                chartMetric === 'volume' ? 'bg-white text-blue-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Total Volume
            </button>
            <button
              onClick={() => setChartMetric('breakdown')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                chartMetric === 'breakdown' ? 'bg-white text-blue-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Department Breakdown
            </button>
            <button
              onClick={() => setChartMetric('latency')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                chartMetric === 'latency' ? 'bg-white text-blue-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Latency (ms)
            </button>
          </div>
        </div>

        <div className="h-72 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            {chartMetric === 'volume' ? (
              <AreaChart data={apiMetrics} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="totalVolumeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1D4ED8" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#1D4ED8" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="day" stroke="#64748B" fontSize={12} tickLine={false} />
                <YAxis 
                  stroke="#64748B" 
                  fontSize={12} 
                  tickLine={false} 
                  tickFormatter={(val) => `${(val / 1000000).toFixed(1)}M`} 
                />
                <Tooltip 
                  formatter={(val) => [`${(val).toLocaleString()} calls`, "Total API Calls"]}
                  contentStyle={{ backgroundColor: '#0B2545', color: '#fff', borderRadius: '12px', border: 'none', fontSize: '12px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="totalCalls" 
                  stroke="#1D4ED8" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#totalVolumeGradient)" 
                />
              </AreaChart>
            ) : chartMetric === 'breakdown' ? (
              <BarChart data={apiMetrics} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="day" stroke="#64748B" fontSize={12} tickLine={false} />
                <YAxis 
                  stroke="#64748B" 
                  fontSize={12} 
                  tickLine={false} 
                  tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`} 
                />
                <Tooltip 
                  formatter={(val, name) => [`${(val).toLocaleString()} calls`, name]}
                  contentStyle={{ backgroundColor: '#0B2545', color: '#fff', borderRadius: '12px', border: 'none', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                <Bar dataKey="revenueCalls" name="Revenue (7/12)" fill="#1D4ED8" stackId="a" />
                <Bar dataKey="transportCalls" name="Transport (Vahan)" fill="#046A38" stackId="a" />
                <Bar dataKey="healthCalls" name="Health (ABDM)" fill="#D97706" stackId="a" />
                <Bar dataKey="policeCalls" name="Police (CCTNS)" fill="#7C3AED" stackId="a" radius={[4, 4, 0, 0]} />
              </BarChart>
            ) : (
              <AreaChart data={apiMetrics} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="latencyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#046A38" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#046A38" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="day" stroke="#64748B" fontSize={12} tickLine={false} />
                <YAxis 
                  stroke="#64748B" 
                  fontSize={12} 
                  tickLine={false} 
                  tickFormatter={(val) => `${val}ms`} 
                />
                <Tooltip 
                  formatter={(val) => [`${val} ms`, "Average Response Latency"]}
                  contentStyle={{ backgroundColor: '#0B2545', color: '#fff', borderRadius: '12px', border: 'none', fontSize: '12px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="latency" 
                  stroke="#046A38" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#latencyGradient)" 
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Connected Departments Table Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-[#0B2545] flex items-center gap-2">
              <Server className="w-4 h-4 text-blue-600" />
              Connected Government Department Gateways
            </h3>
            <p className="text-xs text-slate-500">
              Direct mTLS connected departmental nodes, schema provisions, and live handshake status.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search department or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="py-2 px-3 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50 text-slate-700 font-medium"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat === 'ALL' ? 'All Categories' : cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Department & State Node</th>
                <th className="py-3 px-4">Domain Category</th>
                <th className="py-3 px-4">Schemas Provided</th>
                <th className="py-3 px-4">Status & Sync</th>
                <th className="py-3 px-4">24h Calls</th>
                <th className="py-3 px-4">Latency</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDepartments.map((dept) => {
                const isConnected = dept.status === 'Connected';
                const isSyncing = syncingDeptId === dept.id;

                return (
                  <tr key={dept.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-900 text-xs sm:text-sm">{dept.name}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="font-mono text-[11px] text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">
                          {dept.id}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                          {dept.nodalOfficer}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="bg-slate-100 text-slate-800 font-medium px-2 py-1 rounded-md text-[11px]">
                        {dept.category}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {dept.schemasProvided.map(schema => (
                          <span key={schema} className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-1.5 py-0.5 rounded font-mono">
                            {schema}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
                        <span className={`font-bold ${isConnected ? 'text-emerald-700' : 'text-amber-700'}`}>
                          {dept.status}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{dept.lastSync}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4 font-mono font-semibold text-slate-800">
                      {dept.dailyCalls > 0 ? dept.dailyCalls.toLocaleString() : '—'}
                    </td>

                    <td className="py-4 px-4">
                      {dept.latency > 0 ? (
                        <div className="flex items-center gap-1">
                          <span className="font-mono font-bold text-slate-800">{dept.latency}ms</span>
                          <span className="text-[10px] text-emerald-600 font-semibold">(Good)</span>
                        </div>
                      ) : (
                        <span className="text-slate-400 text-[11px]">Pending TLS</span>
                      )}
                    </td>

                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleSyncDept(dept)}
                          disabled={isSyncing}
                          className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition"
                          title="Trigger Manual Handshake Sync"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-blue-600' : ''}`} />
                        </button>
                        <button
                          onClick={() => handleOpenLogs(dept)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0B2545] hover:bg-[#134074] text-white text-[11px] font-bold shadow-sm transition"
                        >
                          <FileText className="w-3 h-3" />
                          <span>View API Logs</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inter-Departmental Requests Queue Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-[#0B2545] flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600" />
              Inter-Departmental Data Sharing Requests Queue
            </h3>
            <p className="text-xs text-slate-500">
              Review and approve formal data sharing mandates submitted under the Maharashtra Interoperability Policy.
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setQueueFilter('ALL')}
                className={`px-3 py-1 rounded-lg transition ${queueFilter === 'ALL' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}
              >
                All ({integrationsQueue.length})
              </button>
              <button
                onClick={() => setQueueFilter('Pending Review')}
                className={`px-3 py-1 rounded-lg transition flex items-center gap-1 ${queueFilter === 'Pending Review' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-600'}`}
              >
                <span>Pending</span>
                <span className="text-[10px] bg-amber-700/80 text-white px-1.5 rounded-full">{pendingRequestsCount}</span>
              </button>
              <button
                onClick={() => setQueueFilter('Approved')}
                className={`px-3 py-1 rounded-lg transition ${queueFilter === 'Approved' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600'}`}
              >
                Approved ({approvedRequestsCount})
              </button>
            </div>
          </div>
        </div>

        {/* Requests Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {filteredQueue.map((req) => {
            const isPending = req.status === 'Pending Review';
            const isApproved = req.status === 'Approved';

            return (
              <div 
                key={req.id} 
                className={`p-5 rounded-2xl border transition-all duration-200 ${
                  isPending 
                    ? 'bg-amber-50/40 border-amber-200 shadow-sm hover:shadow-md' 
                    : isApproved 
                    ? 'bg-emerald-50/30 border-emerald-200 hover:shadow-md' 
                    : 'bg-slate-50 border-slate-200 opacity-80'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-blue-900 bg-blue-100 px-2 py-0.5 rounded">
                      {req.id}
                    </span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                      isApproved 
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                        : isPending 
                        ? 'bg-amber-100 text-amber-800 border-amber-300 animate-pulse' 
                        : 'bg-rose-100 text-rose-800 border-rose-300'
                    }`}>
                      {req.status}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">{req.submittedAt}</span>
                </div>

                <div className="mt-3 space-y-1.5 text-xs">
                  <div>
                    <span className="text-slate-500 font-semibold">Consumer Dept: </span>
                    <span className="font-bold text-slate-900">{req.requestingDept}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold">Source Custodian: </span>
                    <span className="font-bold text-slate-800">{req.sourceDept}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold">Requested Schema: </span>
                    <span className="font-mono text-emerald-800 font-bold bg-white px-2 py-0.5 rounded border border-slate-200 inline-block mt-0.5">
                      {req.schemaNeeded}
                    </span>
                  </div>
                  <p className="text-slate-700 text-[11px] bg-white p-2.5 rounded-xl border border-slate-200 mt-2 leading-relaxed">
                    <span className="font-bold text-slate-900">DPDP Legal Mandate: </span>
                    {req.purpose}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between gap-2">
                  {isPending ? (
                    <>
                      <button
                        onClick={() => setReviewingRequest(req)}
                        className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold transition"
                      >
                        Review Mandate
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            onRejectIntegration(req.id, 'Data classification requires higher security clearance.');
                            addToast({
                              type: 'warning',
                              title: 'Proposal Returned',
                              message: `Request ${req.id} returned for revision.`
                            });
                          }}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-bold transition"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>

                        <button
                          onClick={() => {
                            onApproveIntegration(req.id);
                            addToast({
                              type: 'success',
                              title: 'Integration Approved & Live',
                              message: `Request ${req.id} authorized. mTLS route ${req.gatewayRoute} is now active on SetuGov bus.`
                            });
                          }}
                          className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-bold shadow-md transition transform active:scale-95"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve & Issue Route</span>
                        </button>
                      </div>
                    </>
                  ) : isApproved ? (
                    <div className="w-full flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Live Route: <code className="font-mono font-normal text-[11px] bg-white px-2 py-0.5 rounded border border-emerald-300">{req.gatewayRoute}</code></span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full flex items-center justify-between text-xs">
                      <span className="text-rose-700 font-semibold">Returned for Revision</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL 1: Enrol New Citizen & Generate MahaID (Admin Onboarding Desk) */}
      {isCitizenRegisterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] text-xs">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#046A38] to-[#0B2545] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white/10 border border-white/20">
                  <UserPlus className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="text-sm font-bold">
                    Official Citizen Onboarding Desk & MahaID Generation
                  </h3>
                  <p className="text-[11px] text-slate-200">
                    Register new citizen identity, verify biometric/UID credentials, and link departmental records.
                  </p>
                </div>
              </div>
              <button onClick={() => setIsCitizenRegisterOpen(false)} className="text-slate-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleCitizenRegisterSubmit} className="p-6 space-y-4 overflow-y-auto flex-1 text-slate-700">
              {/* Section 1: Demographics */}
              <div>
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <IdCard className="w-4 h-4 text-blue-600" />
                  <span>1. Citizen Identity & Demographic Details</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Full Name (English) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Santosh Patil"
                      value={citizenFormData.fullName}
                      onChange={(e) => setCitizenFormData({ ...citizenFormData, fullName: e.target.value })}
                      className="w-full p-2 rounded-lg border text-slate-900 bg-white font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">नाव (मराठीत - पर्यायी)</label>
                    <input
                      type="text"
                      placeholder="उदा. रमेश संतोष पाटील"
                      value={citizenFormData.marathiName}
                      onChange={(e) => setCitizenFormData({ ...citizenFormData, marathiName: e.target.value })}
                      className="w-full p-2 rounded-lg border text-slate-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Mobile Number (Aadhaar Linked) *</label>
                    <div className="flex gap-2">
                      <span className="p-2 bg-slate-200 rounded-lg border font-bold text-slate-600 text-xs">+91</span>
                      <input
                        type="text"
                        required
                        maxLength={10}
                        placeholder="9823012345"
                        value={citizenFormData.mobileNumber}
                        onChange={(e) => setCitizenFormData({ ...citizenFormData, mobileNumber: e.target.value })}
                        className="w-full p-2 rounded-lg border text-slate-900 bg-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">12-Digit Aadhaar UID / VID *</label>
                    <input
                      type="text"
                      required
                      maxLength={12}
                      placeholder="4412 8821 9912"
                      value={citizenFormData.aadhaarUid}
                      onChange={(e) => setCitizenFormData({ ...citizenFormData, aadhaarUid: e.target.value })}
                      className="w-full p-2 rounded-lg border text-slate-900 bg-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Address & Location */}
              <div>
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>2. Residential Domicile & Location</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">District</label>
                    <input
                      type="text"
                      value={citizenFormData.district}
                      onChange={(e) => setCitizenFormData({ ...citizenFormData, district: e.target.value })}
                      className="w-full p-2 rounded-lg border bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Taluka</label>
                    <input
                      type="text"
                      value={citizenFormData.taluka}
                      onChange={(e) => setCitizenFormData({ ...citizenFormData, taluka: e.target.value })}
                      className="w-full p-2 rounded-lg border bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Village / City</label>
                    <input
                      type="text"
                      value={citizenFormData.village}
                      onChange={(e) => setCitizenFormData({ ...citizenFormData, village: e.target.value })}
                      className="w-full p-2 rounded-lg border bg-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1">Detailed Street Address / Gat</label>
                    <input
                      type="text"
                      value={citizenFormData.address}
                      onChange={(e) => setCitizenFormData({ ...citizenFormData, address: e.target.value })}
                      className="w-full p-2 rounded-lg border bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">PIN Code</label>
                    <input
                      type="text"
                      value={citizenFormData.pinCode}
                      onChange={(e) => setCitizenFormData({ ...citizenFormData, pinCode: e.target.value })}
                      className="w-full p-2 rounded-lg border bg-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Initial Departmental Document Identifiers to Link */}
              <div>
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Database className="w-4 h-4 text-purple-600" />
                  <span>3. Link Departmental Documents (Auto-Verified via SetuGov)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-purple-50/40 p-4 rounded-xl border border-purple-200">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">MahaBhulekh 7/12 Gat No.</label>
                    <input
                      type="text"
                      placeholder="e.g. 142/2"
                      value={citizenFormData.landSurveyNo}
                      onChange={(e) => setCitizenFormData({ ...citizenFormData, landSurveyNo: e.target.value })}
                      className="w-full p-2 rounded-lg border bg-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Vehicle RC Number</label>
                    <input
                      type="text"
                      placeholder="e.g. MH-15-DC-4421"
                      value={citizenFormData.vehicleNo}
                      onChange={(e) => setCitizenFormData({ ...citizenFormData, vehicleNo: e.target.value })}
                      className="w-full p-2 rounded-lg border bg-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">MahaPDS Ration Card Number</label>
                    <input
                      type="text"
                      placeholder="e.g. 270481005521"
                      value={citizenFormData.rationCardNo}
                      onChange={(e) => setCitizenFormData({ ...citizenFormData, rationCardNo: e.target.value })}
                      className="w-full p-2 rounded-lg border bg-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">ABHA Health ID</label>
                    <input
                      type="text"
                      placeholder="e.g. 91-4421-9981-2210"
                      value={citizenFormData.abhaId}
                      onChange={(e) => setCitizenFormData({ ...citizenFormData, abhaId: e.target.value })}
                      className="w-full p-2 rounded-lg border bg-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* DPDP Compliance Certification */}
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 text-[11px] flex items-start gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong>Admin Attestation & DPDP Notice:</strong> You certify that the citizen’s identity has been verified via physical biometric / DigiLocker e-KYC. A unique tokenized <strong>MahaID</strong> will be minted, and personal data will be managed under the <strong>DPDP Act 2023</strong> purpose-limitation rules.
                </div>
              </div>

              {/* Form Actions */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCitizenRegisterOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold shadow-md shadow-emerald-950/20"
                >
                  <UserPlus className="w-4 h-4 text-amber-300" />
                  <span>Enrol Citizen & Issue MahaID</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Request New Integration Form */}
      {isNewIntegrationOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-[#0B2545] text-white p-5 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-amber-400" />
                  Request New Inter-Departmental Data Integration
                </h3>
                <p className="text-xs text-slate-300">
                  Submit a formal data exchange mandate under the Maharashtra Interoperability Framework.
                </p>
              </div>
              <button 
                onClick={() => setIsNewIntegrationOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleIntegrationSubmit} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Requesting Department (Data Consumer)
                  </label>
                  <select
                    value={integrationFormData.requestingDept}
                    onChange={(e) => setIntegrationFormData({ ...integrationFormData, requestingDept: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-800 focus:ring-2 focus:ring-blue-500"
                  >
                    {departments.map(d => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Data Custodian Department (Source)
                  </label>
                  <select
                    value={integrationFormData.sourceDept}
                    onChange={(e) => setIntegrationFormData({ ...integrationFormData, sourceDept: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-800 focus:ring-2 focus:ring-blue-500"
                  >
                    {departments.map(d => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Required Standardized Data Schema
                </label>
                <select
                  value={integrationFormData.schemaNeeded}
                  onChange={(e) => setIntegrationFormData({ ...integrationFormData, schemaNeeded: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono text-slate-800 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="MahaBhulekh.LandRecord712.v3">MahaBhulekh.LandRecord712.v3 (7/12 Land & Crop Record)</option>
                  <option value="MahaVahan.VehicleRC_Fitness.v2">MahaVahan.VehicleRC_Fitness.v2 (Vehicle Registration & Fitness)</option>
                  <option value="ArogyaHealth.ABDM_EHR_Encounter.v1">ArogyaHealth.ABDM_EHR_Encounter.v1 (ABDM Clinical EHR)</option>
                  <option value="MahaFoodPDS.RationFamily_NFSA.v1">MahaFoodPDS.RationFamily_NFSA.v1 (Ration Card NFSA Entitlement)</option>
                  <option value="MahaPolice.CCTNS_Verification.v2">MahaPolice.CCTNS_Verification.v2 (Police Verification NOC)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Purpose of Access & Legal Mandate (Required under DPDP Act 2023)
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Automated validation of agricultural landholding for PM-KISAN / Namo Shetkari Mahasanman Yojana Direct Benefit Transfer eligibility..."
                  value={integrationFormData.purpose}
                  onChange={(e) => setIntegrationFormData({ ...integrationFormData, purpose: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 text-slate-800"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewIntegrationOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B2545] hover:bg-[#134074] text-white font-bold shadow-md shadow-blue-950/20"
                >
                  <Send className="w-4 h-4 text-amber-400" />
                  <span>Submit Integration Proposal</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: View API Logs Inspector */}
      {isLogsModalOpen && selectedDeptForLogs && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 text-slate-100 w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-700 overflow-hidden flex flex-col max-h-[85vh]">
            <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Terminal className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Live API Transaction Logs: {selectedDeptForLogs.name}
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono mt-0.5">
                    <span>Node: {selectedDeptForLogs.id}</span>
                    <span>•</span>
                    <span>IP: {selectedDeptForLogs.nodeIp}</span>
                    <span>•</span>
                    <span className="text-emerald-400">{selectedDeptForLogs.sslExpiry}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsLogsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-3 overflow-y-auto font-mono text-xs text-slate-300">
              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Sample cURL Command</div>
                <div className="text-emerald-300 text-[11px] break-all">
                  curl -X POST "https://gateway.setugov.maharashtra.gov.in/api/v2/mh-bhulekh/fetch-712" \<br/>
                  &nbsp;&nbsp;-H "Authorization: Bearer SETU_TOKEN_MH_2026_AGRI" \<br/>
                  &nbsp;&nbsp;-H "X-DPDP-Consent-Ref: DPDP-MH-2026-AGR-8812" \<br/>
                  &nbsp;&nbsp;-H "Content-Type: application/json" \<br/>
                  &nbsp;&nbsp;-d '&#123;"districtCode": "481", "gatNumber": "142", "talukaCode": "03841"&#125;'
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Recent Inbound / Outbound Packets</div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-emerald-900/60 text-[11px]">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-emerald-400 font-bold">[200 OK] POST /api/v2/mh-bhulekh/fetch-712</span>
                    <span>10:04:12 IST (38ms)</span>
                  </div>
                  <div className="text-slate-300 mt-1">Consumer: Agriculture Dept • Payload: 4.2 KB • Consent Token: Verified (Active)</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-950 p-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">Logs retained for 180 days per CERT-In guidelines</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(selectedDeptForLogs, null, 2));
                  addToast({ type: 'info', title: 'Copied', message: 'Node configuration copied to clipboard' });
                }}
                className="flex items-center gap-1 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Node Spec</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
