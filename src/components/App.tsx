import { Menu } from "antd";
import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import About from "../screens/About";
import Movie from "../screens/Movie";
import Tv from "../screens/Tv";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Menu mode="horizontal">
            <Menu.Item>
              <Link to="/">Movie</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/tv">Tv</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/about">About</Link>
            </Menu.Item>
          </Menu>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/tv">
            <Tv />
          </Route>
          <Route path="/">
            <Movie />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
