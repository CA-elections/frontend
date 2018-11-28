import * as React from 'react';
import {Switch, Route } from 'react-router-dom';
import Frontpage from "./pages/Frontpage";
import AdminAuth from "./pages/AdminAuth";
import Layout from "./layout";

class RoutesView extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' render={() =>
                    <Layout>
                        <Frontpage/>
                    </Layout>} />
                <Route exact path='/login' component={AdminAuth}/>
            </Switch>
        );
    }
}

export default RoutesView;
