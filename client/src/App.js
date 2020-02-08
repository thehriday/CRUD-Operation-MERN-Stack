import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from "./components/navBar/NavBar";
import HomePage from "./components/homepage/HomePage";
import SearchPage from "./components/searchPage/SearchPage";
import EmptySearch from "./components/emptySearch/EmptySearch";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/search/:title" component={SearchPage} />
          <Route path="/search" component={EmptySearch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
