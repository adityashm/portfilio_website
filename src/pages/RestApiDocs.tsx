import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Send, CheckCircle2, ShieldCheck, Database, Key, Terminal, ExternalLink } from 'lucide-react';
import Layout from '../components/Layout';
import SectionReveal from '../components/animations/SectionReveal';
import TiltCard from '../components/animations/TiltCard';

interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  authRequired: boolean;
  sampleResponse: Record<string, unknown>;
  status: number;
}

const ENDPOINTS: ApiEndpoint[] = [
  {
    method: 'POST',
    path: '/api/v1/auth/login',
    description: 'Authenticate user with OAuth2/JWT Bearer token and return session credentials.',
    authRequired: false,
    status: 200,
    sampleResponse: {
      access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZGl0eWFAZXhhbXBsZS5jb20iLCJleHAiOjE3MjkzODUyMDB9...',
      token_type: 'bearer',
      expires_in: 3600,
      user: { id: 101, username: 'adityashm', role: 'admin' },
    },
  },
  {
    method: 'GET',
    path: '/api/v1/users/me',
    description: 'Retrieve profile details of the currently authenticated JWT bearer user.',
    authRequired: true,
    status: 200,
    sampleResponse: {
      id: 101,
      email: 'aditya.sharma@space-lab.in',
      full_name: 'Aditya Sharma',
      is_active: true,
      roles: ['engineer', 'admin'],
      created_at: '2025-06-01T10:00:00Z',
    },
  },
  {
    method: 'GET',
    path: '/api/v1/products',
    description: 'List paginated inventory items from PostgreSQL/SQLAlchemy engine with category filters.',
    authRequired: false,
    status: 200,
    sampleResponse: {
      total: 142,
      page: 1,
      limit: 10,
      items: [
        { id: 1, name: 'Autonomous UAV Drone Module', sku: 'UAV-009', price: 1250.0, stock: 15 },
        { id: 2, name: 'CubeSat Telemetry Transmitter', sku: 'SAT-004', price: 4200.0, stock: 4 },
        { id: 3, name: 'Linux Performance Watchdog Server', sku: 'SRV-022', price: 899.99, stock: 42 },
      ],
    },
  },
  {
    method: 'POST',
    path: '/api/v1/orders',
    description: 'Create a new transactional order with SQL ACID compliance and background invoice dispatch.',
    authRequired: true,
    status: 201,
    sampleResponse: {
      order_id: 'ORD-2026-8891',
      status: 'CONFIRMED',
      total_amount: 1250.0,
      items_count: 1,
      processed_at: '2026-08-03T14:15:00Z',
    },
  },
];

export default function RestApiDocs() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint>(ENDPOINTS[0]);
  const [isSending, setIsSending] = useState(false);
  const [responsePayload, setResponsePayload] = useState<Record<string, unknown> | null>(selectedEndpoint.sampleResponse);
  const [responseStatus, setResponseStatus] = useState<number | null>(selectedEndpoint.status);
  const [bearerToken, setBearerToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');

  const handleSelectEndpoint = (ep: ApiEndpoint) => {
    setSelectedEndpoint(ep);
    setResponsePayload(ep.sampleResponse);
    setResponseStatus(ep.status);
  };

  const handleSendRequest = () => {
    setIsSending(true);
    setResponsePayload(null);
    setResponseStatus(null);
    setTimeout(() => {
      setResponsePayload(selectedEndpoint.sampleResponse);
      setResponseStatus(selectedEndpoint.status);
      setIsSending(false);
    }, 450);
  };

  return (
    <Layout>
      <Helmet>
        <title>REST API Backend with Authentication | Aditya Sharma</title>
        <meta
          name="description"
          content="Interactive Swagger-style API documentation and sandbox for FastAPI, SQLAlchemy, JWT Authentication, and Pydantic validation."
        />
      </Helmet>

      <div className="py-24 container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Header Section */}
        <SectionReveal>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-cyan-400 block mb-2">
                PROJECT DEMO • REST API BACKEND
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 tracking-tight">
                REST API Backend with Authentication
              </h1>
              <p className="text-slate-400 mt-2 max-w-2xl text-sm md:text-base">
                Enterprise-grade REST API with JWT Bearer authentication, SQLAlchemy ORM, Pydantic schemas, and OpenAPI 3.0 documentation.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://github.com/adityashm/rest-api-backend"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 min-h-[44px] bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl font-bold transition-all text-sm shadow-[0_0_20px_rgba(0,240,255,0.3)] active:scale-95"
              >
                <span>View Source Code</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </SectionReveal>

        {/* Architecture Overview Cards */}
        <SectionReveal delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <TiltCard glowColor="cyan" className="p-6 border border-white/10 bg-slate-900/60 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-400">Framework</span>
                <Terminal size={20} className="text-cyan-400" />
              </div>
              <div className="text-3xl font-extrabold text-white mb-1">FastAPI 0.110</div>
              <div className="flex items-center gap-1 text-xs text-cyan-400">
                <span>Asynchronous ASGI server</span>
              </div>
            </TiltCard>

            <TiltCard glowColor="violet" className="p-6 border border-white/10 bg-slate-900/60 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-400">Auth Security</span>
                <Key size={20} className="text-violet-400" />
              </div>
              <div className="text-3xl font-extrabold text-white mb-1">JWT Bearer</div>
              <div className="flex items-center gap-1 text-xs text-emerald-400">
                <ShieldCheck size={14} />
                <span>OAuth2 Password Flow</span>
              </div>
            </TiltCard>

            <TiltCard glowColor="cyan" className="p-6 border border-white/10 bg-slate-900/60 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-400">ORM & Database</span>
                <Database size={20} className="text-cyan-400" />
              </div>
              <div className="text-2xl font-extrabold text-white mb-1">SQLAlchemy 2.0</div>
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <span>PostgreSQL / SQLite engines</span>
              </div>
            </TiltCard>

            <TiltCard glowColor="cyan" className="p-6 border border-white/10 bg-slate-900/60 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-400">Validation</span>
                <CheckCircle2 size={20} className="text-emerald-400" />
              </div>
              <div className="text-2xl font-extrabold text-white mb-1">Pydantic v2</div>
              <div className="flex items-center gap-1 text-xs text-emerald-400">
                <span>Strict type serialization</span>
              </div>
            </TiltCard>
          </div>
        </SectionReveal>

        {/* Interactive API Sandbox Studio */}
        <SectionReveal delay={0.2}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            {/* Endpoint Selector Sidebar */}
            <div className="lg:col-span-4 space-y-3">
              <h3 className="text-sm font-semibold tracking-wider uppercase text-slate-400 mb-4">
                Available Endpoints
              </h3>
              {ENDPOINTS.map((ep) => (
                <button
                  key={ep.path}
                  onClick={() => handleSelectEndpoint(ep)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    selectedEndpoint.path === ep.path
                      ? 'bg-slate-800/90 border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.15)]'
                      : 'bg-slate-900/50 border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold ${
                        ep.method === 'GET'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      }`}
                    >
                      {ep.method}
                    </span>
                    <span className="font-mono text-sm font-bold text-white truncate">{ep.path}</span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2">{ep.description}</p>
                </button>
              ))}

              {/* JWT Bearer Configuration Box */}
              <div className="p-4 rounded-2xl border border-white/10 bg-slate-950/80 mt-6">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Active Bearer Token
                </label>
                <input
                  type="text"
                  value={bearerToken}
                  onChange={(e) => setBearerToken(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-white/10 rounded-lg text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-400"
                />
                <span className="text-[10px] text-slate-500 block mt-2">
                  Used automatically for authenticated routes (`authRequired: true`)
                </span>
              </div>
            </div>

            {/* Request & Response Tester Studio */}
            <div className="lg:col-span-8 p-6 md:p-8 rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-md flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between pb-6 mb-6 border-b border-white/10 gap-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-lg text-sm font-mono font-bold ${
                        selectedEndpoint.method === 'GET'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      }`}
                    >
                      {selectedEndpoint.method}
                    </span>
                    <h2 className="text-lg md:text-xl font-mono font-bold text-white">{selectedEndpoint.path}</h2>
                  </div>

                  <button
                    onClick={handleSendRequest}
                    disabled={isSending}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-sm font-bold shadow-[0_0_15px_rgba(0,240,255,0.3)] active:scale-95 transition-all"
                  >
                    <Send size={15} />
                    <span>{isSending ? 'Sending Request...' : 'Send API Request'}</span>
                  </button>
                </div>

                <div className="mb-6">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Description</h4>
                  <p className="text-sm text-slate-300">{selectedEndpoint.description}</p>
                </div>

                {/* HTTP Headers Preview */}
                <div className="mb-6 p-4 rounded-xl bg-slate-950/70 border border-white/5 text-xs font-mono">
                  <div className="text-slate-500 mb-1">// HTTP Headers</div>
                  <div className="text-slate-300">
                    Accept: <span className="text-cyan-400">application/json</span>
                  </div>
                  {selectedEndpoint.authRequired && (
                    <div className="text-slate-300">
                      Authorization: <span className="text-violet-400">Bearer {bearerToken.slice(0, 32)}...</span>
                    </div>
                  )}
                </div>

                {/* Response Payload Box */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Simulated Response Payload
                    </h4>
                    {responseStatus && (
                      <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {responseStatus} OK
                      </span>
                    )}
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-white/10 font-mono text-xs md:text-sm text-cyan-300 overflow-x-auto max-h-72">
                    {isSending ? (
                      <div className="text-slate-500 py-6 text-center animate-pulse">
                        // Awaiting ASGI worker response...
                      </div>
                    ) : (
                      <pre>{JSON.stringify(responsePayload, null, 2)}</pre>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 text-xs text-slate-500 flex items-center justify-between">
                <span>OpenAPI 3.0.3 Specification</span>
                <span>Response latency: ~14ms</span>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </Layout>
  );
}
