import React from "react";
import { Provider } from "react-redux";
import "./scss/App.scss";
import GameContainer from './containers/GameContainer';
import store from "./store";



function App() {
  return (
    <Provider store={store}>
      <GameContainer/>
    </Provider>
  );
}

export default App;
