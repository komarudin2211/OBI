import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const Wtq = Loadable(lazy(() => import('views/wtq')));
const Obcd = Loadable(lazy(() => import('views/obcd')));
const ObcdAdd = Loadable(lazy(() => import('views/obcd/add.js')));

const Roles = Loadable(lazy(() => import('views/roles')));
const RolesAdd = Loadable(lazy(() => import('views/roles/add.js')));

const User = Loadable(lazy(() => import('views/user')));
const UserAdd = Loadable(lazy(() => import('views/user/add.js')));

const Product = Loadable(lazy(() => import('views/product')));
const ProductAdd = Loadable(lazy(() => import('views/product/add.js')));
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
            path: 'wtq1',
            element: <Wtq />
        }, 
        {
            path:'obcd-list',
            element: <Obcd />
        }, 
        {
            path:'obcd-add',
            element: <ObcdAdd />
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
