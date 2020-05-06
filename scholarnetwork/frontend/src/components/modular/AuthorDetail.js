import React, { Component,Fragment } from 'react';
import {getAuthorByID, insertAuthor, deleteAuthorByID, updateAuthorByID} from '../action/author';
import 'regenerator-runtime/runtime';
import { VictoryBar,VictoryChart,VictoryAxis, VictoryTheme } from 'victory';
import Form from './Form';
import Alert from './Alert';

export class AuthorDetail extends Component {

  state = {
    id: this.props.author,
    name:"",
    affiliation:"",
    citedby:0,
    citedby_5:0,
    h_index:0,
    h_index_5:0,
    i10_index:0,
    i10_index_5:0,
    citedby_history:"",
    page:0,
    email :"",
    interests :"",
    url_picture :"",
    reset : "",
    status:"",
    message:"",
    operation:this.props.operation,
    buttons:"",
    module:"",
  }


  prop_setState= async(target, value)=>{
    await this.setState({[target]:value});
    console.log(this.state);
  }

  componentDidMount = async ()=>{
    console.log("MOUNT");
    var req = this.state;
    var res = { data:[], msg:"" };
    var btn = <Fragment></Fragment>;
    var mdl = <Fragment></Fragment>;
    if (this.state.operation === "insert"){
      btn =(
      <div>
        <button type="button" className="btn btn-primary" onClick={this.onSubmit} name="confirm" onClick = {this.onInsert}>Confirm</button>
        <button type="button" className="btn btn-primary" onClick={this.onSubmit} name="clear" onClick = {this.onClear}>Clear</button>
      </div>);
      mdl = <Fragment></Fragment>;
    }

    if (this.state.operation === "search"){
      await getAuthorByID(req, res);
      await this.setState({
        id :this.props.author,
        name:res.data[0].name,
        affiliation:res.data[0].affiliation,
        citedby:res.data[0].citedby,
        citedby_5:res.data[0].citedby_5,
        h_index:res.data[0].h_index,
        h_index_5:res.data[0].h_index_5,
        i10_index:res.data[0].i10_index,
        i10_index_5:res.data[0].i10_index_5,
        citedby_history:res.data[0].citedby_history,
        // citedby_history:'{"1999":10, "2000":30, "2001":100}',
        page:res.data[0].page,
        email: res.data[0].email,
        interests :res.data[0].interests,
        url_picture :res.data[0].url_picture,
        reset : res.data[0],
      });

      btn =(
        <div>
          <button type="button" className="btn btn-primary" onClick={this.onSubmit} name="edit" onClick={this.onUpdate} >Edit</button>
          <button type="button" className="btn btn-primary" onClick={this.onSubmit} name="delete" onClick={this.onDelete}>delete</button>
        </div>);

      var history = JSON.parse(this.state.citedby_history);
      var axis_x = Object.keys(history);
      var axis_y = [];
      var arr = [];
      for (var i = 0; i < axis_x.length; i++) {
        axis_y.push(history[axis_x[i]]);
        arr.push({year:axis_x[i],citations:axis_y[i]});
      }

      mdl =(
      <Fragment>
        <VictoryChart theme={VictoryTheme.grayscale} domainPadding={20} >
          <VictoryAxis tickValues={axis_y} tickFormat={axis_x}/>
          <VictoryAxis dependentAxis tickFormat={(x) => (`${x}`)}/>
          <VictoryBar data= {arr} x="year" y="citations" labels={axis_y} />
        </VictoryChart>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Statisctic</th>
              <th scope="col">All</th>
              <th scope="col">Since 2015</th>
            </tr>
          </thead>
          <tbody>
            <tr className="table-light">
              <th scope="row">Citation</th>
              <td>{this.state.citedby}</td>
              <td>{this.state.citedby_5}</td>
            </tr>
            <tr className="table-light">
              <th scope="row">h-index</th>
              <td>{this.state.h_index}</td>
              <td>{this.state.h_index_5}</td>
            </tr>
            <tr className="table-light">
              <th scope="row">i10-index</th>
              <td>{this.state.i10_index}</td>
              <td>{this.state.i10_index_5}</td>
            </tr>
          </tbody>
        </table>
        <img src={this.state.url_picture} />
      </Fragment>
      );
    }
    await this.setState({buttons:btn, module:mdl});
  }

  onDelete = async () => {
    var req = this.state;
    var res = { data:[], msg:""};


    if(this.state.id === ""){
      this.setState({
        message: 'Author not exist',
        status:'Failed',
      });
    }
    else {
        await deleteAuthorByID(req,res);
        this.clear();
        this.setState({
          id: "",
          reset : "",
          operation:"delete",
          message: 'Delete succeed',
          status:'Succeeded',
        });

      }


  };


  onUpdate = async () => {
    var res = { data:[], msg:""};
    var req = this.state;
    if (this.state.h_index===""||this.state.h_index_5===""||this.state.i10_index===""
    ||this.state.i10_index_5===""||this.citedby===""||this.state.citedby_5===""||this.state.page===""){
      this.setState({
        status:'Failed',
        message: 'Statistical attributes must be integer',
      });

    }
    else if(this.state.name ===""){
      this.setState({
        status:'Failed',
        message: 'Name is required'
      });
    }else {
      await updateAuthorByID(req, res);
      if (res.msg === "update succeed"){
        this.setState({
          reset:res.data,
          status:'Succeeded',
          message: 'Successfully updated author',
          operation:"update",
        });
      }

    }
  };

  onInsert = async()=>{
    var res = { data:[], msg:""};
    var req = this.state;
    console.log("insert",req);
    if (this.state.h_index===""||this.state.h_index_5===""||this.state.i10_index===""
    ||this.state.i10_index_5===""||this.state.citedby===""||this.state.citedby_5===""||this.state.page===""){
      this.setState({
        status:'Failed',
        message: 'Numerical attributes must be integer',
      });
    }
    else if(this.state.name ===""){
      this.setState({
        status:'Failed',
        message: 'Name is required'
      });
    }
    else {
      await insertAuthor(req, res);
      this.setState({
        reset:res.data,
        status:'Succeeded',
        message: 'Insert succeed',
        operation:"insert",
      });
    }
    console.log(this.state);
    await this.clear();

  }

  clear = async () =>{
    await this.setState({
      name:"",
      affiliation:"",
      citedby:0,
      citedby_5:0,
      h_index:0,
      h_index_5:0,
      i10_index:0,
      i10_index_5:0,
      citedby_history:"",
      page:0,
      email :"",
      interests :"",
      url_picture :"",
    });
  }

  onClear = async()=>{
    this.clear();
  }


  onClose = async()=>{
    this.clear();
    this.props.clear();
  }

  onClick = async()=>{
    this.clear();
    this.setState({
      message:"",
      status:""
    })
  }

  render() {

    var data = {
      name:this.state.name,
      affiliation:this.state.affiliation,
      citedby:this.state.citedby,
      citedby_5:this.state.citedby_5,
      h_index:this.state.h_index,
      h_index_5:this.state.h_index_5,
      i10_index:this.state.i10_index,
      i10_index_5:this.state.i10_index_5,
      citedby_history:this.state.citedby_history,
      email :this.state.email,
      interests :this.state.interests,
      url_picture :this.state.url_picture,
    }

    const message = this.state.message;
    const status = this.state.status;
    var modular = <Fragment></Fragment>;
    if (status === "Failed" || status === "Succeeded"){
      modular = <Alert onClick = {this.onClick} message = {message} status ={status}/>
    }

    return (
      <Fragment>

        {modular}
        <div className="alert alert-dismissible alert-primary">
          <button type="button" className="close" data-dismiss="alert" onClick = {this.onClose}>&times;</button>
            <div>
              {this.state.module}
              <Form prop_setState = {this.prop_setState} data = {data} />
              {this.state.buttons}
            </div>
        </div>
      </Fragment>
    );
  }
}

export default AuthorDetail;



