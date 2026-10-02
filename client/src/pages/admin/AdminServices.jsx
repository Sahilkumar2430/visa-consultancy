import AdminContentManager from './AdminContentManager.jsx';
import { adminServicesApi } from '../../services/adminApi.js';

export default function AdminServices() {
  return (
    <AdminContentManager
      title="Services"
      api={adminServicesApi}
      searchKeys={['title', 'slug']}
      emptyMessage="No services yet."
      columns={[
        {
          key: 'title',
          label: 'Title',
          render: (s) => (
            <div>
              <p className="font-semibold text-navy-900">{s.title}</p>
              <p className="text-xs text-navy-400">/{s.slug}</p>
            </div>
          ),
        },
        { key: 'icon', label: 'Icon' },
        {
          key: 'shortDescription',
          label: 'Description',
          render: (s) => (
            <span className="text-xs text-navy-500 line-clamp-2">
              {s.shortDescription}
            </span>
          ),
        },
        { key: 'order', label: 'Order' },
        {
          key: 'isActive',
          label: 'Active',
          render: (s) => (s.isActive ? '✓' : '—'),
        },
      ]}
      formFields={[
        { name: 'title', label: 'Title', required: true },
        { name: 'slug', label: 'Slug', required: true, placeholder: 'study-visa' },
        {
          name: 'icon',
          label: 'Lucide icon name',
          placeholder: 'GraduationCap',
        },
        { name: 'order', label: 'Order', type: 'number' },
        {
          name: 'shortDescription',
          label: 'Short description',
          type: 'textarea',
          colSpan: 2,
          required: true,
        },
        { name: 'longDescription', label: 'Long description', type: 'textarea', colSpan: 2 },
        { name: 'who', label: 'Who it’s for (one per line)', type: 'array', colSpan: 2 },
        { name: 'process', label: 'Process steps (one per line)', type: 'array', colSpan: 2 },
        { name: 'documents', label: 'Documents (one per line)', type: 'array', colSpan: 2 },
        { name: 'benefits', label: 'Benefits (one per line)', type: 'array', colSpan: 2 },
        { name: 'isActive', label: 'Active', type: 'boolean' },
      ]}
    />
  );
}