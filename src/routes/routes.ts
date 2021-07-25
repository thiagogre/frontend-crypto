import { Route } from '../models';

import { Home } from '../pages/Home';
import { Table } from '../pages/Table';
import { Settings } from '../pages/Settings';

export const routes: Route[] = [
    { exact: true, path: '/', name: 'Home', component: Home },
    { exact: true, path: '/table', name: 'Table', component: Table },
    { exact: true, path: '/settings', name: 'Settings', component: Settings },
];
