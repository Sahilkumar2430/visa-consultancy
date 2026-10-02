import AdminContentManager from './AdminContentManager.jsx';
import { adminFaqsApi } from '../../services/adminApi.js';

export default function AdminFaqs() {
  return (
    <AdminContentManager
      title="FAQs"
      api={adminFaqsApi}
      searchKeys={['question', 'answer', 'category']}
      emptyMessage="No FAQs yet."
      columns={[
        {
          key: 'question',
          label: 'Question',
          render: (f) => (
            <span className="font-semibold text-navy-900">{f.question}</span>
          ),
        },
        {
          key: 'answer',
          label: 'Answer',
          render: (f) => (
            <span className="text-xs text-navy-500 line-clamp-2">
              {f.answer}
            </span>
          ),
        },
        { key: 'category', label: 'Category' },
        { key: 'order', label: 'Order' },
        {
          key: 'isActive',
          label: 'Active',
          render: (f) => (f.isActive ? '✓' : '—'),
        },
      ]}
      formFields={[
        { name: 'question', label: 'Question', required: true, colSpan: 2 },
        { name: 'answer', label: 'Answer', type: 'textarea', required: true, colSpan: 2 },
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          options: ['general', 'process', 'documents', 'country', 'fees'],
        },
        { name: 'order', label: 'Order', type: 'number' },
        { name: 'isActive', label: 'Active', type: 'boolean' },
      ]}
    />
  );
}