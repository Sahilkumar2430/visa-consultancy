import AdminContentManager from './AdminContentManager.jsx';
import { adminTeamApi } from '../../services/adminApi.js';

export default function AdminTeam() {
  return (
    <AdminContentManager
      title="Team Members"
      api={adminTeamApi}
      searchKeys={['name', 'role']}
      emptyMessage="No team members yet."
      columns={[
        {
          key: 'avatar',
          label: '',
          render: (m) =>
            m.avatar ? (
              <img
                src={m.avatar}
                alt={m.name}
                className="w-9 h-9 rounded-full object-cover"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-royal-50 flex items-center justify-center text-xs font-bold text-royal-600">
                {m.name.charAt(0)}
              </div>
            ),
        },
        { key: 'name', label: 'Name' },
        { key: 'role', label: 'Role' },
        {
          key: 'isSample',
          label: 'Sample',
          render: (m) => (m.isSample ? '✓' : '—'),
        },
        {
          key: 'isActive',
          label: 'Active',
          render: (m) => (m.isActive ? '✓' : '—'),
        },
      ]}
      formFields={[
        { name: 'name', label: 'Name', required: true },
        { name: 'role', label: 'Role', required: true },
        { name: 'avatar', label: 'Avatar URL' },
        { name: 'email', label: 'Email' },
        { name: 'linkedin', label: 'LinkedIn URL' },
        { name: 'order', label: 'Order', type: 'number' },
        { name: 'bio', label: 'Short bio', type: 'textarea', colSpan: 2 },
        { name: 'isSample', label: 'Mark as sample', type: 'boolean' },
        { name: 'isActive', label: 'Active', type: 'boolean' },
      ]}
    />
  );
}