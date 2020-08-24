import React, { Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import Header from './layout/Header';
import Dashboard from './management/Dashboard';
import Alerts from './layout/Alerts';
import PrivateRoute from './common/PrivateRoute';
import HomePage from './common/HomePage';
import PostPage from './common/PostPage';
import QDashboard from './interactions/QDashboard'
import PDashboard from './management/PDashboard';
import EPDashboard from './management/EPDashboard';
import IPDashboard from './interactions/IPDashboard';

import Login from './accounts/Login';
import Register from './accounts/Register';

import { Provider } from 'react-redux';

import store from '../store';

import { loadUser, getSocial } from '../actions/auth';
import { getAllQuestions, getTags } from '../actions/management';

const alertOptions = {
    timeout: 3000,
    position: 'bottom left'
    
}

class App extends Component {

    componentDidMount(){
        store.dispatch(getSocial());
        store.dispatch(loadUser());
        store.dispatch(getAllQuestions());
        store.dispatch(getTags());
    }
    render() {
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Router>
                        <Fragment>
                            <Header />
                            <Alerts />
                            <div className="container mt-5">
                                <Switch>
                                    <PrivateRoute exact path='/myAccount' component={Dashboard} />
                                    <Route exact path='/login' component={Login} />
                                    <Route exact path='/register' component={Register} />

                                    <Route exact path='/questions' render={(props) => <HomePage {...props} ansQs={false} />} />
                                    <Route exact path='/answerQs' render={(props) => <HomePage {...props} ansQs={true} />} />
                                    <Route exact path='/search/:search?' render={(props) => <HomePage {...props} />} />
                                    <Route exact path="/question/:id" render={(props) => <QDashboard {...props} />} />

                                    <Route exact path='/' component={PostPage} />
                                    <Route exact path="/post/:id" render={(props) => <IPDashboard {...props} />} />
                                    <PrivateRoute exact path="/myPost/:title" component={PDashboard} />
                                    <PrivateRoute exact path="/editPost/:title" component={EPDashboard} />
                                </Switch>
                            </div>
                        </Fragment>
                    </Router>
                </AlertProvider>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));