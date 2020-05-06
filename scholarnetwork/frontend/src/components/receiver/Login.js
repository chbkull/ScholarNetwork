// TODO

import React, { Component, Fragment } from "react";
import {Redirect } from "react-router-dom";
import {insertUser, getUserByEmail} from "../action/user";
import {Alert} from '../modular/Alert';
import Form from '../modular/Form';
import 'regenerator-runtime/runtime';

export class Login extends Component {
  // Don't call this.setState() here!

  state = {
    email: "",
    password: "",
    message: "",
    status: "",
    tmp:""
  };

  prop_setState = async(target, value)=>{
    await this.setState({[target]:value});
  }

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
      modular = <Alert onClick = {this.onClick} message = {message} status="Failed"/> ;
    }


    var data = {
      email: this.state.email,
      password: this.state.password,
    };

    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Log In</h2>
        <div>{modular}</div>
        <Form prop_setState = {this.prop_setState} data = {data} />
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
      </div>
    );
  }
}


export default Login;
