/* global document */

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";

import { createStore } from "@redux";

import cls from "./App.module.scss";
import Pages from "./pages";

const history = createBrowserHistory();
const store = createStore(undefined, history);

export const Main = props => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className={cls.app}>
                    <Pages />
                </div>
            </BrowserRouter>
        </Provider>
    );
};

ReactDOM.render(<Main />, document.getElementById("root"));
