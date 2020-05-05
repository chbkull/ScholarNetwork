// TODO
import React, { Component,Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from "react-router-dom";
import {getUserByEmail,getUserByID, deleteUserByID,updateUserByID} from "../action/user";
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';

export class Profile extends Component {
  // Don't call this.setState() here!

  state = {
    id : this.props.user.id,
    affiliation: '',
    interests: '',
    history:'',
    email: '',
    password: '',
    message: '',
    status:'',
    // author: '',
    // name: '',
    // url_picture: '',
    // birthYear: '',
    reset : {
      id : '',
      affiliation: '',
      interests: '',
      history:'',
      email: '',
      password: '',
    }
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

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => { console.log("state:",this.state);});
  };

  onDelete = async () => {
    var req = this.props.user;
    var res = { data:[], msg:""};

    await deleteUserByID(req,res);
    if (res.data.length === 0){
      this.setState({
        affiliation: this.state.reset.affiliation,
        interests: this.state.reset.interests,
        history:this.state.reset.history,
        email: this.state.reset.email,
        password: this.state.reset.password,
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

  render() {
    const {
      affiliation,
      interests,
      history,
      email,
      password,
      message,
      status,
      // name,
      // url_picture,
      // birthYear,
    } = this.state;

    var modular = <Fragment></Fragment>;

    if (status === "Failed" || status === "Succeeded"){
      modular = <Alert onClick = {this.onClick} message = {message} status ={status}/>
    //   modular = (<div className="alert alert-dismissible alert-warning">
    //   <button type="button" className="close" data-dismiss="alert" onClick = {this.onClick}>
    //     &times;
    //   </button>
    //   <h4 className="alert-heading">Operation {status}</h4>
    //     <p className="mb-0">Reason : {message}</p>
    //   </div>);
    }

    if (status === 'redirect'){
      console.log("redirect");

      return  <Redirect to="/" />;
    }
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>User Profile</h2>
        <div>{modular}</div>
        <form id="registerForm">
          {/* <div className="form-group">
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              onChange={this.onChange}
              value={name}
            />
          </div> */}
          <div className="form-group">
            <label>Email</label>
            <input
              className="form-control"
              // type="email"
              type="text"
              name="email"
              onChange={this.onChange}
              value={email}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              onChange={this.onChange}
              value={password}
            />
          </div>
          <div className="form-group">
            <label>Affiliation</label>
            <textarea
              className="form-control"
              type="text"
              name="affiliation"
              onChange={this.onChange}
              value={affiliation}
            />
          </div>
          <div className="form-group">
            <label>Interest</label>
            <textarea
              className="form-control"
              type="text"
              name="interests"
              onChange={this.onChange}
              value={interests}
            />
          </div>
          <div className="form-group">
            <label>History</label>
            <textarea
              className="form-control"
              type="text"
              name="history"
              onChange={this.onChange}
              value={history}
            />
          </div>
          {/* <div className="form-group">
            <label>url_picture</label>
            <textarea
              className="form-control"
              type="text"
              name="url_picture"
              onChange={this.onChange}
              value={url_picture}
            />
          </div> */}
          {/* <div className="form-group">
            <label>birthYear</label>
            <textarea
              className="form-control"
              type="text"
              name="birthYear"
              onChange={this.onChange}
              value={birthYear}
            />
          </div> */}
          <div className="form-group">
            <button type="click" className="btn btn-primary" onClick = {this.onUpdate}>
              Edit
            </button>
            {/* <div>
              <h3>{message}</h3>
            </div> */}
          </div>
        </form>
        <div className="form-group">
          <button type="click" className="btn btn-primary" onClick={this.onDelete}>
            Delete
          </button>
        </div>
      </div>
    );
  }
}


// Profile.propTypes = {
//       // getUserByEmail: PropTypes.function.isRequired,
//       // insertUser: PropTypes.function.isRequired,
//       // updateUserByEmail: PropTypes.function.isRequired,
//       deleteUserByID: PropTypes.function.isRequired,
//     };


export default Profile;
