// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'obi',
    title: 'OBI',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'WTQ1',
            type: 'item',
            url: '/wtq1',
            icon: icons.IconDashboard,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
