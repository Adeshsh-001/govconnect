import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import DataExchangeView from './components/DataExchangeView';
import CitizenPortal from './components/CitizenPortal';
import Toast from './components/Toast';
import { 
  DEPARTMENTS, 
  API_METRICS_7DAYS, 
  STANDARDIZED_SCHEMAS, 
  INITIAL_INTEGRATIONS_QUEUE, 
  CITIZEN_PROFILE, 
  CITIZEN_CONSENTS, 
  CITIZEN_ACCESS_LOGS 
} from './data/mockData';

export default function App() {
  const [activeView, setActiveView] = useState('admin'); // 'admin' | 'gateway' | 'citizen'
  const [language, setLanguage] = useState('EN'); // 'EN' | 'MR'
  const [departments, setDepartments] = useState(DEPARTMENTS);
  const [integrationsQueue, setIntegrationsQueue] = useState(INITIAL_INTEGRATIONS_QUEUE);
  const [citizenProfile, setCitizenProfile] = useState(CITIZEN_PROFILE);
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

  // Add new integration request (Admin)
  const handleAddIntegration = (newIntegration) => {
    setIntegrationsQueue(prev => [newIntegration, ...prev]);
  };

  // Approve integration request (Admin)
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

  // Reject / Return integration request (Admin)
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

  // Register New Citizen (Admin Onboarding Desk)
  const handleRegisterCitizen = (newProfile) => {
    setCitizenProfile(newProfile);
    
    // Add default initial consent based on enrolled documents
    const newConsent = {
      id: `CONS-${Math.floor(10 + Math.random() * 90)}`,
      department: 'Revenue & Forest Department (MahaBhulekh)',
      deptCategory: 'Land & Revenue',
      purpose: 'Verification of 7/12 land records and ownership for state welfare and identity linkage.',
      dataCategories: ['7/12 Land Parcel Area', 'Aadhaar Virtual ID', 'Ownership Share'],
      grantedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      isGranted: true,
      isMandatory: false,
      lastAccessed: 'Just now (Registered by Admin)'
    };
    setConsents(prev => [newConsent, ...prev]);

    // Add corresponding audit log
    const newLogEntry = {
      id: `AUD-2026-${Math.floor(100 + Math.random() * 900)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
      department: 'State Interoperability Admin (MahaID Desk)',
      purpose: `Citizen Onboarded & MahaID ${newProfile.mahaId} Minted via DigiLocker e-KYC`,
      fieldsAccessed: ['Aadhaar Masked VID', 'Mobile Number', 'Permanent Address', '7/12 Record'],
      authorizationToken: `AUTH-KYC-MH-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Allowed (Consent Active)',
      ipNode: '10.142.20.01 (Admin Onboarding Node)'
    };
    setAccessLogs(prev => [newLogEntry, ...prev]);
  };

  // Trigger manual sync
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

  // Add new document / consent (Citizen)
  const handleAddConsent = (newConsent) => {
    setConsents(prev => [newConsent, ...prev]);
    
    const newLogEntry = {
      id: `AUD-2026-${Math.floor(100 + Math.random() * 900)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
      department: newConsent.department,
      purpose: `Citizen Linked Document & Granted Consent: ${newConsent.purpose.slice(0, 45)}...`,
      fieldsAccessed: newConsent.dataCategories,
      authorizationToken: `AUTH-TKN-MH-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Allowed (Consent Active)',
      ipNode: '10.142.20.01 (SetuGov Consent Broker)'
    };
    setAccessLogs(prev => [newLogEntry, ...prev]);
  };

  // Toggle Citizen Consent
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
        status: toggledItem.isGranted ? 'Allowed (Consent Active)' : 'Blocked (Consent Revoked by Citizen)',
        ipNode: '10.142.20.01 (SetuGov Consent Broker)'
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
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        pendingCount={pendingCount}
        language={language}
        setLanguage={setLanguage}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6">
        {activeView === 'admin' && (
          <AdminDashboard
            departments={departments}
            apiMetrics={API_METRICS_7DAYS}
            integrationsQueue={integrationsQueue}
            onAddIntegration={handleAddIntegration}
            onApproveIntegration={handleApproveIntegration}
            onRejectIntegration={handleRejectIntegration}
            onTriggerSync={handleTriggerSync}
            onRegisterCitizen={handleRegisterCitizen}
            addToast={addToast}
            language={language}
          />
        )}

        {activeView === 'gateway' && (
          <DataExchangeView
            schemas={STANDARDIZED_SCHEMAS}
            departments={departments}
            addToast={addToast}
            language={language}
          />
        )}

        {activeView === 'citizen' && (
          <CitizenPortal
            profile={citizenProfile}
            consents={consents}
            onToggleConsent={handleToggleConsent}
            onAddConsent={handleAddConsent}
            accessLogs={accessLogs}
            addToast={addToast}
            language={language}
          />
        )}
      </main>

      <Footer language={language} />

      <Toast toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
