import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { routes } from './routes';
import { Route as RouteType } from '../models';

export const Routes = () => {
    return (
        <Router>
            <Switch>
                {routes.map((route: RouteType, i: number) => (
                    <Route
                        key={i}
                        exact={route.exact}
                        path={route.path}
                        component={route.component}
                    />
                ))}
            </Switch>
        </Router>
    );
};
