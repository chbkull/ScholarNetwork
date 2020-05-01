// TODO

import React, { Component } from "react";
import PropTypes from "prop-types";

export class Register extends Component {
  // Don't call this.setState() here!

  //   static propTypes = {
  //     // getUserByEmail: PropTypes.function.isRequired,
  //     insertUser: PropTypes.function.isRequired,
  //     // updateUserByEmail: PropTypes.function.isRequired,
  //     // deleteUserByEmail: PropTypes.function.isRequired,
  //   };

  state = {
    author: "",
    affiliation: "",
    interests: "",
    name: "",
    url_picture: "",
    birthYear: "",
    email: "",
    message: "",
    password: "",
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      console.log(this.state);
    });
  };

  onClick = (e) => {
    this.setState(
      {
        author: "",
        affiliation: "",
        interests: "",
        name: "",
        url_picture: "",
        birthYear: "",
        email: "",
        message: "",
        password: "",
      },
      () => {
        document.getElementById("registerForm").reset();
        console.log(this.state);
      }
    );
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { author, affiliation, interests, name, url_picture, birthYear, email } = this.state;

    const newUser = { author, affiliation, interests, name, url_picture, birthYear, email };
    // this.props.insertUser(newUser);
    axios
      .get("api/users/searchemail/<slug:searchby>", {
        params: {
          email: e,
        },
      })
      .then((res) => {
        return { data: res, msg: "fail" };
      })
      .catch((err) => {
        return err;
      });

    this.setState({
      author: "",
      affiliation: "",
      interests: "",
      name: "",
      url_picture: "",
      birthYear: "",
      email: "",
      message: "Successfully created a new user",
      password: "",
    });
  };

  render() {
    const {
      author,
      affiliation,
      interests,
      name,
      url_picture,
      birthYear,
      email,
      message,
      password,
    } = this.state;

    return (
      <div className="card card-body mt-4 mb-4">
        <h2>User register</h2>
        <form id="registerForm" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              onChange={this.onChange}
              value={name}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              onChange={this.onChange}
              value={email}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              onChange={this.onChange}
              value={password}
            />
          </div>
          <div className="form-group">
            <label>Affiliation</label>
            <textarea
              className="form-control"
              type="text"
              name="affiliation"
              onChange={this.onChange}
              value={affiliation}
            />
          </div>
          <div className="form-group">
            <label>Interest</label>
            <textarea
              className="form-control"
              type="text"
              name="interests"
              onChange={this.onChange}
              value={interests}
            />
          </div>
          <div className="form-group">
            <label>Author</label>
            <textarea
              className="form-control"
              type="text"
              name="author"
              onChange={this.onChange}
              value={author}
            />
          </div>
          <div className="form-group">
            <label>url_picture</label>
            <textarea
              className="form-control"
              type="text"
              name="url_picture"
              onChange={this.onChange}
              value={url_picture}
            />
          </div>
          <div className="form-group">
            <label>birthYear</label>
            <textarea
              className="form-control"
              type="text"
              name="birthYear"
              onChange={this.onChange}
              value={birthYear}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <div>
              <h3>{message}</h3>
            </div>
          </div>
        </form>
        <div className="form-group">
          <button type="click" className="btn btn-primary" onClick={this.onClick}>
            Clear
          </button>
        </div>
      </div>
    );
  }
}

export default Register;
