import { Route } from '../models';

import { Home } from '../pages/Home';
import { Table } from '../pages/Table';
import { Settings } from '../pages/Settings';
import { Dashboard } from '../pages/Dashboard';

export const routes: Route[] = [
    { exact: true, path: '/', name: 'Home', component: Home },
    { exact: true, path: '/settings', name: 'Settings', component: Settings },
    { exact: true, path: '/assets', name: 'Assets', component: Table },
    {
        exact: true,
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
    },
];
