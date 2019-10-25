/* eslint-disable import/no-named-as-default */
import { Route, Switch } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import PropTypes from "prop-types";
import React from "react";
import { hot } from "react-hot-loader";
import SuperheroesListPage from "./containers/superheroes-list/SuperheroesListPage";
import SuperheroDetailsPage from "./containers/superheroes-details/SuperheroDetailsPage";

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Switch>
          <Route exact path="/" component={SuperheroesListPage} />
          <Route exact path="/superheroes/:id" component={SuperheroDetailsPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default hot(module)(App);
