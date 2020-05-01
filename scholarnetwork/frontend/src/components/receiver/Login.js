// TODO

import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

// import getUserByEmail from "../action/user";

export class Login extends Component {
  // Don't call this.setState() here!

  //   static propTypes = {
  //     getUserByEmail: PropTypes.function.isRequired,
  //   };

  state = {
    email: "",
    password: "",
    message: "",
    status: "",
  };

  // form on change
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      console.log(this.state);
    });
  };

  onSubmit = (event) => {
    event.preventDefault();

    axios
      .get("api/users/searchemail/" + this.state.email)
      .then((data) => {
        var msg = "";
        var s = "";
        if (!data) {
          s = "fail";
          msg = "user not exist";
        } else if (data.password !== this.state.password) {
          s = "fail";
          msg = "password not match";
        } else {
          s = "succeed";
          msg = "log in successfully";
          this.props.setUser(this.state.email, this.state.password, true);
        }
        this.setState({ email: "", password: "", status: s, message: msg }, () => {
          console.log(this.state);
        });
      })
      .catch((err) => {
        this.setState({ email: "", password: "", status: "fail", message: "invalid input" }, () => {
          console.log(this.state);
        });
      });
  };

  onClick = () => {
    this.setState({ email: "", password: "", status: "new", message: "" }, () => {
      console.log(this.state);
    });
  };

  render() {
    const message = this.state.message;
    const status = this.state.status;

    if (status === "succeed") {
      console.log("status");
      return <Redirect to="user/profile" />;
    }

    if (status === "new") {
      return <Redirect to="user/register" />;
    }

    const modular = () => {
      if (status === "fail") {
        return (
          <div className="alert alert-dismissible alert-warning">
            <button type="button" className="close" data-dismiss="alert">
              &times;
            </button>
            <h4 className="alert-heading">Log In Failed</h4>
            <p className="mb-0">Reason : {message}</p>
          </div>
        );
      }

      return <div>fdahfkjdas</div>;
    };

    // console.log(success);
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>user log in</h2>
        <div>{modular}</div>
        <form>
          <div className="form-group">
            <label>email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              onChange={this.onChange}
              value={this.state.email}
            ></input>
          </div>
          <div className="form-group">
            <label>password</label>
            <textarea
              className="form-control"
              type="text"
              name="password"
              onChange={this.onChange}
              value={this.state.password}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>
              Sign In
            </button>
          </div>
          <div className="form-group">
            <button type="click" className="btn btn-primary" onClick={this.onClick}>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
