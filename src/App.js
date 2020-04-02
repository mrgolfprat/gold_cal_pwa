import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import Main from "./pages/Main";
import Settings from "./pages/Settings";
import store from "./redux/store";

import "./App.css";
import "typeface-roboto";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
