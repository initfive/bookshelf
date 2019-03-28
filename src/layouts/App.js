import React from "react";
import "./App.css";

import { Route } from "react-router-dom";

import Root from "./../pages/root";
import Search from "./../pages/search";

class App extends React.Component {
  state = {
    books: []
  };

  render() {
    return (
      <div className="app">
        <Route path="/search" component={Search} />
        <Route exact path="/" component={Root} />
      </div>
    );
  }
}

export default App;
