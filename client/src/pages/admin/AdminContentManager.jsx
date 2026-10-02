import { useEffect, useMemo, useState } from 'react';
import {
  Plus, Pencil, Trash2, Search, X,
} from 'lucide-react';
import Button from '../../components/ui/Button.jsx';
import Modal from '../../components/ui/Modal.jsx';
import Input, { Select, Textarea } from '../../components/ui/Input.jsx';
import { useToast } from '../../context/ToastContext.jsx';

/**
 * Fully generic content manager.
 *
 * Props:
 *   title     — page title
 *   api       — { list, create, update, remove }
 *   columns   — [{ key, label, render? }]
 *   formFields — [{ name, label, type, options?, required?, placeholder?, colSpan? }]
 *   searchKeys — array of keys used for local search
 *   emptyMessage
 */
export default function AdminContentManager({
  title,
  api,
  columns,
  formFields,
  searchKeys = ['name', 'title', 'question'],
  emptyMessage = 'No records yet',
}) {
  const toast = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState(null); // null | item | {}
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    api
      .list()
      .then((data) => setItems(data || []))
      .catch((err) => toast.error(err?.message || 'Could not load'))
      .finally(() => setLoading(false));
  };

  useEffect(load, []); // eslint-disable-line

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) =>
      searchKeys.some((k) =>
        String(item[k] || '').toLowerCase().includes(q)
      )
    );
  }, [items, query, searchKeys]);

  const submit = async (formData) => {
    setSaving(true);
    try {
      if (editing?._id) {
        const updated = await api.update(editing._id, formData);
        setItems((prev) => prev.map((it) => (it._id === updated._id ? updated : it)));
        toast.success('Updated');
      } else {
        const created = await api.create(formData);
        setItems((prev) => [created, ...prev]);
        toast.success('Created');
      }
      setEditing(null);
    } catch (err) {
      toast.error(err?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!confirmDelete) return;
    try {
      await api.remove(confirmDelete._id);
      setItems((prev) => prev.filter((it) => it._id !== confirmDelete._id));
      toast.success('Deleted');
      setConfirmDelete(null);
    } catch (err) {
      toast.error(err?.message || 'Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy-900">{title}</h1>
          <p className="text-sm text-navy-500 mt-1">
            {items.length} {items.length === 1 ? 'record' : 'records'}
          </p>
        </div>
        <Button variant="accent" icon={Plus} onClick={() => setEditing({})}>
          New
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search…"
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-navy-200 bg-white text-sm focus:border-royal-500 focus:ring-2 focus:ring-royal-100 transition-all"
        />
      </div>

      <div className="rounded-3xl bg-white border border-navy-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-cream-50 border-b border-navy-100">
              <tr>
                {columns.map((c) => (
                  <th
                    key={c.key}
                    className="px-4 py-3 text-left text-[0.7rem] font-bold uppercase tracking-wider text-navy-400"
                  >
                    {c.label}
                  </th>
                ))}
                <th className="px-4 py-3 w-24" />
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={columns.length + 1} className="p-4">
                      <div className="skeleton h-5 w-full" />
                    </td>
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="p-10 text-center text-navy-400"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-cream-50/60 transition-colors"
                  >
                    {columns.map((c) => (
                      <td key={c.key} className="px-4 py-3 align-top">
                        {c.render ? c.render(item) : item[c.key] ?? '—'}
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setEditing(item)}
                          className="p-1.5 rounded-lg text-navy-400 hover:bg-royal-50 hover:text-royal-600 transition-colors"
                          aria-label="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setConfirmDelete(item)}
                          className="p-1.5 rounded-lg text-navy-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                          aria-label="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Editor modal */}
      <Modal
        open={editing !== null}
        onClose={() => setEditing(null)}
        title={editing?._id ? 'Edit' : 'Create'}
        size="lg"
      >
        {editing !== null && (
          <ContentForm
            fields={formFields}
            initial={editing}
            saving={saving}
            onCancel={() => setEditing(null)}
            onSubmit={submit}
          />
        )}
      </Modal>

      {/* Delete modal */}
      <Modal
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        title="Delete?"
      >
        <p className="text-sm text-navy-500">
          This will permanently delete the record. Continue?
        </p>
        <div className="mt-6 flex gap-3 justify-end">
          <Button variant="secondary" onClick={() => setConfirmDelete(null)}>
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

function ContentForm({ fields, initial, saving, onCancel, onSubmit }) {
  const [form, setForm] = useState(() => {
    const base = {};
    fields.forEach((f) => {
      const v = initial[f.name];
      if (f.type === 'array') base[f.name] = Array.isArray(v) ? v.join('\n') : '';
      else base[f.name] = v ?? (f.type === 'boolean' ? false : '');
    });
    return base;
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    const payload = {};
    fields.forEach((f) => {
      const v = form[f.name];
      if (f.type === 'array') {
        payload[f.name] = String(v || '')
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean);
      } else if (f.type === 'number') {
        payload[f.name] = v === '' ? undefined : Number(v);
      } else {
        payload[f.name] = v;
      }
    });
    onSubmit(payload);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map((f) => (
          <div
            key={f.name}
            className={f.colSpan === 2 ? 'sm:col-span-2' : ''}
          >
            {f.type === 'textarea' || f.type === 'array' ? (
              <Textarea
                label={f.label}
                required={f.required}
                placeholder={f.placeholder}
                value={form[f.name]}
                onChange={(e) => set(f.name, e.target.value)}
                rows={f.type === 'array' ? 5 : 4}
              />
            ) : f.type === 'boolean' ? (
              <label className="flex items-center gap-3 p-3 rounded-xl border border-navy-100 cursor-pointer hover:bg-cream-50">
                <input
                  type="checkbox"
                  checked={!!form[f.name]}
                  onChange={(e) => set(f.name, e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm font-semibold text-navy-700">
                  {f.label}
                </span>
              </label>
            ) : f.type === 'select' ? (
              <Select
                label={f.label}
                required={f.required}
                value={form[f.name]}
                onChange={(e) => set(f.name, e.target.value)}
              >
                <option value="">—</option>
                {(f.options || []).map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </Select>
            ) : (
              <Input
                label={f.label}
                type={f.type || 'text'}
                required={f.required}
                placeholder={f.placeholder}
                value={form[f.name]}
                onChange={(e) => set(f.name, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-3 justify-end pt-4 border-t border-navy-100">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="accent" loading={saving}>
          {saving ? 'Saving…' : 'Save'}
        </Button>
      </div>
    </form>
  );
}