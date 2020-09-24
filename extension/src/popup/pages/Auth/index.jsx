// Libraries
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import PageSignIn from "./SignIn";
import PageSignUp from "./SignUp";
const PageAuth = props => {
    const {
        match,
        match: { path, url }
    } = props;

    return (
        <Switch>
            <Route component={PageSignIn} path={`${path}/sign-in`} />
            <Route component={PageSignUp} path={`${path}/sign-up`} />
            <Redirect to={`${url}/sign-in`} />
        </Switch>
    );
};

export default PageAuth;
