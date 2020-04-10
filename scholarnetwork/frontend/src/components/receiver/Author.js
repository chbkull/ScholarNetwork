// TODO

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

export class Author extends Component {
  // Don't call this.setState() here!

  //   static propTypes = {
  //     getArticleBy: PropTypes.function.isRequired,
  //   };

  state = {
    message: '',
    success: false,
    selector: '',
    content: '',
    result: [
      {
        name: 'dsa',
        citedby: 'f',
        attributes: ['fds'],
        email: 'fre',
        author: 'gw',
      },
    ],
  };

  onCheck = (e) => {
    console.log(this.state);
    this.setState({ selector: e.target.value }, () => {
      console.log(this.state);
    });
  };

  // form on changes
  onChange = (e) => {
    this.setState({ content: e.target.value }, () => {
      console.log(this.state);
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const name = this.state.selector;
    const content = this.state.content;
    // this.props.getAuthorBy(user, login);
    this.setState({
      selector: '',
      content: '',
    });
  };

  render() {
    const results = this.state.result;

    const module = results.map((entry) => {
      return (
        <Fragment>
          <tr class="table-light">
            <th scope="row">{entry.name}</th>
            <td>{entry.citedby}</td>
            <td>{entry.email}</td>
            <td>{entry.user}</td>
          </tr>
        </Fragment>
      );
    });

    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Search Article</h2>
        <fieldset class="form-group">
          <legend>Radio buttons</legend>
          <div class="form-check">
            <label class="form-check-label">
              <input
                type="radio"
                class="form-check-input"
                name="optionsRadios"
                id="optionsRadios1"
                value="affiliation"
                onChange={this.onCheck}
              />
              affiliation
            </label>
          </div>
          <div class="form-check">
            <label class="form-check-label">
              <input
                type="radio"
                class="form-check-input"
                name="optionsRadios"
                id="optionsRadios2"
                value="name"
                onChange={this.onCheck}
              />
              name
            </label>
          </div>
        </fieldset>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>content</label>
            <input
              className="form-control"
              type="content"
              name="content"
              onChange={this.onChange}
              value={this.state.content}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </div>
        </form>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">name</th>
              <th scope="col">citedby</th>
              <th scope="col">email</th>
              <th scope="col">user account</th>
            </tr>
          </thead>
          <tbody>{module}</tbody>
        </table>
      </div>
    );
  }
}

export default Author;
