import AdminContentManager from './AdminContentManager.jsx';
import { adminTestimonialsApi } from '../../services/adminApi.js';

export default function AdminTestimonials() {
  return (
    <AdminContentManager
      title="Testimonials"
      api={adminTestimonialsApi}
      searchKeys={['name', 'country', 'visaType', 'content']}
      emptyMessage="No testimonials yet."
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'country', label: 'Country' },
        { key: 'visaType', label: 'Visa Type' },
        {
          key: 'rating',
          label: 'Rating',
          render: (t) => '★'.repeat(t.rating || 0),
        },
        {
          key: 'isSample',
          label: 'Sample',
          render: (t) =>
            t.isSample ? (
              <span className="text-[0.7rem] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                Sample
              </span>
            ) : (
              '—'
            ),
        },
        {
          key: 'isApproved',
          label: 'Approved',
          render: (t) => (t.isApproved ? '✓' : '—'),
        },
      ]}
      formFields={[
        { name: 'name', label: 'Client Name', required: true },
        { name: 'country', label: 'Country' },
        { name: 'visaType', label: 'Visa Type' },
        {
          name: 'rating',
          label: 'Rating (1-5)',
          type: 'number',
        },
        { name: 'avatar', label: 'Avatar URL', colSpan: 2 },
        { name: 'content', label: 'Testimonial', type: 'textarea', required: true, colSpan: 2 },
        { name: 'order', label: 'Order', type: 'number' },
        { name: 'isSample', label: 'Mark as sample', type: 'boolean' },
        { name: 'isApproved', label: 'Approved for public display', type: 'boolean' },
      ]}
    />
  );
}