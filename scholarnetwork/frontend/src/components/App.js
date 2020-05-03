import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";

// import { Provider as AlertProvider } from 'react-alert';
// import AlertTemplate from 'react-alert-template-basic';

import Header from "./layout/Header";
import Login from "./receiver/Login";
import Profile from "./receiver/Profile";
import Article from "./receiver/Article";
import Author from "./receiver/Author";
import Showcase from "./layout/Showcase";


class App extends Component {
  state = {
    id:"",
    // article:"",
    // author:"",
  };

  setUser = (i) => {
    this.setState({ id: i }, () => {
      console.log(this.state);
    });
  };


  // setArticle = (i) => {
  //   this.setState({ article: i }, () => {
  //     console.log(this.state);
  //   });
  // };

  // setAuthor = (i) => {
  //   this.setState({ author: i }, () => {
  //     console.log(this.state);
  //   });
  // };

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


              {/* <Route exact path="/article/detail" render={(props) =>
                <Fragment>
                  <Header />
                  <ArticleDetail />
                  </Fragment>
                }/> */}
            </Switch>
          </div>
        </Fragment>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
