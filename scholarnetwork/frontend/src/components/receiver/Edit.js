// TODO

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Register extends Component {
  // Don't call this.setState() here!

  //   static propTypes = {
  //     // getUserByEmail: PropTypes.function.isRequired,
  //     insertUser: PropTypes.function.isRequired,
  //     // updateUserByEmail: PropTypes.function.isRequired,
  //     // deleteUserByEmail: PropTypes.function.isRequired,
  //   };

  state = {
    author: '',
    affiliation: '',
    interests: '',
    name: '',
    url_picture: '',
    birthYear: '',
    email: this.props.user.email,
    message: '',
    password: this.props.user.password,
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      console.log(this.state);
    });
  };

  onDelete = (e) => {
    this.setState(
      {
        author: '',
        affiliation: '',
        interests: '',
        name: '',
        url_picture: '',
        birthYear: '',
        email: '',
        message: 'Successfully deleted a new user',
        password: '',
      },
      () => {
        document.getElementById('registerForm').reset();
        console.log(this.state);
      },
    );
  };

  onUpdate = (e) => {
    e.preventDefault();
    const { author, affiliation, interests, name, url_picture, birthYear, email } = this.state;

    const newUser = { author, affiliation, interests, name, url_picture, birthYear, email };
    // this.props.insertUser(newUser);

    this.setState({
      author: '',
      affiliation: '',
      interests: '',
      name: '',
      url_picture: '',
      birthYear: '',
      email: '',
      message: 'Successfully updated a new user',
      password: '',
    });
  };

  render() {
    console.log(this.props.user);
    if (this.props.user.status === false) {
      return (
        <div className="alert alert-dismissible alert-warning">
          <button type="button" className="close" data-dismiss="alert">
            &times;
          </button>
          <h4 className="alert-heading">404 NOT FOUND</h4>
          <p className="mb-0">User not exist or password not match</p>
        </div>
      );
    }

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
        <h2>User edit</h2>
        <form id="registerForm" onSubmit={this.onUpdate}>
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
              Edit
            </button>
            <div>
              <h3>{message}</h3>
            </div>
          </div>
        </form>
        <div className="form-group">
          <button type="click" className="btn btn-primary" onClick={this.onDelete}>
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default Register;
