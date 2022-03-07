import { Icon } from '@iconify/react';
import peopleFill from '@iconify/icons-eva/people-fill';
import listFill from '@iconify/icons-eva/list-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const adminSidebarConfig = [
  {
    title: 'Managers',
    path: '/dashboard/store/managers',
    icon: getIcon(peopleFill)
  },
  {
    title: 'Store Requests',
    path: '/dashboard/store/requests',
    icon: getIcon(listFill)
  }
];

export default adminSidebarConfig;
