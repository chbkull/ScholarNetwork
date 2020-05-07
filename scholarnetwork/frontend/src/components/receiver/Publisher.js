import React, { Component, Fragment } from 'react'
import 'regenerator-runtime/runtime';
import {getPublisherByName} from '../action/publisher';
import PublisherDetail from '../modular/PublisherDetail';
export default class Publisher extends Component {

  state = {
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

  // form on changes
  onChange = async (e) => {
    await this.setState({ content: e.target.value});
  };

  onSubmit =async (e) => {
    e.preventDefault();
    if (e.target.name === "search"){
      var msg = "";
      var s = "";
      var req = this.state;
      var res = { data:[], msg:"" };

      await getPublisherByName(req,res);
      s  = (res.msg === "server error" ? "fail" : "succeed");
      msg = res.msg;
      await this.setState({ result: res.data , status: s, message:msg, content:"", operation:"search"});
    }
    else {
      await this.setState({ id :"",operation:"insert",content:"",result:[]});
    }
  };




  onClick = async (e)=>{
    console.log("pass id",e.target.value);
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
                <button type="button" className="btn btn-link" value = {entry.id} onClick={this.onClick}>{entry.id}</button>
              </th>
              <td>{entry.name}</td>
            </tr>
        );
      });
      table = (<table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">publisher_name</th>
        </tr>
      </thead>
      <tbody>{body}</tbody>
    </table>);

    }

    var detail = <Fragment></Fragment>
    if (this.state.operation === "insert" || this.state.id !== ""){
      console.log("id",this.state.id);
      detail =  <PublisherDetail publisher ={this.state.id}  clear={this.clear} operation ={this.state.operation}/>;
    }

    return (
     <Fragment>
       <div className="card card-body mt-4 mb-4">
       <h2>Publisher CRUD</h2>
       <form>
         <div className="form-group">
           <label>content</label>
           <input
             className="form-control"
             type="content"
             name="content"
             onChange={this.onChange}
             value={this.state.content}
             placeholder = "please input publisher name"
           />
         </div>
       </form>
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
     </Fragment>
    )
  }
}
