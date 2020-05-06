// TODO
import React, { Component,Fragment } from 'react';
import { Redirect } from "react-router-dom";
import {getUserByEmail,getUserByID, deleteUserByID,updateUserByID} from "../action/user";
import 'regenerator-runtime/runtime';
import Form from '../modular/Form';
import Alert from '../modular/Alert';



export class Profile extends Component {
  // Don't call this.setState() here!

  state = {
    id : this.props.user.id,
    affiliation: "",
    interests: "",
    history:"",
    email: "",
    password: "",
    message: "",
    status:"",
    reset : "",
  };

  componentDidMount = async()=> {
    var res = { data:[], msg:""};
    var req = await this.props.user;
    console.log(req);
    await getUserByID(req, res);
    this.setState({
      affiliation : res.data[0].affiliation,
      interests : res.data[0].interests,
      history : res.data[0].history,
      email : res.data[0].email,
      password: res.data[0].password,
      reset : res.data[0]
    });

  }


  onDelete = async () => {
    var req = this.props.user;
    var res = { data:[], msg:""};

    await deleteUserByID(req,res);
    if (res.msg!=="delete succeed"){
      this.setState({
        // affiliation: this.state.reset.affiliation,
        // interests: this.state.reset.interests,
        // history:this.state.reset.history,
        // email: this.state.reset.email,
        // password: this.state.reset.password,
        status:'Failed',
        message:"User not exist"
      });
    }else {

      this.setState(
        {
          affiliation: '',
          interests: '',
          history:'',
          email: '',
          password: '',
          reset:{
            affiliation: '',
            interests: '',
            history:'',
            email: '',
            password: '',
          },
          message: 'Successfully deleted a user',
          status:'Succeeded',
          // name: '',
          // url_picture: '',
          // birthYear: '',
        }
      );
      document.getElementById('registerForm').reset();
      this.props.setUser("");
    }

  };

  onUpdate = async (e) => {
    e.preventDefault();
    var res = { data:[], msg:""};
    var req = this.state;
    await getUserByEmail(req, res);
    if (res.data.length !== 0 && res.data[0].id !== req.id){
      this.setState({
        affiliation: this.state.reset.affiliation,
        interests: this.state.reset.interests,
        history:this.state.reset.history,
        email: this.state.reset.email,
        password: this.state.reset.password,
        status:'Failed',
        message:"email must be unique"
      });

    }
    else{
      await updateUserByID(req, res);
      this.setState({
        reset:res.data,
        status:'Succeeded',
        message: 'Successfully updated user profile',
      });
      document.getElementById('registerForm').reset();
    }
  };


  onClick = ()=>{
    if (this.state.message === 'Successfully deleted a user'){
      this.setState({status:'redirect'});
    }
    else{
      this.setState({message: '',status:'',});
    }
  }

  prop_setState = async(target, value)=>{
    await this.setState({[target]:value});
    console.log(this.state);
  }

  render() {
    const {
      message,
      status,
    } = this.state;

    var data = {
      email: this.state.email,
      password: this.state.password,
      affiliation: this.state.affiliation,
      interests: this.state.interests,
      history: this.state.history,
    };

    var modular = <Fragment></Fragment>;

    if (status === "Failed" || status === "Succeeded"){
      modular = <Alert onClick = {this.onClick} message = {message} status ={status}/>
    }

    if (status === 'redirect'){
      console.log("redirect");

      return  <Redirect to="/" />;
    }
    return (

      <div className="card card-body mt-4 mb-4">
        <h2>User Profile</h2>
        <div>{modular}</div>
        <Form prop_setState = {this.prop_setState} data = {data} />

        <div className="form-group">
          <button type="click" className="btn btn-primary" onClick = {this.onUpdate}>
            Edit
          </button>
        </div>
        <div className="form-group">
          <button type="click" className="btn btn-primary" onClick={this.onDelete}>
            Delete
          </button>
        </div>
      </div>
    );
  }
}




export default Profile;


