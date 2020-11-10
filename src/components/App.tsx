import { Menu } from "antd";
import React from "react";
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import About from "../screens/About";
import Movie from "../screens/Movie";
import MovieDetail from "../screens/Movie/Detail";
import TV from "../screens/TV";
import TvDetail from "../screens/TV/TvDetail";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Menu mode="horizontal" activeKey="movie">
            <Menu.Item key="movie">
              <Link to="/movie">Movie</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/tv">Tv</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/about">About</Link>
            </Menu.Item>
          </Menu>
        </nav>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/tv/:tvId">
            <TvDetail />
          </Route>
          <Route path="/tv">
            <TV />
          </Route>
          <Route path="/movie/:movieId">
            <MovieDetail />
          </Route>
          <Route path="/movie">
            <Movie />
          </Route>
          <Redirect from="*" to="/movie" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
