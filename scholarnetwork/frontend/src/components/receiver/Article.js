// TODO

import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

export class Article extends Component {
  // Don't call this.setState() here!

  //   static propTypes = {
  //     getArticleBy: PropTypes.function.isRequired,
  //   };

  state = {
    message: "",
    success: false,
    selector: "",
    content: "",
    result: [
      {
        journal: "dsa",
        author: "f",
        co_author: ["fds"],
        pub_title: "fre",
        pub_year: "gw",
        citations: "fgs",
        eprint: "gsg",
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
      selector: "",
      content: "",
    });
  };

  render() {
    const results = this.state.result;

    const module = results.map((entry) => {
      return (
        <Fragment>
          <tr class="table-light">
            <th scope="row">{entry.pub_title}</th>
            <td>{entry.journal}</td>
            <td>{entry.author}</td>
            <td>{entry.co_author}</td>
            <td>{entry.pub_year}</td>
            {/* <td>{entry.pub_title}</td> */}
            <td>{entry.citations}</td>
            <td>{entry.eprint}</td>
          </tr>
        </Fragment>
      );
    });

    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Search Article</h2>
        <fieldset className="form-group">
          <legend>Radio buttons</legend>
          <div className="form-check">
            <label className="form-check-label">
              <input
                type="radio"
                className="form-check-input"
                name="optionsRadios"
                id="optionsRadios1"
                value="pub_title"
                onChange={this.onCheck}
              />
              pub_title
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input
                type="radio"
                className="form-check-input"
                name="optionsRadios"
                id="optionsRadios2"
                value="pub_year"
                onChange={this.onCheck}
              />
              pub_year
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
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">pub_titles</th>
              <th scope="col">journal</th>
              <th scope="col">author</th>
              <th scope="col">co_author</th>
              <th scope="col">pub_year</th>
              <th scope="col">citations</th>
              <th scope="col">eprint</th>
            </tr>
          </thead>
          <tbody>{module}</tbody>
        </table>
      </div>
    );
  }
}

export default Article;
