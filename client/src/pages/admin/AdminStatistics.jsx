import AdminContentManager from './AdminContentManager.jsx';
import { adminStatisticsApi } from '../../services/adminApi.js';

export default function AdminStatistics() {
  return (
    <AdminContentManager
      title="Website Statistics"
      api={adminStatisticsApi}
      searchKeys={['label', 'key']}
      emptyMessage="No statistics yet."
      columns={[
        { key: 'label', label: 'Label' },
        { key: 'key', label: 'Key' },
        {
          key: 'value',
          label: 'Value',
          render: (s) => `${s.value}${s.suffix || ''}`,
        },
        { key: 'icon', label: 'Icon' },
        { key: 'order', label: 'Order' },
      ]}
      formFields={[
        { name: 'key', label: 'Key (unique)', required: true, placeholder: 'clients' },
        { name: 'label', label: 'Label', required: true },
        { name: 'value', label: 'Value', type: 'number', required: true },
        { name: 'suffix', label: 'Suffix', placeholder: '+' },
        { name: 'icon', label: 'Lucide icon name', placeholder: 'Users' },
        { name: 'order', label: 'Order', type: 'number' },
      ]}
    />
  );
}