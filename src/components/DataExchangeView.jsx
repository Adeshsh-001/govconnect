import React, { useState } from 'react';
import { 
  Layers, 
  Cpu, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Copy, 
  ExternalLink, 
  Play, 
  RefreshCw, 
  ChevronDown, 
  ChevronUp, 
  Code, 
  Server, 
  Lock, 
  Zap, 
  Globe2, 
  Database, 
  FileCheck, 
  FileCode2,
  Terminal,
  Clock,
  Sparkles
} from 'lucide-react';

export default function DataExchangeView({ schemas, departments, addToast, language }) {
  const [expandedSchemaId, setExpandedSchemaId] = useState('schema-land-712');
  const [copiedSchemaId, setCopiedSchemaId] = useState(null);

  // Simulator State
  const [simSource, setSimSource] = useState('MH-AGR-SHETKARI');
  const [simTarget, setSimTarget] = useState('MH-REV-BHULEKH');
  const [simSchema, setSimSchema] = useState('schema-land-712');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationSteps, setSimulationSteps] = useState([]);
  const [simResult, setSimResult] = useState(null);

  const toggleSchema = (id) => {
    setExpandedSchemaId(expandedSchemaId === id ? null : id);
  };

  const handleCopyJson = (schema) => {
    navigator.clipboard.writeText(JSON.stringify(schema.samplePayload, null, 2));
    setCopiedSchemaId(schema.id);
    addToast({
      type: 'info',
      title: 'JSON Payload Copied',
      message: `Sample payload for ${schema.name} copied to clipboard.`
    });
    setTimeout(() => setCopiedSchemaId(null), 2000);
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimulationSteps([]);
    setSimResult(null);

    const sourceDeptObj = departments.find(d => d.id === simSource) || { name: 'Consumer Node' };
    const targetDeptObj = departments.find(d => d.id === simTarget) || { name: 'Custodian Node' };
    const schemaObj = schemas.find(s => s.id === simSchema) || schemas[0];

    const steps = [
      { id: 1, text: `Establishing mTLS 1.3 Handshake: ${sourceDeptObj.name} ➔ SetuGov Gateway`, delay: 300, status: 'DONE' },
      { id: 2, text: 'Verifying DPDP Act Citizen Consent Token (Token: DPDP-MH-2026-PATIL-8921)... Validated.', delay: 700, status: 'DONE' },
      { id: 3, text: `Validating JSON payload against standard definition: ${schemaObj.schemaCode} ... Passed (0 errors).`, delay: 1100, status: 'DONE' },
      { id: 4, text: `Querying ${targetDeptObj.name} authoritative repository & encrypting response payload (AES-256 GCM).`, delay: 1500, status: 'DONE' },
      { id: 5, text: 'Packet successfully delivered. Immutable audit log recorded in SetuGov state ledger.', delay: 1800, status: 'DONE' }
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setSimulationSteps(prev => [...prev, step]);
        if (index === steps.length - 1) {
          setIsSimulating(false);
          setSimResult({
            statusCode: 200,
            statusText: '200 OK (Delivered)',
            latencyMs: 38 + Math.floor(Math.random() * 15),
            payload: schemaObj.samplePayload,
            traceId: `TRACE-MH-SETU-${Math.floor(100000 + Math.random() * 900000)}`
          });
          addToast({
            type: 'success',
            title: 'Transaction Successful',
            message: `Interoperability packet verified & delivered in ${38 + Math.floor(Math.random() * 15)}ms`,
            subtext: `Schema: ${schemaObj.schemaCode}`
          });
        }
      }, step.delay);
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
            <Layers className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-xl font-black text-[#0B2545]">
              {language === 'MR' ? 'डेटा देवाणघेवाण व API गेटवे प्रणाली' : 'Data Exchange & Interoperability Gateway'}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              {language === 'MR' 
                ? 'प्रमाणित डेटा स्कीमा, सुरक्षित मेसेज बस आणि थेट ट्रान्झॅक्शन सिम्युलेटर' 
                : 'NDGFP-aligned standardized schemas, mTLS message bus routing, and real-time packet transaction diagnostics.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-slate-100 px-3 py-1.5 rounded-xl text-slate-700">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>OpenAPI 3.1 & FHIR Standard</span>
        </div>
      </div>

      {/* Visual Interoperability Flow Topology */}
      <div className="bg-gradient-to-br from-[#0B2545] via-[#134074] to-[#0A192F] text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-center justify-between pb-6 border-b border-white/10 relative z-10">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300">Architecture Topology</span>
            <h3 className="text-lg font-black text-white mt-0.5">
              SetuGov Interoperability Bus & Consent Broker
            </h3>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-mono text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>mTLS 1.3 Encrypted Mesh</span>
          </div>
        </div>

        {/* Diagram Nodes Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center my-6 relative z-10">
          {/* Column 1: Source Data Custodians */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider text-center lg:text-left flex items-center gap-2">
              <Database className="w-4 h-4 text-blue-400" />
              <span>Authoritative Source Repositories</span>
            </div>
            
            <div className="p-3 rounded-xl bg-white/10 border border-white/10 backdrop-blur-md hover:bg-white/15 transition flex items-center justify-between">
              <div>
                <div className="font-bold text-xs">Revenue & Forest (MahaBhulekh)</div>
                <div className="text-[10px] text-emerald-300 font-mono">Land 7/12, Mutation Registry</div>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </div>

            <div className="p-3 rounded-xl bg-white/10 border border-white/10 backdrop-blur-md hover:bg-white/15 transition flex items-center justify-between">
              <div>
                <div className="font-bold text-xs">Motor Vehicles (Vahan / RTO)</div>
                <div className="text-[10px] text-emerald-300 font-mono">Vehicle RC, Driving Licenses</div>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </div>

            <div className="p-3 rounded-xl bg-white/10 border border-white/10 backdrop-blur-md hover:bg-white/15 transition flex items-center justify-between">
              <div>
                <div className="font-bold text-xs">Public Health (ABDM Registry)</div>
                <div className="text-[10px] text-emerald-300 font-mono">ABHA Clinical Health Records</div>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </div>
          </div>

          {/* Column 2: Central Interoperability Gateway */}
          <div className="p-5 rounded-2xl bg-white/15 border-2 border-amber-400/40 shadow-2xl backdrop-blur-lg text-center space-y-3 relative">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-400 flex items-center justify-center shadow-lg shadow-amber-500/30">
              <Zap className="w-6 h-6 text-white" />
            </div>

            <div>
              <div className="text-xs font-black tracking-wider text-amber-300 uppercase">SetuGov Gateway Engine</div>
              <div className="text-sm font-bold text-white mt-0.5">Central Interoperability Layer</div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-left pt-2 border-t border-white/10">
              <div className="bg-black/20 p-2 rounded-lg">
                <div className="text-slate-400">1. DPDP Broker</div>
                <div className="text-emerald-300 font-bold">Consent Enforced</div>
              </div>
              <div className="bg-black/20 p-2 rounded-lg">
                <div className="text-slate-400">2. Schema Parser</div>
                <div className="text-emerald-300 font-bold">JSON Spec v3.2</div>
              </div>
              <div className="bg-black/20 p-2 rounded-lg">
                <div className="text-slate-400">3. Rate Limiter</div>
                <div className="text-emerald-300 font-bold">Token Bucket (500/s)</div>
              </div>
              <div className="bg-black/20 p-2 rounded-lg">
                <div className="text-slate-400">4. Audit Ledger</div>
                <div className="text-emerald-300 font-bold">SHA-256 Chained</div>
              </div>
            </div>
          </div>

          {/* Column 3: Consumer Departments & Citizens */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider text-center lg:text-left flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-emerald-400" />
              <span>Consumer Portals & Citizen Services</span>
            </div>

            <div className="p-3 rounded-xl bg-white/10 border border-white/10 backdrop-blur-md hover:bg-white/15 transition flex items-center justify-between">
              <div>
                <div className="font-bold text-xs">Agriculture DBT (MahaShetkari)</div>
                <div className="text-[10px] text-amber-300 font-mono">Farmer Subsidy Verification</div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </div>

            <div className="p-3 rounded-xl bg-white/10 border border-white/10 backdrop-blur-md hover:bg-white/15 transition flex items-center justify-between">
              <div>
                <div className="font-bold text-xs">Maharashtra Police (CCTNS / ANPR)</div>
                <div className="text-[10px] text-amber-300 font-mono">Stolen Vehicle & Challan Query</div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </div>

            <div className="p-3 rounded-xl bg-white/10 border border-white/10 backdrop-blur-md hover:bg-white/15 transition flex items-center justify-between">
              <div>
                <div className="font-bold text-xs">Citizen Consent Portal</div>
                <div className="text-[10px] text-amber-300 font-mono">DPDP Transparency & Revocation</div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Data Packet Dispatch Diagnostics */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-[#0B2545] flex items-center gap-2">
              <Terminal className="w-4 h-4 text-blue-600" />
              Data Packet Transmission Diagnostics
            </h3>
            <p className="text-xs text-slate-500">
              Verify end-to-end data transmission across departments with real-time verification trace.
            </p>
          </div>
          <span className="text-xs font-mono bg-blue-50 text-blue-700 font-bold px-2.5 py-1 rounded-full border border-blue-200">
            Diagnostics Tool
          </span>
        </div>

        {/* Simulator Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-xs">
          {/* Source Node */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">Consumer Node (Requester)</label>
            <select
              value={simSource}
              onChange={(e) => setSimSource(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-800 focus:ring-2 focus:ring-blue-500"
            >
              {departments.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

          {/* Target Custodian */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">Authoritative Data Custodian</label>
            <select
              value={simTarget}
              onChange={(e) => setSimTarget(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-800 focus:ring-2 focus:ring-blue-500"
            >
              {departments.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

          {/* Schema Selector */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">Payload Schema</label>
            <select
              value={simSchema}
              onChange={(e) => setSimSchema(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono text-slate-800 focus:ring-2 focus:ring-blue-500"
            >
              {schemas.map(s => (
                <option key={s.id} value={s.id}>{s.name} ({s.version})</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="text-xs text-slate-500">
            Citizen Consent Token: <code className="bg-slate-100 px-2 py-0.5 rounded text-blue-700 font-bold">DPDP-MH-2026-PATIL-8921</code>
          </div>

          <button
            onClick={handleRunSimulation}
            disabled={isSimulating}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-bold shadow-md shadow-emerald-950/20 transition transform active:scale-95 disabled:opacity-50"
          >
            {isSimulating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Executing Gateway Handshake...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 text-amber-300" />
                <span>Dispatch Test Packet</span>
              </>
            )}
          </button>
        </div>

        {/* Live Simulation Output Box */}
        {(simulationSteps.length > 0 || simResult) && (
          <div className="mt-5 p-4 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
              <span className="text-[11px] font-bold text-emerald-400">Gateway Transaction Trace</span>
              {simResult && <span className="text-emerald-400 font-bold">{simResult.statusText} ({simResult.latencyMs}ms)</span>}
            </div>

            {/* Step Logs */}
            <div className="space-y-1.5">
              {simulationSteps.map((step) => (
                <div key={step.id} className="flex items-center gap-2 text-[11px] text-slate-300 animate-in fade-in duration-100">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{step.text}</span>
                </div>
              ))}
            </div>

            {/* Returned JSON Payload */}
            {simResult && (
              <div className="mt-3 pt-3 border-t border-slate-800">
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                  <span>Returned Decrypted Payload:</span>
                  <span className="text-blue-400">{simResult.traceId}</span>
                </div>
                <pre className="p-3 rounded-lg bg-slate-900 text-emerald-300 text-[11px] overflow-x-auto max-h-48 scrollbar-thin">
                  {JSON.stringify(simResult.payload, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Standardized Data Schemas Registry */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-[#0B2545] flex items-center gap-2">
              <FileCode2 className="w-4 h-4 text-blue-600" />
              Standardized State Data Schemas Registry (NDGFP Aligned)
            </h3>
            <p className="text-xs text-slate-500">
              Authoritative JSON schema definitions enabling seamless interoperability across departments without data duplication.
            </p>
          </div>
          <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full border border-emerald-200">
            {schemas.length} Core State Schemas
          </span>
        </div>

        {/* Schema Cards List */}
        <div className="divide-y divide-slate-100">
          {schemas.map((schema) => {
            const isExpanded = expandedSchemaId === schema.id;
            const isCopied = copiedSchemaId === schema.id;

            return (
              <div key={schema.id} className="p-6 hover:bg-slate-50/50 transition">
                {/* Schema Header Row */}
                <div 
                  onClick={() => toggleSchema(schema.id)}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900">{schema.name}</h4>
                      <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {schema.schemaCode}
                      </span>
                      <span className="text-[10px] bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded-full">
                        {schema.version}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{schema.description}</p>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
                    <span className="text-xs font-semibold text-slate-500">
                      {schema.fieldsCount} Standard Fields
                    </span>
                    <button className="p-1 rounded-lg hover:bg-slate-200 text-slate-600 transition">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-5 pt-4 border-t border-slate-200 space-y-4 animate-in fade-in duration-150">
                    {/* Metadata Pill Row */}
                    <div className="flex flex-wrap items-center gap-4 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-700">
                      <div><strong>Domain:</strong> {schema.domain}</div>
                      <div>•</div>
                      <div><strong>Classification:</strong> <span className="text-amber-700 font-semibold">{schema.classification}</span></div>
                      <div>•</div>
                      <div><strong>Lead Custodian:</strong> {schema.leadDepartment}</div>
                    </div>

                    {/* Field Definitions Table */}
                    <div>
                      <div className="text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
                        Schema Field Specification Dictionary
                      </div>
                      <div className="overflow-x-auto rounded-xl border border-slate-200">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
                            <tr>
                              <th className="py-2.5 px-3">Field Name</th>
                              <th className="py-2.5 px-3">Data Type</th>
                              <th className="py-2.5 px-3">Required</th>
                              <th className="py-2.5 px-3">Description & Validation Rule</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {schema.fields.map(f => (
                              <tr key={f.name} className="hover:bg-slate-50">
                                <td className="py-2 px-3 font-mono font-bold text-blue-800">{f.name}</td>
                                <td className="py-2 px-3 font-mono text-slate-600 text-[11px]">{f.type}</td>
                                <td className="py-2 px-3">
                                  {f.required ? (
                                    <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-1.5 py-0.2 rounded">Required</span>
                                  ) : (
                                    <span className="text-[10px] bg-slate-100 text-slate-600 font-medium px-1.5 py-0.2 rounded">Optional</span>
                                  )}
                                </td>
                                <td className="py-2 px-3 text-slate-600">{f.desc}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Sample JSON Payload Viewer */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                          <Code className="w-3.5 h-3.5 text-blue-600" />
                          Sample JSON Output Payload
                        </span>
                        <button
                          onClick={() => handleCopyJson(schema)}
                          className="flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg border border-blue-200 transition"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>{isCopied ? 'Copied!' : 'Copy Sample JSON'}</span>
                        </button>
                      </div>

                      <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto text-emerald-300 font-mono text-xs max-h-72 border border-slate-800 scrollbar-thin">
                        <pre>{JSON.stringify(schema.samplePayload, null, 2)}</pre>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
