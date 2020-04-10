// TODO

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export class Login extends Component {
  // Don't call this.setState() here!

  //   static propTypes = {
  //     getUserByEmail: PropTypes.function.isRequired,
  //   };

  state = {
    email: '',
    password: '',
    message: '',
    success: true,
  };

  // form on change
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      console.log(this.state);
    });
  };
  // click to sign in -> jump to another link -> user create
  // click to sign up ->  jump to another link -> user edit/delete

  onSubmit = (e) => {
    e.preventDefault();
    const { email, password, message, success } = this.state;
    this.props.setUser(email, password, success);
    console.log(this.props.user);
    this.setState({ message: 'successfully log in' });
    console.log(this.state);
    this.setState({
      name: '',
      email: '',
      message: '',
      success: true,
    });
  };

  render() {
    const { email, password, message, success } = this.state;
    // console.log(success);
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>user log in</h2>
        <form>
          <div className="form-group">
            <label>email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              onChange={this.onChange}
              //   value={this.state.data.email}
            ></input>
          </div>
          <div className="form-group">
            <label>password</label>
            <textarea
              className="form-control"
              type="text"
              name="password"
              onChange={this.onChange}
              //   value={this.state.data.password}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>
              <Link to="/user/profile">Sign In</Link>
            </button>
          </div>
          <div>
            <h3>{message}</h3>
          </div>
        </form>
        <div className="form-group">
          <button type="click" className="btn btn-primary">
            <Link to="/user/register">Sign Up</Link>
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
