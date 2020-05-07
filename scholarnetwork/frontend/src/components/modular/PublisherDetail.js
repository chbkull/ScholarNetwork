import React, { Component,Fragment } from 'react';
import {getPublisherByID,insertPublisher, deletePublisherByID, updatePublisherByID} from '../action/publisher';
import 'regenerator-runtime/runtime';
import Form from './Form';
import Alert from './Alert';

export default class PublisherDetail extends Component {
  state = {
    id:this.props.publisher,
    name:"",
    reset : "",
    status:"",
    message:"",
    operation:this.props.operation,
    buttons:"",
    module:"",

  };

  prop_setState= async(target, value)=>{
    await this.setState({[target]:value});
    console.log(this.state);
  }

  componentDidMount = async ()=>{
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
      await getPublisherByID(req, res);
      await this.setState({
        id:this.props.publisher,
        name:res.data[0].name,
        reset : res.data[0],
      });
      btn =(
        <div>
          <button type="button" className="btn btn-primary" onClick={this.onSubmit} name="edit" onClick={this.onUpdate} >Edit</button>
          <button type="button" className="btn btn-primary" onClick={this.onSubmit} name="delete" onClick={this.onDelete}>delete</button>
        </div>);
    }
    await this.setState({buttons:btn, module:mdl});

  }

  onDelete = async () => {
    var req = this.state;
    var res = { data:[], msg:""};

    if(this.state.id === ""){
      this.setState({
        message: 'Publisher not exist',
        status:'Failed',
      });
    }
    else {
        await deletePublisherByID(req,res);
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


    if(this.state.name ===""){
      this.setState({
        status:'Failed',
        message: 'Publisher name is required'
      });
    }
    else {
        await updatePublisherByID(req, res);
        if (res.msg === "update succeed"){
          this.setState({
            reset:res.data,
            status:'Succeeded',
            message: 'Update succeed',
            operation:"update",
          });

      }

    }

  };
  onInsert = async()=>{
    var res = { data:[], msg:""};
    var req = this.state;
    if(this.state.name ===""){
      this.setState({
        status:'Failed',
        message: 'Publisher name is required'
      });
    }
    else {

        await insertPublisher(req, res);
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
    await this.setState({name:""});
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

  onChange = async (e) => {
    await this.props.prop_setState(e.target.name,e.target.value);
    console.log("set props");
  };



  render() {
    var data = {
      name:this.state.name,
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
              <Form prop_setState = {this.prop_setState} data = {data} />
              {this.state.buttons}
            </div>
        </div>
      </Fragment>
    );
  }
}
