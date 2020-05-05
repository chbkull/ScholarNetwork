// TODO

import React, { Component, Fragment } from "react";
import { getArticleByTitle, getArticleByAuthor } from "../action/article";
import 'regenerator-runtime/runtime';
import ArticleDetail from '../modular/ArticleDetail';

export class Article extends Component {

  state = {
    selector: "",
    content:"",
    result: [],
    status:"",
    message:"",
    id:"",
  };

  setID = (i) => {
    this.setState({ id: i }, () => {
      console.log(this.state);
    });
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

  onSubmit = async (e) => {
    e.preventDefault();
    const name = this.state.selector;
    var msg = "";
    var s = "";
    var req = this.state;
    var res = { data:[], msg:"" };

    if (name === "author") await getArticleByAuthor(req,res);
    if (name === "pub_title") await getArticleByTitle(req,res);
    s  = (res.msg === "server error" ? "fail" : "succeed");
    msg = res.msg;
    this.setState({ result: res.data , status: s, message:msg}, () => {
      console.log(this.state.result);
    });
  };

  onClick = (e)=>{

    this.setState({ id: e.target.value }, () => {
      console.log(this.state);
    });

  }


  render() {

    const results = this.state.result;

    const module = results.map((entry) => {

      var button = <Fragment></Fragment>;
      if (!entry.eprint) {

        button = (
          <button type="button" className= "btn btn-outline-info" >
             <a href= {entry.eprint}>Click</a>
            </button>
        );
      }

      return (
        <Fragment>
          <tr className="table-light">
            <th scope="row"  >
              <button type="button" className="btn btn-link" value = {entry.id} onClick={this.onClick}>{entry.pub_title}</button>
            </th>
            {/* <td>{entry.name}</td>
            <td>{entry.affiliation}</td> */}
            <td>{entry.pub_year}</td>
            <td>{entry.citations}</td>
            <td>{entry.pub_author}</td>
            <td>{button}</td>
          </tr>
        </Fragment>
      );
    });

    var detail = <Fragment></Fragment>;
    if (this.state.id !== ""){

      detail =  <ArticleDetail article ={this.state.id} setID = {this.setID }/>
    }

    return (
      <div className="card card-body mt-4 mb-4">
        <h2> Article CRUD</h2>
        {detail}
        <fieldset className="form-group">
          <legend>Key Word</legend>
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
              {/* <th scope="col">name</th>
              <th scope="col">affiliation</th> */}
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
