// TODO

import React, { Component, Fragment } from "react";
import AuthorDetail from '../modular/AuthorDetail';
import {getAuthorByAffiliation, getAuthorByName} from '../action/author';
import 'regenerator-runtime/runtime';
import Form  from '../modular/Form';

export class Author extends Component {

  state = {
    selector: "",
    content: "",
    result: [],
    status:"",
    message:"",
    id:"",
    operation:"",
  };

  clear = async()=>{
    this.setState({
      content: "",
      result: [],
      status:"",
      message:"",
      id:"",
      operation:"",
    });
    console.log("clear", this.state);

  }

  prop_setState = async(target, value)=>{
    await this.setState({[target]:value});
    console.log("props",this.state);
  };

  onCheck = (e) => {
    console.log(this.state);
    this.setState({ selector: e.target.value }, () => {
      console.log(this.state);
    });
  };


  onSubmit =async (e) => {
    e.preventDefault();
    if (e.target.name === "search"){
      const name = this.state.selector;
      var msg = "";
      var s = "";
      var req = this.state;
      var res = { data:[], msg:"" };

      if (name === "name") await getAuthorByName(req,res);
      if (name === "affiliation") await getAuthorByAffiliation(req,res);
      s  = (res.msg === "server error" ? "fail" : "succeed");
      msg = res.msg;
      await this.setState({ result: res.data , status: s, message:msg, content:"", operation:"search"});
    }
    else {
      await this.setState({ id :"",operation:"insert",content:"",result:[]});
    }
  };

  onClick = async (e)=>{
    console.log("pass author id",e.target.value);
    await this.setState({ id: e.target.value}, () => {
      console.log("state", this.state);
    });

  }


  render() {

    var body = <Fragment></Fragment>;
    var table = <Fragment></Fragment>;

    if (this.state.operation === "search"){
      const results = this.state.result;
      body = results.map((entry) => {
        return (
            <tr className="table-light">
              <th scope="row"  >
                <button type="button" className="btn btn-link" value = {entry.id} onClick={this.onClick}>{entry.name}</button>
              </th>
              <td>{entry.citedby}</td>
              <td>{entry.affiliation}</td>
            </tr>
        );
      });
      table = (<table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">name</th>
          <th scope="col">citedby</th>
          <th scope="col">affiliation</th>
        </tr>
      </thead>
      <tbody>{body}</tbody>
    </table>);

    }

    var detail = <Fragment></Fragment>
    if (this.state.operation === "insert" || this.state.id !== ""){
      console.log("id",this.state.id);
      detail =  <AuthorDetail author ={this.state.id}  clear={this.clear} operation ={this.state.operation}/>;
    }

    var data = {
      content:this.state.content,
    }

    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Author CRUD</h2>

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

        <Form prop_setState ={this.prop_setState} data = {data} />

        <div className="form-group">
          <button type="submit" className="btn btn-primary" onClick={this.onSubmit} name="search">
            Search
          </button>
          <button type="submit" className="btn btn-primary" onClick={this.onSubmit} name="insert">
            Insert
          </button>
        </div>
        {table}
        {detail}

      </div>
    );
  }
}

export default Author;
