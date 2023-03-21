import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
// const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
// const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
// const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
// const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
// const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

const Roles = Loadable(lazy(() => import('views/roles')));
const RolesAdd = Loadable(lazy(() => import('views/roles/add.js')));

const User = Loadable(lazy(() => import('views/user')));
const UserAdd = Loadable(lazy(() => import('views/user/add.js')));

const Product = Loadable(lazy(() => import('views/product')));
const ProductAdd = Loadable(lazy(() => import('views/product/add.js')));
const ProductEdit = Loadable(lazy(() => import('views/product/edit.js')));

const Inventory = Loadable(lazy(() => import('views/inventory')));
const InventoryAdd = Loadable(lazy(() => import('views/inventory/add.js')));
const InventorySale = Loadable(lazy(() => import('views/inventory/sale.js')));
const InventoryEdit = Loadable(lazy(() => import('views/inventory/edit.js')));
const History = Loadable(lazy(() => import('views/inventory/history.js')));

const Warehouse = Loadable(lazy(() => import('views/warehouse')));
const WarehouseAdd = Loadable(lazy(() => import('views/warehouse/add.js')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path:'roles-list',
            element: <Roles />
        }, 
        {
            path:'roles-add',
            element: <RolesAdd />
        }, 
        {
            path:'product-list',
            element: <Product />
        }, 
        {
            path:'product-add',
            element: <ProductAdd />
        }, 
        {
            path:'product-edit/:id',
            element: <ProductEdit />
        }, {
            path:'inventory-list',
            element: <Inventory />
        }, {
            path:'history-list',
            element: <History />
        }, {
            path:'inventory-add',
            element: <InventoryAdd />
        }, {
            path:'inventory-sale',
            element: <InventorySale />
        }, {
            path:'inventory-edit/:id',
            element: <InventoryEdit />
        }, 
        {
            path:'warehouse-list',
            element: <Warehouse />
        }, 
        {
            path:'warehouse-add',
            element: <WarehouseAdd />
        }, 
        {
            path:'user-list',
            element: <User />
        }, 
       /* {
            path:'user-add',
            element: <UserAdd />
        }*/
        /*{
            path: 'utils',
            children: [
                {
                    path: 'util-typography',
                    element: <UtilsTypography />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-color',
                    element: <UtilsColor />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-shadow',
                    element: <UtilsShadow />
                }
            ]
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'tabler-icons',
                    element: <UtilsTablerIcons />
                }
            ]
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'material-icons',
                    element: <UtilsMaterialIcons />
                }
            ]
        },
        {
            path: 'sample-page',
            element: <SamplePage />
        }*/
    ]
};

export default MainRoutes;
