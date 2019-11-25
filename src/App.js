import React from "react";
import { Provider } from "react-redux";
import store from "./store";

import "./scss/App.scss";

import GameOverDialogContainer from "./battlefield/containers/GameOverDialogContainer";

const App = ({ children }) => (
  <Provider key="proider" store={store}>
    {children}
    <GameOverDialogContainer />
  </Provider>
);

export default App;
