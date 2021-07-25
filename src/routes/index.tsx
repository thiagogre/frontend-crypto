import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Header } from '../components/Header';
import { routes } from './routes';
import { Route as RouteType } from '../models';
type HeaderProps = {
    toggleMode: () => void;
    mode: string;
};
export const Routes: React.FC<HeaderProps> = ({ toggleMode, mode }) => {
    return (
        <Router>
            <Header toggleMode={toggleMode} mode={mode} />
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
