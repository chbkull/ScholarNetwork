// // TODO

// import React, { Component, Fragment } from "react";
// import { getArticleByTitle, getArticleByAuthor } from "../action/article";
// import 'regenerator-runtime/runtime';
// import ArticleDetail from '../modular/ArticleDetail';
// import Form from '../modular/Form';
// import { async } from "regenerator-runtime/runtime";

// export class Article extends Component {

//   state = {
//     selector: "",
//     content:"",
//     result: [],
//     status:"",
//     message:"",
//     id:"",
//     operation:"",
//   };

//   clear = async()=>{
//     this.setState({
//       content: "",
//       result: [],
//       status:"",
//       message:"",
//       id:"",
//       operation:"",
//     });
//   }


//   prop_setState = async(target, value)=>{
//     await this.setState({[target]:value});
//   }


//   onCheck = async(e) => {

//     await this.setState({ selector: e.target.value });
//   };



//   onSubmit = async (e) => {

//     if (e.target.name === "search"){
//       const name = this.state.selector;
//       var msg = "";
//       var s = "";
//       var req = this.state;
//       var res = { data:[], msg:"" };

//       if (name === "author") await getArticleByAuthor(req,res);
//       if (name === "pub_title") await getArticleByTitle(req,res);
//       s  = (res.msg === "server error" ? "fail" : "succeed");
//       msg = res.msg;
//       this.setState({ result: res.data , status: s, message:msg, content:"", operation:"search"}, () => {
//         console.log(this.state.result);
//       });
//     }
//     else{
//       await this.setState({ id :"",operation:"insert",content:"", result:[]});
//     }
//   };

//   onClick = async(e)=>{
//     await this.setState({ id: e.target.value });
//   }


//   render() {

//     var body = <Fragment></Fragment>;
//     var table = <Fragment></Fragment>;


//     if (this.state.operation === "search"){
//       const results = this.state.result;
//       body = results.map((entry) => {
//         return (
//             <tr className="table-light">
//               <th scope="row"  >
//                 <button type="button" className="btn btn-link" value = {entry.id} onClick={this.onClick}>{entry.title}</button>
//               </th>
//               <td>{entry.authors}</td>
//               <td>{entry.citations}</td>
//               <td>{entry.year}</td>
//             </tr>
//         );
//       });
//       table = (<table className="table table-hover">
//       <thead>
//         <tr>
//           <th scope="col">title</th>
//           <th scope="col">authors</th>
//           <th scope="col">citations</th>
//           <th scope="col">year</th>
//         </tr>
//       </thead>
//       <tbody>{body}</tbody>
//     </table>);

//     }

//     var detail = <Fragment></Fragment>;


//     if (this.state.operation === "insert" || this.state.id !== ""){
//       console.log("id",this.state.id);
//       detail =  <ArticleDetail article ={this.state.id}  clear={this.clear} operation ={this.state.operation} />;
//     }

//     var data = {
//       content:this.state.content,
//     }


//     return (
//       <Fragment>
//       <div className="card card-body mt-4 mb-4">
//         <h2> Article CRUD</h2>
//         <fieldset className="form-group">
//           <legend>Key Word</legend>
//           <div className="form-check">
//             <label className="form-check-label">
//               <input
//                 type="radio"
//                 className="form-check-input"
//                 name="optionsRadios"
//                 id="optionsRadios1"
//                 value="pub_title"
//                 onChange={this.onCheck}
//               />
//               pub_title
//             </label>
//           </div>
//           <div className="form-check">
//             <label className="form-check-label">
//               <input
//                 type="radio"
//                 className="form-check-input"
//                 name="optionsRadios"
//                 id="optionsRadios2"
//                 value="author"
//                 onChange={this.onCheck}
//               />
//               author
//             </label>
//           </div>
//         </fieldset>

//         <Form prop_setState ={this.prop_setState} data = {data} />


//         <div className="form-group">
//           <button type="submit" className="btn btn-primary" onClick={this.onSubmit} name="search">
//             Search
//           </button>
//           <button type="submit" className="btn btn-primary" onClick={this.onSubmit} name="insert">
//             Insert
//           </button>
//         </div>
//         {table}
//         {detail}
//       </div>
//       </Fragment>

//     );
//   }
// }

// export default Article;

// TODO

import React, { Component, Fragment } from "react";
import { getArticleByTitle, getArticleByAuthor } from "../action/article";
import 'regenerator-runtime/runtime';
import ArticleDetail from '../modular/ArticleDetail';
import Form from '../modular/Form';
import { async } from "regenerator-runtime/runtime";

export class Article extends Component {

  state = {
    selector: "",
    content:"",
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
  }


  prop_setState = async(target, value)=>{
    await this.setState({[target]:value});
  }


  onCheck = async(e) => {

    await this.setState({ selector: e.target.value });
  };



  onSubmit = async (e) => {

    if (e.target.name === "search"){
      const name = this.state.selector;
      var msg = "";
      var s = "";
      var req = this.state;
      var res = { data:[], msg:"" };

      if (name === "author") await getArticleByAuthor(req,res);
      if (name === "pub_title") await getArticleByTitle(req,res);
      s  = (res.msg === "server error" ? "fail" : "succeed");
      msg = res.msg;
      this.setState({ result: res.data , status: s, message:msg, content:"", operation:"search"}, () => {
        console.log(this.state.result);
      });
    }
    else{
      await this.setState({ id :"",operation:"insert",content:"", result:[]});
    }
  };

  onClick = async(e)=>{
    await this.setState({ id: e.target.value });
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
                <button type="button" className="btn btn-link" value = {entry.id} onClick={this.onClick}>{entry.title}</button>
              </th>
              <td>{entry.authors}</td>
              <td>{entry.citations}</td>
              <td>{entry.year}</td>
            </tr>
        );
      });
      table = (<table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">title</th>
          <th scope="col">authors</th>
          <th scope="col">citations</th>
          <th scope="col">year</th>
        </tr>
      </thead>
      <tbody>{body}</tbody>
    </table>);

    }

    var detail = <Fragment></Fragment>;


    if (this.state.operation === "insert" || this.state.id !== ""){
      console.log("id",this.state.id);
      detail =  <ArticleDetail article ={this.state.id}  clear={this.clear} operation ={this.state.operation} />;
    }

    var data = {
      content:this.state.content,
    }


    return (
      <Fragment>
      <div className="card card-body mt-4 mb-4">
        <h2> Article CRUD</h2>
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
      </Fragment>

    );
  }
}

export default Article;
