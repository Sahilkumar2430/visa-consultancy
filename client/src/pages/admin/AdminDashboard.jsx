import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from 'recharts';
import { Users, TrendingUp, Inbox, CheckCircle2 } from 'lucide-react';
import { adminGetLeadStats, adminGetLeads } from '../../services/adminApi.js';

const COLORS = ['#2563eb', '#14b8a6', '#3b82f6', '#0d9488', '#1d4ed8', '#f59e0b', '#ef4444', '#8b5cf6'];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([adminGetLeadStats(), adminGetLeads({ limit: 5 })])
      .then(([s, leadsResp]) => {
        setStats(s);
        setRecent(leadsResp.data || []);
      })
      .finally(() => setLoading(false));
  }, []);

  const monthData = (stats?.byMonth || []).map((m) => ({
    name: `${MONTHS[m._id.m - 1]} ${String(m._id.y).slice(2)}`,
    count: m.count,
  }));

  const countryData = (stats?.byCountry || []).map((c) => ({
    name: c._id,
    value: c.count,
  }));

  const visaTypeData = (stats?.byVisaType || []).map((v) => ({
    name: v._id || 'Unspecified',
    value: v.count,
  }));

  const statusData = (stats?.byStatus || []).map((s) => ({
    name: s._id,
    value: s.count,
  }));

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton h-32 rounded-3xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-navy-900">Dashboard</h1>
        <p className="text-sm text-navy-500 mt-1">
          Overview of leads, applications and content.
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KpiCard
          icon={Inbox}
          label="Total Leads"
          value={stats?.total || 0}
          accent="royal"
        />
        <KpiCard
          icon={Users}
          label="New Leads"
          value={stats?.newCount || 0}
          accent="teal"
        />
        <KpiCard
          icon={TrendingUp}
          label="Countries (in stats)"
          value={countryData.length}
          accent="royal"
        />
        <KpiCard
          icon={CheckCircle2}
          label="Visa Types"
          value={visaTypeData.length}
          accent="teal"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ChartCard title="Leads per Month">
          {monthData.length ? (
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={monthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" fontSize={11} stroke="#64748b" />
                <YAxis fontSize={11} stroke="#64748b" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#2563eb"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <ChartEmpty />
          )}
        </ChartCard>

        <ChartCard title="Leads by Country">
          {countryData.length ? (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={countryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" fontSize={11} stroke="#64748b" />
                <YAxis fontSize={11} stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="value" fill="#14b8a6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <ChartEmpty />
          )}
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ChartCard title="Leads by Visa Type">
          {visaTypeData.length ? (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={visaTypeData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {visaTypeData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <ChartEmpty />
          )}
        </ChartCard>

        <ChartCard title="Leads by Status">
          {statusData.length ? (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={statusData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" fontSize={11} stroke="#64748b" />
                <YAxis
                  type="category"
                  dataKey="name"
                  fontSize={11}
                  stroke="#64748b"
                  width={120}
                />
                <Tooltip />
                <Bar dataKey="value" fill="#2563eb" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <ChartEmpty />
          )}
        </ChartCard>
      </div>

      {/* Recent leads */}
      <div className="rounded-3xl bg-white border border-navy-100 overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-navy-100">
          <h3 className="font-display font-bold text-navy-900">Recent Leads</h3>
          <Link
            to="/admin/leads"
            className="text-xs font-semibold text-royal-600 hover:text-royal-700"
          >
            View all →
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="p-6 text-sm text-navy-400">No leads yet.</p>
        ) : (
          <div className="divide-y divide-navy-100">
            {recent.map((l) => (
              <Link
                key={l._id}
                to={`/admin/leads/${l._id}`}
                className="flex items-center gap-4 p-4 hover:bg-cream-50 transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-royal-50 flex items-center justify-center font-bold text-royal-600 text-sm shrink-0">
                  {l.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-navy-900 truncate">
                    {l.name}
                  </p>
                  <p className="text-xs text-navy-400 truncate">
                    {l.email} · {l.preferredDestination || 'No destination'}
                  </p>
                </div>
                <span className="text-[0.7rem] font-semibold px-2.5 py-1 rounded-full bg-royal-50 text-royal-700 shrink-0">
                  {l.status}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function KpiCard({ icon: Icon, label, value, accent = 'royal' }) {
  const tone =
    accent === 'teal'
      ? 'bg-teal-50 text-teal-600'
      : 'bg-royal-50 text-royal-600';
  return (
    <div className="rounded-3xl bg-white border border-navy-100 p-5">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tone}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-medium text-navy-400 uppercase tracking-wider">
            {label}
          </p>
          <p className="font-display text-2xl font-extrabold text-navy-900 leading-none mt-1">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
        </div>
      </div>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="rounded-3xl bg-white border border-navy-100 p-5">
      <h3 className="font-display font-bold text-navy-900 mb-4">{title}</h3>
      {children}
    </div>
  );
}

function ChartEmpty() {
  return (
    <div className="h-[260px] flex items-center justify-center text-sm text-navy-400">
      No data yet
    </div>
  );
}