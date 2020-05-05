import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

export class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="#">
          ScholarNet
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#/showcase">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#/profile">
                Profile
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#/article">
                Article
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#/author">
                Author
              </a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="text" placeholder="Search"></input>
            <button className="btn btn-secondary my-2 my-sm-0" type="submit">
              Network
            </button>
          </form>
        </div>
      </nav>
    );
  }
}

export default Header;
