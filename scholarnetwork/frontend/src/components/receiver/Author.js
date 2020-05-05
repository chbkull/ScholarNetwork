// TODO

import React, { Component, Fragment } from "react";
import AuthorDetail from '../modular/AuthorDetail';
import {getAuthorByAffiliation, getAuthorByName} from '../action/author';
import 'regenerator-runtime/runtime';
export class Author extends Component {

  state = {
    selector: "",
    content: "",
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

  onSubmit =async (e) => {
    e.preventDefault();
    const name = this.state.selector;
    var msg = "";
    var s = "";
    var req = this.state;
    var res = { data:[], msg:"" };

    if (name === "name") await getAuthorByName(req,res);
    if (name === "affiliation") await getAuthorByAffiliation(req,res);
    s  = (res.msg === "server error" ? "fail" : "succeed");
    msg = res.msg;
    await this.setState({ result: res.data , status: s, message:msg, content:""}, () => {
      console.log(this.state.result);
    });

  };

  onClick = async (e)=>{

    console.log("pass author id",e.target.value);
    await this.setState({ id: e.target.value }, () => {
      console.log("state", this.state);
    });

  }


  render() {
    const results = this.state.result;

    var module = results.map((entry) => {

      return (

        <Fragment>
          <tr className="table-light">
            <th scope="row"  >
              <button type="button" className="btn btn-link" value = {entry.id} onClick={this.onClick}>{entry.name}</button>
            </th>
            <td>{entry.citedby}</td>
            <td>{entry.email}</td>
            <td>{entry.affiliation}</td>
            {/* <td>{entry.user}</td> */}
          </tr>
        </Fragment>
      );
    });

    var detail = <Fragment></Fragment>

    if (this.state.id !== ""){
      console.log("id",this.state.id);
      detail =  <AuthorDetail author ={this.state.id} setID = {this.setID }/>;
    }



    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Author CRUD</h2>
        {detail}
        <fieldset className="form-group">
          <legend>Key Word </legend>
          <div className="form-check">
            <label className="form-check-label">
              <input
                type="radio"
                className="form-check-input"
                name="optionsRadios"
                id="optionsRadios1"
                value="affiliation"
                onChange={this.onCheck}
              />
              affiliation
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input
                type="radio"
                className="form-check-input"
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
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">name</th>
              <th scope="col">citedby</th>
              <th scope="col">email</th>
              <th scope="col">affiliation</th>
              {/* <th scope="col">user account</th> */}
            </tr>
          </thead>
          <tbody>{module}</tbody>
        </table>
      </div>
    );
  }
}

export default Author;
