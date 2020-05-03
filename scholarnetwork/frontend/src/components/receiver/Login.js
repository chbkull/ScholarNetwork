// TODO

import React, { Component, Fragment } from "react";
import {PropTypes} from "prop-types";
import { Link, Redirect } from "react-router-dom";
import {insertUser, getUserByEmail} from "../action/user";
import 'regenerator-runtime/runtime';
// import { async } from "regenerator-runtime/runtime";
// import getUserByEmail from "../action/user";

export class Login extends Component {
  // Don't call this.setState() here!



  state = {
    email: "",
    password: "",
    message: "",
    status: "",
    tmp:""
  };



  // form on change
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      console.log(this.state);
    });
  };

  onSubmit = async (event) => {
    event.preventDefault();
    const target = event.target.value;
    // var msg = "";
    // var s = "";

    var msg = "";
    var s = "";
    var req = this.state;
    var res = { data:[], msg:"" };
    if (req.email === '' || req.password===''){
      s = "fail";
      msg = "email and password are required";
    }
    else {
      await getUserByEmail(req,res);
      if (target === "signin"){
        if (res.data.length === 0) {
          s = "fail";
          msg = "user not exist";
        } else if (res.data[0].password !== req.password) {
          s = "fail";
          msg = "password not match";
        } else {
          s = "succeed";
          msg = "log in successfully";
          this.props.setUser(res.data[0].id);
        }
      }
      else{
        // var inset_res = { data:[], msg:"" };
        if (res.data.length !== 0) {
          s = "fail";
          msg = "user already exist";
        }
        else {
          await insertUser(req,res);
          console.log("res.msg:",res.msg);
          if (res.data.length !== 0) {
            this.props.setUser(res.data[0].id);
            s = "succeed";
            msg = "sign up successfully";
          }
          else {
            s = "fail";
            msg = "server error";
          }

        }
      }

    }

    this.setState({ status: s, message: msg }, () => {
      console.log(this.state);
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


    var modular = <Fragment></Fragment>;

    if (status === "succeed") {
      console.log("status");
      // TODO: redirect to showcase
      return <Redirect to="/showcase" />;
    }

    if (status === "fail"){
      modular = (<div className="alert alert-dismissible alert-warning">
      <button type="button" className="close" data-dismiss="alert" onClick = {this.onClick}>
        &times;
      </button>
      <h4 className="alert-heading">Operation Failed</h4>
      <p className="mb-0">Reason : {message}</p>
    </div>);
    }

    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Log In</h2>
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
            <button type="submit" className="btn btn-primary" value="signin" onClick={this.onSubmit}>
              Sign In
            </button>
          </div>
          <div className="form-group">
            <button type="click" className="btn btn-primary" value="signup" onClick={this.onSubmit}>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    );
  }
}


// Login.propTypes = {
//   insertUser: PropTypes.function.isRequired,
//   getUserByEmail: PropTypes.function.isRequired,
// };

export default Login;
