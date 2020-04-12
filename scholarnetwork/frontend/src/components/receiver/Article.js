// TODO

import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// import { getArticleByTitle, getArticleByAuthor } from "../action/author";

import axios from "axios";

export class Article extends Component {
  // Don't call this.setState() here!

  state = {
    message: "",
    // success: false,
    selector: "",
    content: "",
    result: [],
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
    if (name === "author") {
      axios
        .get("api/articles/searchauthor/" + content)
        .then((res) => {
          console.log(res);
          this.setState({ result: res.data }, () => {
            console.log(this.state.result);
          });
          return { data: res, msg: "failed" };
        })
        .catch((err) => {
          return { data: {}, msg: "failed" };
        });
    }
    if (name === "pub_title") {
      axios
        .get("api/articles/searchtitle/" + content)
        .then((res) => {
          console.log(res);
          this.setState({ result: res.data }, () => {
            console.log(this.state.result);
          });
          return { data: res, msg: "failed" };
        })
        .catch((err) => {
          return { data: {}, msg: "failed" };
        });
    }
  };

  render() {
    const results = this.state.result;
    const module = results.map((entry) => {
      const button = <Fragment></Fragment>;
      if (!entry.eprint) {
        button = (
          <button type="button" class="btn btn-link" onclick={entry.eprint}>
            Click
          </button>
        );
      }
      return (
        <Fragment>
          <tr class="table-light">
            <th scope="row">{entry.pub_title}</th>
            <td>{entry.name}</td>
            <td>{entry.affiliation}</td>
            <td>{entry.citedby}</td>
            <td>{entry.pub_year}</td>
            <td>{entry.citations}</td>
            <td>{entry.pub_author}</td>
            <td>{button}</td>
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
                value="author"
                onChange={this.onCheck}
              />
              author
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
              <th scope="col">pub_title</th>
              <th scope="col">name</th>
              <th scope="col">affiliation</th>
              <th scope="col">citedby</th>
              <th scope="col">pub_year</th>
              <th scope="col">citations</th>
              <th scope="col">pub_author</th>
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
