import { Route } from '../models';

import { Settings } from '../pages/Settings';

export const routes: Route[] = [
    { exact: true, path: '/settings', name: 'Settings', component: Settings },
];
