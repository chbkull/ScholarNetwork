import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";

// import { Provider as AlertProvider } from 'react-alert';
// import AlertTemplate from 'react-alert-template-basic';

import Header from "./layout/Header";
import Login from "./receiver/Login";
import Edit from "./receiver/Edit";
import Article from "./receiver/Article";
import Author from "./receiver/Author";
import Register from "./receiver/Register";

class App extends Component {
  state = {
    email: "",
    password: "",
    status: "",
  };

  setUser = (e, p, s) => {
    this.setState({ email: e, password: p, status: s }, () => {
      console.log(this.state);
    });
  };

  render() {
    return (
      <Router>
        <Fragment>
          <div className="container">
            <Header />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Fragment>
                    <h1 color="white">Welcome to ScholarNet!</h1>
                    <Login setUser={this.setUser} />
                  </Fragment>
                )}
              />

              <Route
                exact
                path="/user/register"
                render={(props) => <Register setUser={this.setUser} />}
              />
              <Route
                exact
                path="/user/profile"
                render={(props) => <Edit setUser={this.setUser} user={this.state} />}
              />
              <Route exact path="/article" render={(props) => <Article />} />
              <Route exact path="/author" render={(props) => <Author />} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
