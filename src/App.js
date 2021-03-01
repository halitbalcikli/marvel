import React, {Component} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';

const loading = () => <div className="text-center">Loading...</div>;
const MainPage = React.lazy(() => import('./components/MainPage'));
const DetailPage = React.lazy(() => import('./DetailPage/DetailPage'));

class App extends Component {
    render() {
        return (
            <React.Suspense fallback={loading()}>
                <HashRouter>
                    <Switch>
                        <Route exact path="/detail-page/:id"
                               render={(routeProps) => (
                                   <DetailPage {...routeProps} key={routeProps.match.params.id}/>
                               )}
                        />
                        <Route
                            exact
                            path="/"
                            component={MainPage}
                        />
                    </Switch>
                </HashRouter>
            </React.Suspense>
        );
    }
}

export default App;
