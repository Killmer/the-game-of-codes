import React from "react";
import { Provider } from "react-redux";
import "./scss/App.scss";
import BattlefieldContainer from './containers/BattlefieldContainer';
import store from "./store";



function App() {
  return (
    <Provider store={store}>
      <BattlefieldContainer/>
    </Provider>
  );
}

export default App;
