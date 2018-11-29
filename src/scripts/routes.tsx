import * as React from 'react';
import {Switch, Route } from 'react-router-dom';
import Frontpage from "./pages/Frontpage";
import AdminAuth from "./pages/AdminAuth";
import ElectionDetailPage from './pages/ElectionDetailPage';


class RoutesView extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={Frontpage}/>
                <Route exact path='/front/:token?' component={Frontpage} />
                <Route exact path='/login' component={AdminAuth}/>
                <Route exact path='/detail/:id/:token?' component={ElectionDetailPage}/>
            </Switch>
        );
    }
}


export default RoutesView;
