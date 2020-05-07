import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch} from "react-router-dom";

import Header from "./layout/Header";
import Login from "./receiver/Login";
import Profile from "./receiver/Profile";
import Article from "./receiver/Article";
import Author from "./receiver/Author";
import Showcase from "./layout/Showcase";
import Network from "./receiver/Network";
import NeoViz from "./modular/NeoViz";
import Complex  from "./receiver/Complex";
import Journal from "./receiver/Journal";
import Publisher from "./receiver/Publisher";
class App extends Component {
  state = {
    id:"",

  };

  setUser = (i) => {
    this.setState({ id: i }, () => {
      console.log(this.state);
    });
  };


  render() {
    return (
      <Router>
        <Fragment>
          <div className="container">
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Fragment>
                    <h1 color="white">ScholarNet</h1>
                    <Login setUser={this.setUser} />
                  </Fragment>
                )}
              />

              <Route
                exact
                path="/showcase"
                render={(props) =>(
                  <Fragment>
                  <Header />
                  <Showcase />
                  </Fragment>)}
              />

              <Route
                exact path="/profile"
                render={(props) =>
                  <Fragment>
                  <Header />
                  <Profile setUser={this.setUser} user={this.state} />
                  </Fragment>
              }/>

              <Route exact path="/author" render={(props) =>
                <Fragment>
                  <Header />
                  <Author/>
                </Fragment>} />

              <Route exact path="/article" render={(props) =>
                <Fragment>
                  <Header />
                  <Article/>
                  </Fragment>
                }/>
              <Route exact path="/journal" render={(props) =>
                <Fragment>
                  <Header />
                  <Journal/>
                  </Fragment>
                }/>
             <Route exact path="/publisher" render={(props) =>
                <Fragment>
                  <Header />
                  <Publisher/>
                  </Fragment>
                }/>

              <Route exact path="/complex" render={(props) =>
                <Fragment>
                  <Header />
                  <Complex/>
                  </Fragment>
                }/>

              <Route exact path="/network" render={(props) =>
                <Fragment>
                  <Header />
                  <Network />
                  </Fragment>
                }/>
            </Switch>
          </div>
        </Fragment>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
