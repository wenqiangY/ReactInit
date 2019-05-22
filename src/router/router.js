import React from 'react';

import {Route, Switch} from 'react-router-dom';

import Bundle from './Bundle';

import Loading from 'components/Loading/Loading';
import Home from 'bundle-loader?lazy&name=home!views/Home/Home';
import Page1 from 'bundle-loader?lazy&name=page1!views/Page1/Page1';
import Counter from 'bundle-loader?lazy&name=counter!views/Counter/Counter';
import UserInfo from 'bundle-loader?lazy&name=userInfo!views/UserInfo/UserInfo';
import NotFound from 'bundle-loader?lazy&name=notFound!views/NotFound/NotFound';

const createComponent = (component) => (props) => (
    <Bundle load={component}>
        {
            (Component) => Component ? <Component {...props} /> : <Loading/>
        }
    </Bundle>
);

export default () => (
    <div>
        <Switch>
            <Route exact path="/" component={createComponent(Home)}/>
            <Route path="/page1" component={createComponent(Page1)}/>
            <Route path="/counter" component={createComponent(Counter)}/>
            <Route path="/userinfo" component={createComponent(UserInfo)}/>
            <Route component={createComponent(NotFound)}/>
        </Switch>
    </div>
);
