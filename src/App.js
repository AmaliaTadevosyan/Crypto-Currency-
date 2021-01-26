import React from "react";
import Header from "./components/common/Header/Header";
import List from "./components/List/List";
import Detail from "./components/detail/Detail";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./index.css";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path='/' component={List} exact />
          <Route path='/currency/:id' component={Detail} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};
export default App;
