import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Eye, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../../components/ui/Button.jsx';
import Modal from '../../components/ui/Modal.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { adminGetLeads, adminDeleteLead } from '../../services/adminApi.js';
import { LEAD_STATUSES } from '../../utils/constants.js';

const STATUS_STYLES = {
  New: 'bg-royal-50 text-royal-700',
  Contacted: 'bg-amber-50 text-amber-700',
  'In Discussion': 'bg-purple-50 text-purple-700',
  'Documents Pending': 'bg-orange-50 text-orange-700',
  'Application In Progress': 'bg-teal-50 text-teal-700',
  Completed: 'bg-emerald-50 text-emerald-700',
  Closed: 'bg-navy-100 text-navy-600',
};

export default function AdminLeads() {
  const toast = useToast();
  const [leads, setLeads] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const load = () => {
    setLoading(true);
    adminGetLeads({
      q: query || undefined,
      status: status || undefined,
      page,
      limit: 15,
    })
      .then((res) => {
        setLeads(res.data || []);
        setPagination(res.pagination || { page: 1, pages: 1, total: 0 });
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const t = setTimeout(load, 250);
    return () => clearTimeout(t);
  }, [query, status, page]); // eslint-disable-line

  const handleDelete = async () => {
    if (!confirmDelete) return;
    try {
      await adminDeleteLead(confirmDelete._id);
      toast.success('Lead deleted');
      setConfirmDelete(null);
      load();
    } catch (err) {
      toast.error(err?.message || 'Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy-900">Leads</h1>
          <p className="text-sm text-navy-500 mt-1">
            {pagination.total} total enquiries
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search by name, email or phone…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-navy-200 bg-white text-sm focus:border-royal-500 focus:ring-2 focus:ring-royal-100 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-navy-400 shrink-0" />
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="px-4 py-2.5 rounded-xl border border-navy-200 bg-white text-sm font-medium focus:border-royal-500 focus:ring-2 focus:ring-royal-100"
          >
            <option value="">All statuses</option>
            {LEAD_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-3xl bg-white border border-navy-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-cream-50 border-b border-navy-100">
              <tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>Destination</Th>
                <Th>Visa Type</Th>
                <Th>Status</Th>
                <Th>Created</Th>
                <Th align="right">Actions</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={8} className="p-4">
                      <div className="skeleton h-5 w-full" />
                    </td>
                  </tr>
                ))
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-10 text-center text-navy-400">
                    No leads found
                  </td>
                </tr>
              ) : (
                leads.map((l) => (
                  <tr key={l._id} className="hover:bg-cream-50/60 transition-colors">
                    <Td className="font-semibold text-navy-900">{l.name}</Td>
                    <Td className="text-navy-500">{l.email}</Td>
                    <Td className="text-navy-500">{l.phone}</Td>
                    <Td className="text-navy-500">{l.preferredDestination || '—'}</Td>
                    <Td className="text-navy-500">{l.visaType || '—'}</Td>
                    <Td>
                      <span
                        className={`inline-block text-[0.7rem] font-semibold px-2.5 py-1 rounded-full ${
                          STATUS_STYLES[l.status] || STATUS_STYLES.New
                        }`}
                      >
                        {l.status}
                      </span>
                    </Td>
                    <Td className="text-navy-400 text-xs">
                      {new Date(l.createdAt).toLocaleDateString()}
                    </Td>
                    <Td align="right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          to={`/admin/leads/${l._id}`}
                          className="p-1.5 rounded-lg text-navy-400 hover:bg-royal-50 hover:text-royal-600 transition-colors"
                          aria-label="View"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setConfirmDelete(l)}
                          className="p-1.5 rounded-lg text-navy-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                          aria-label="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </Td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-navy-100">
            <p className="text-xs text-navy-400">
              Page {pagination.page} of {pagination.pages}
            </p>
            <div className="flex items-center gap-1">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="p-1.5 rounded-lg text-navy-500 disabled:opacity-40 hover:bg-navy-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={page >= pagination.pages}
                onClick={() => setPage((p) => p + 1)}
                className="p-1.5 rounded-lg text-navy-500 disabled:opacity-40 hover:bg-navy-50 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <Modal
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        title="Delete lead?"
      >
        <p className="text-sm text-navy-500">
          Are you sure you want to permanently delete the lead from{' '}
          <strong className="text-navy-800">{confirmDelete?.name}</strong>? This cannot
          be undone.
        </p>
        <div className="mt-6 flex gap-3 justify-end">
          <Button variant="secondary" onClick={() => setConfirmDelete(null)}>
            Cancel
          </Button>
          <Button
            className="bg-red-500 hover:bg-red-600 text-white"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}

function Th({ children, align = 'left' }) {
  return (
    <th
      className={`px-4 py-3 text-[0.7rem] font-bold uppercase tracking-wider text-navy-400 text-${align}`}
    >
      {children}
    </th>
  );
}

function Td({ children, align = 'left', className = '' }) {
  return (
    <td className={`px-4 py-3 text-${align} ${className}`}>{children}</td>
  );
}