import AdminContentManager from './AdminContentManager.jsx';
import { adminCountriesApi } from '../../services/adminApi.js';

export default function AdminCountries() {
  return (
    <AdminContentManager
      title="Countries"
      api={adminCountriesApi}
      searchKeys={['name', 'slug', 'region']}
      emptyMessage="No countries yet. Add one or run the seed script."
      columns={[
        {
          key: 'flag',
          label: '',
          render: (c) => <span className="text-xl">{c.flag || '🏳️'}</span>,
        },
        {
          key: 'name',
          label: 'Name',
          render: (c) => (
            <div>
              <p className="font-semibold text-navy-900">{c.name}</p>
              <p className="text-xs text-navy-400">/{c.slug}</p>
            </div>
          ),
        },
        { key: 'region', label: 'Region' },
        {
          key: 'visaTypes',
          label: 'Visa Types',
          render: (c) => (c.visaTypes || []).slice(0, 2).join(', ') || '—',
        },
        {
          key: 'isFeatured',
          label: 'Featured',
          render: (c) => (c.isFeatured ? '✓' : '—'),
        },
        {
          key: 'isActive',
          label: 'Active',
          render: (c) =>
            c.isActive ? (
              <span className="text-emerald-600">Active</span>
            ) : (
              <span className="text-navy-300">Off</span>
            ),
        },
      ]}
      formFields={[
        { name: 'name', label: 'Country Name', required: true },
        { name: 'slug', label: 'Slug', required: true, placeholder: 'canada' },
        { name: 'flag', label: 'Flag emoji', placeholder: '🇨🇦' },
        {
          name: 'heroImage',
          label: 'Hero Image URL',
          colSpan: 2,
          placeholder: 'https://…',
        },
        {
          name: 'description',
          label: 'Short Description',
          type: 'textarea',
          colSpan: 2,
        },
        {
          name: 'visaTypes',
          label: 'Visa Types (one per line)',
          type: 'array',
          colSpan: 2,
          placeholder: 'Study Visa\nWork Permit\nPR Guidance',
        },
        {
          name: 'requirements',
          label: 'Requirements (one per line)',
          type: 'array',
          colSpan: 2,
        },
        { name: 'process', label: 'Process steps (one per line)', type: 'array', colSpan: 2 },
        { name: 'region', label: 'Region' },
        { name: 'capital', label: 'Capital' },
        { name: 'isFeatured', label: 'Featured on homepage', type: 'boolean' },
        { name: 'isActive', label: 'Active (visible on site)', type: 'boolean' },
      ]}
    />
  );
}