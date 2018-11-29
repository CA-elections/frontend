import * as React from 'react';
import {Switch, Route } from 'react-router-dom';
import Frontpage from "./pages/Frontpage";
import AdminAuth from "./pages/AdminAuth";
import ElectionDetailPage from './pages/ElectionDetailPage';
import Layout from "./layout";

class RoutesView extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' render={() =>
                    <Layout>
                        <Frontpage
                          elections={[]}
                        />
                    </Layout>} />
                <Route exact path='/login' component={AdminAuth}/>
                <Route exact path='/detail/:id' component={ElectionDetailPage}/>
            </Switch>
        );
    }
}

export default RoutesView;
