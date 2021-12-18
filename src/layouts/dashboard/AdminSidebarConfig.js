import { Icon } from '@iconify/react';
import peopleFill from '@iconify/icons-eva/people-fill';
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const adminSidebarConfig = [
  {
    title: 'managers',
    path: '/dashboard/managers',
    icon: getIcon(peopleFill)
  }
];

export default adminSidebarConfig;
