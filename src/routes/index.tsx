import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { routes } from './routes';
import { Route as RouteType } from '../models';
import { useApplicationContext } from '../context';

import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { Feedback } from '../components/Feedback';

type HeaderProps = {
    toggleMode: () => void;
    mode: string;
};

export const Routes: React.FC<HeaderProps> = ({ toggleMode, mode }) => {
    const { state } = useApplicationContext();

    return (
        <>
            {state.app.loading && <Loading />}
            {state.app.feedback?.visible && <Feedback />}
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
        </>
    );
};
