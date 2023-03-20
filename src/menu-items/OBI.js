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
        title: 'Stok',
        id:'inventory',
        type: 'collapse',
        icon: icons.IconDashboard,
        children:[{
            id: 'inventoryList',
            title: 'List',
            type: 'item',
            url: '/inventory-list',
            breadcrumbs: false,
            children:[]
        }, {
            id: 'inventoryAdd',
            title: 'ADD',
            type: 'item',
            url: '/inventory-add',
            breadcrumbs: false,
            children:[]
        }, {
            id: 'inventorySale',
            title: 'Jual',
            type: 'item',
            url: '/inventory-sale',
            breadcrumbs: false,
            children:[]
        }, {
            id: 'historyList',
            title: 'History',
            type: 'item',
            url: '/history-list',
            breadcrumbs: false,
            children:[]
        }]
    }, {
        title: 'Product',
        id:'product',
        type: 'collapse',
        icon: icons.IconDashboard,
        children:[{
            id: 'productList',
            title: 'List',
            type: 'item',
            url: '/product-list',
            breadcrumbs: false,
            children:[]
        }, {
            id: 'productAdd',
            title: 'ADD',
            type: 'item',
            url: '/product-add',
            breadcrumbs: false,
            children:[]
        }]
    },{
        title: 'Gudang',
        id:'warehouse',
        type: 'collapse',
        icon: icons.IconDashboard,
        children:[{
            id: 'warehouseList',
            title: 'List',
            type: 'item',
            url: '/warehouse-list',
            breadcrumbs: false,
            children:[]
        }, {
            id: 'warehouseAdd',
            title: 'ADD',
            type: 'item',
            url: '/warehouse-add',
            breadcrumbs: false,
            children:[]
        }]
    }, {
        title: 'User',
        id:'user',
        type: 'collapse',
        icon: icons.IconDashboard,
        children:[{
            id: 'userList',
            title: 'List',
            type: 'item',
            url: '/user-list',
            breadcrumbs: false,
            children:[]
        }/*, {
            id: 'userAdd',
            title: 'ADD',
            type: 'item',
            url: '/user-add',
            breadcrumbs: false,
            children:[]
        }*/]
    }, {
        title: 'Roles',
        id:'roles',
        type: 'collapse',
        icon: icons.IconDashboard,
        children:[{
            id: 'rolesList',
            title: 'List',
            type: 'item',
            url: '/roles-list',
            breadcrumbs: false,
            children:[]
        }, {
            id: 'rolesAdd',
            title: 'ADD',
            type: 'item',
            url: '/roles-add',
            breadcrumbs: false,
            children:[]
        }]
    }]
};

export default dashboard;
