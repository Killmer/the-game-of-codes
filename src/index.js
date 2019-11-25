import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./scss/index.scss";

import App from "./App";
import BattlefieldContainer from "./battlefield/containers/BattlefieldContainer";

const Main = () => (
    <BattlefieldContainer/>
);

ReactDOM.render(
  <BrowserRouter>
    <App>
      <Switch>
        <Route exact path="/" component={Main} />
      </Switch>
    </App>
  </BrowserRouter>,
  document.getElementById("root")
);
