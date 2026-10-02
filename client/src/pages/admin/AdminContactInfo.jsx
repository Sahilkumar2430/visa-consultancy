import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import Input from '../../components/ui/Input.jsx';
import Button from '../../components/ui/Button.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import {
  adminGetContactInfo,
  adminUpdateContactInfo,
} from '../../services/adminApi.js';

export default function AdminContactInfo() {
  const toast = useToast();
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    adminGetContactInfo().then(setForm);
  }, []);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const setSocial = (k, v) =>
    setForm((f) => ({ ...f, socials: { ...(f.socials || {}), [k]: v } }));

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await adminUpdateContactInfo(form);
      toast.success('Contact info saved');
    } catch (err) {
      toast.error(err?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (!form) return <div className="skeleton h-96 rounded-3xl" />;

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-display text-2xl font-bold text-navy-900">
          Contact Information
        </h1>
        <p className="text-sm text-navy-500 mt-1">
          Displayed in the footer and on the contact page.
        </p>
      </div>

      <form onSubmit={save} className="space-y-6">
        <div className="rounded-3xl bg-white border border-navy-100 p-6 space-y-5">
          <h2 className="font-display font-bold text-navy-900">Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              label="Phone"
              value={form.phone || ''}
              onChange={(e) => set('phone', e.target.value)}
            />
            <Input
              label="WhatsApp"
              value={form.whatsapp || ''}
              onChange={(e) => set('whatsapp', e.target.value)}
            />
            <Input
              label="Email"
              type="email"
              value={form.email || ''}
              onChange={(e) => set('email', e.target.value)}
            />
            <Input
              label="Business Hours"
              value={form.businessHours || ''}
              onChange={(e) => set('businessHours', e.target.value)}
            />
          </div>
          <Input
            label="Office Address"
            value={form.officeAddress || ''}
            onChange={(e) => set('officeAddress', e.target.value)}
          />
        </div>

        <div className="rounded-3xl bg-white border border-navy-100 p-6 space-y-5">
          <h2 className="font-display font-bold text-navy-900">Socials</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {['instagram', 'facebook', 'linkedin', 'youtube'].map((s) => (
              <Input
                key={s}
                label={s.charAt(0).toUpperCase() + s.slice(1)}
                value={form.socials?.[s] || ''}
                onChange={(e) => setSocial(s, e.target.value)}
                placeholder={`https://${s}.com/…`}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" variant="accent" icon={Save} loading={saving}>
            {saving ? 'Saving…' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}