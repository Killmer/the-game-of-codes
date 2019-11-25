import React from "react";
import { Provider } from "react-redux";
import "./scss/App.scss";
import BattlefieldContainer from './battlefield/containers/BattlefieldContainer';
import GameOverDialogContainer from './battlefield/containers/GameOverDialogContainer';
import store from "./store";



function App() {
  return (
    <Provider store={store}>
      <BattlefieldContainer/>
      <GameOverDialogContainer/>
    </Provider>
  );
}

export default App;
