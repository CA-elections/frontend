import * as React from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import Frontpage from "./pages/Frontpage";
import Layout from "./layout";

class RoutesView extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' render={() =>
                    <Layout>
                        <Frontpage/>
                    </Layout>} />
            </Switch>
        );
    }
}

export default RoutesView;
