import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
//import BrowserHistory from 'react-router/lib/BrowserHistory';
import Frontpage from "./pages/Frontpage";
import AdminAuth from "./pages/AdminAuth";
import ElectionDetailPage from './pages/ElectionDetailPage';
import ElectionVoting from './pages/ElectionVoting';


class RoutesView extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={Frontpage}/>
                <Route exact path='/front/:token?' component={Frontpage} />
                <Route exact path='/login/:from' component={AdminAuth}/>
				<Route exact path='/election-voting/:token' component={ElectionVoting}/>
                <Route exact path='/detail/:id/:token?' component={ElectionDetailPage}/>
            </Switch>
        );
    }
}


export default RoutesView;
