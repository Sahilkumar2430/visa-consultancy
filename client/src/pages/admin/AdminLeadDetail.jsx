import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, Phone, Mail, MapPin, Briefcase, GraduationCap,
  Calendar, StickyNote, User, Send, Trash2,
} from 'lucide-react';
import Button from '../../components/ui/Button.jsx';
import Modal from '../../components/ui/Modal.jsx';
import Input, { Select, Textarea } from '../../components/ui/Input.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import {
  adminGetLead, adminUpdateLead, adminAddLeadNote, adminDeleteLead,
} from '../../services/adminApi.js';
import { LEAD_STATUSES } from '../../utils/constants.js';

export default function AdminLeadDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const load = () => {
    setLoading(true);
    adminGetLead(id)
      .then(setLead)
      .catch(() => toast.error('Lead not found'))
      .finally(() => setLoading(false));
  };

  useEffect(load, [id]); // eslint-disable-line

  const updateField = async (patch) => {
    setSaving(true);
    try {
      const updated = await adminUpdateLead(id, patch);
      setLead(updated);
      toast.success('Updated');
    } catch (err) {
      toast.error(err?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  const addNote = async () => {
    if (!note.trim()) return;
    try {
      const updated = await adminAddLeadNote(id, note.trim());
      setLead(updated);
      setNote('');
      toast.success('Note added');
    } catch (err) {
      toast.error(err?.message || 'Could not add note');
    }
  };

  const remove = async () => {
    try {
      await adminDeleteLead(id);
      toast.success('Lead deleted');
      navigate('/admin/leads');
    } catch (err) {
      toast.error(err?.message || 'Delete failed');
    }
  };

  if (loading) {
    return <div className="skeleton h-96 rounded-3xl" />;
  }

  if (!lead) {
    return (
      <div className="text-center py-20">
        <p className="text-navy-400">Lead not found.</p>
        <Link
          to="/admin/leads"
          className="mt-4 inline-block text-royal-600 font-semibold"
        >
          ← Back to leads
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/leads"
            className="p-2 rounded-lg hover:bg-navy-50 transition-colors"
            aria-label="Back"
          >
            <ArrowLeft className="w-4 h-4 text-navy-700" />
          </Link>
          <div>
            <h1 className="font-display text-2xl font-bold text-navy-900">
              {lead.name}
            </h1>
            <p className="text-sm text-navy-400 mt-0.5">
              Created {new Date(lead.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            icon={Trash2}
            onClick={() => setConfirmDelete(true)}
          >
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact card */}
          <div className="rounded-3xl bg-white border border-navy-100 p-6">
            <h2 className="font-display font-bold text-navy-900 mb-5">
              Client Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <InfoRow icon={Mail} label="Email" value={lead.email} />
              <InfoRow icon={Phone} label="Phone" value={lead.phone} />
              <InfoRow
                icon={User}
                label="Preferred contact"
                value={lead.preferredContactMethod || '—'}
              />
              <InfoRow
                icon={MapPin}
                label="Current country"
                value={lead.currentCountry || '—'}
              />
              <InfoRow
                icon={MapPin}
                label="Destination"
                value={lead.preferredDestination || '—'}
              />
              <InfoRow
                icon={Briefcase}
                label="Visa type"
                value={lead.visaType || '—'}
              />
              <InfoRow
                icon={GraduationCap}
                label="Education"
                value={lead.education || '—'}
              />
              <InfoRow
                icon={Briefcase}
                label="Experience"
                value={lead.workExperience || '—'}
              />
              {lead.budget && (
                <InfoRow icon={Briefcase} label="Budget" value={lead.budget} />
              )}
              {lead.preferredIntake && (
                <InfoRow
                  icon={Calendar}
                  label="Preferred intake"
                  value={lead.preferredIntake}
                />
              )}
              {lead.goal && (
                <InfoRow icon={User} label="Goal" value={lead.goal} />
              )}
              {lead.source && (
                <InfoRow icon={User} label="Source" value={lead.source} />
              )}
            </div>

            {lead.message && (
              <div className="mt-6 pt-6 border-t border-navy-100">
                <p className="text-xs font-bold uppercase tracking-wider text-navy-400 mb-2">
                  Message
                </p>
                <p className="text-sm text-navy-700 leading-relaxed whitespace-pre-line">
                  {lead.message}
                </p>
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="rounded-3xl bg-white border border-navy-100 p-6">
            <h2 className="font-display font-bold text-navy-900 mb-5 flex items-center gap-2">
              <StickyNote className="w-4 h-4 text-royal-600" />
              Notes ({lead.notes?.length || 0})
            </h2>

            {lead.notes?.length ? (
              <div className="space-y-3 mb-5">
                {lead.notes.map((n, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-cream-50 border border-navy-100"
                  >
                    <p className="text-sm text-navy-700 leading-relaxed whitespace-pre-line">
                      {n.text}
                    </p>
                    <p className="mt-2 text-[0.7rem] text-navy-400">
                      {n.by || 'Admin'} · {new Date(n.at).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-navy-400 mb-5">No notes yet.</p>
            )}

            <Textarea
              label="Add a note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Log a call, update, or follow-up action…"
            />
            <Button
              onClick={addNote}
              variant="accent"
              icon={Send}
              className="mt-3"
              disabled={!note.trim()}
            >
              Add Note
            </Button>
          </div>
        </div>

        {/* Right: Status */}
        <div className="space-y-6">
          <div className="rounded-3xl bg-white border border-navy-100 p-6 space-y-5">
            <h2 className="font-display font-bold text-navy-900">Status</h2>
            <Select
              label="Current status"
              value={lead.status}
              onChange={(e) => updateField({ status: e.target.value })}
              disabled={saving}
            >
              {LEAD_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
            <Select
              label="Priority"
              value={lead.priority || 'normal'}
              onChange={(e) => updateField({ priority: e.target.value })}
              disabled={saving}
            >
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
            </Select>
          </div>

          <div className="rounded-3xl bg-white border border-navy-100 p-6">
            <h2 className="font-display font-bold text-navy-900 mb-4">Timeline</h2>
            <div className="space-y-3 text-xs">
              <TimelineRow label="Created" date={lead.createdAt} />
              <TimelineRow label="Updated" date={lead.updatedAt} />
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        title="Delete this lead?"
      >
        <p className="text-sm text-navy-500">
          This action cannot be undone. The lead and all its notes will be permanently
          removed.
        </p>
        <div className="mt-6 flex gap-3 justify-end">
          <Button variant="secondary" onClick={() => setConfirmDelete(false)}>
            Cancel
          </Button>
          <Button
            className="bg-red-500 hover:bg-red-600 text-white"
            onClick={remove}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-lg bg-cream-100 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-navy-500" />
      </div>
      <div className="min-w-0">
        <p className="text-[0.7rem] font-bold uppercase tracking-wider text-navy-400">
          {label}
        </p>
        <p className="text-sm text-navy-800 font-medium mt-0.5 break-words">
          {value}
        </p>
      </div>
    </div>
  );
}

function TimelineRow({ label, date }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-navy-400">{label}</span>
      <span className="text-navy-700 font-semibold">
        {date ? new Date(date).toLocaleString() : '—'}
      </span>
    </div>
  );
}