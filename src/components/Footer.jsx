import React from 'react';
import { ShieldCheck, Lock, ExternalLink, HelpCircle, CheckCircle2, Award, Heart } from 'lucide-react';

export default function Footer({ language }) {
  return (
    <footer className="bg-[#0B2545] text-slate-300 text-xs border-t border-slate-700 mt-16">
      {/* Top Compliance Bar */}
      <div className="border-b border-slate-800/80 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold text-white">DPDP Act (2023) Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-400" />
              <span className="font-semibold text-white">mTLS & AES-256 GCM Encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-400" />
              <span className="font-semibold text-white">OpenAPI 3.1 & NDGFP Standard</span>
            </div>
          </div>

          <div className="text-slate-400 text-[11px] font-mono">
            Gateway Cluster: <span className="text-emerald-400 font-bold">MH-CENTRAL-SETU-01</span> (ISO 27001 Certified)
          </div>
        </div>
      </div>

      {/* Main Footer Links & Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 text-white font-bold text-base mb-2">
            <span className="text-amber-400">Gov</span>Connect | सेतु<span className="text-emerald-400">Gov</span>
          </div>
          <p className="text-slate-400 leading-relaxed text-xs">
            State-wide digital public infrastructure facilitating real-time, consent-driven, secure data exchange between Government of Maharashtra departments under the National Data Governance Framework.
          </p>
          <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400">
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">v3.4.2</span>
            <span>• Government of Maharashtra</span>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">Integrated Domains</h4>
          <ul className="space-y-1.5 text-slate-400">
            <li className="hover:text-white transition cursor-pointer">• MahaBhulekh 7/12 Land Records</li>
            <li className="hover:text-white transition cursor-pointer">• Transport RTO / Vahan & Sarathi</li>
            <li className="hover:text-white transition cursor-pointer">• Public Health ABDM Clinical EHR</li>
            <li className="hover:text-white transition cursor-pointer">• Police CCTNS & e-Challan</li>
            <li className="hover:text-white transition cursor-pointer">• MahaPDS Food Security Registry</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">Security & Standards</h4>
          <ul className="space-y-1.5 text-slate-400">
            <li className="hover:text-white transition cursor-pointer">• Digital Personal Data Protection Act 2023</li>
            <li className="hover:text-white transition cursor-pointer">• National Data Governance Policy (NDGFP)</li>
            <li className="hover:text-white transition cursor-pointer">• MeitY Interoperability Guidelines</li>
            <li className="hover:text-white transition cursor-pointer">• CERT-In Security Audit Baseline</li>
            <li className="hover:text-white transition cursor-pointer">• DigiLocker Electronic Signature API</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">Help & Nodal Support</h4>
          <p className="text-slate-400 text-xs mb-2">
            Interoperability Helpdesk (For Department Technical Teams & Nodal Officers):
          </p>
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 font-mono text-xs">
            <div className="text-amber-400 font-bold">Toll Free: 1800-233-0244</div>
            <div className="text-slate-300 text-[11px] mt-1">support-setugov@maharashtra.gov.in</div>
            <div className="text-slate-400 text-[10px] mt-0.5">MahaIT Bhavan, Bandra Kurla Complex (BKC), Mumbai</div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#081B33] px-4 sm:px-8 py-3 text-center text-slate-400 text-[11px] border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            © 2026 Government of Maharashtra. Designed & Maintained in collaboration with MahaIT & National Informatics Centre (NIC).
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Terms of API Access</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Hyperlink Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
