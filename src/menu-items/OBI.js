// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'obi',
    title: 'OBI',
    type: 'group',
    children: [{
        id: 'default',
        title: 'WTQ1',
        type: 'item',
        url: '/wtq1',
        icon: icons.IconDashboard,
        breadcrumbs: false
    }, {
        title: 'OBCD',
        id:'obcd',
        type: 'collapse',
        icon: icons.IconDashboard,
        children:[{
            id: 'obcdList',
            title: 'List',
            type: 'item',
            url: '/obcd-list',
            breadcrumbs: false,
            children:[]
        }, {
            id: 'obcdAdd',
            title: 'ADD',
            type: 'item',
            url: '/obcd-add',
            breadcrumbs: false,
            children:[]
        }]
    }]
};

export default dashboard;
