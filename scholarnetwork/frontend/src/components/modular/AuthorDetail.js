import React, { Component,Fragment } from 'react';
import {getAuthorByID} from '../action/author';
import 'regenerator-runtime/runtime';
export class AuthorDetail extends Component {

  state = {
    id: this.props.author,
    name:"",
    affiliation:"",
    citedby:"",
    attributes:"",
    page:"",
    email :"",
    interests :"",
    url_picture :"",
    status:""

  }

  componentDidMount = async ()=>{
    var req = this.state;
    var res = { data:[], msg:"" };

    console.log("mount", this.state.id);

    await getAuthorByID(req, res);
    await this.setState({
      name:res.data[0].name,
      affiliation:res.data[0].affiliation,
      citedby:res.data[0].citedby,
      attributes:res.data[0].attributes,
      page:res.data[0].page,
      email: res.data[0].email,
      interests :res.data[0].interests,
      url_picture :res.data[0].url_picture,
      status: "succeed"
    });
    console.log("attributes",this.state.attributes);
    console.log(this.state.attributes.split(","));

  }

  onClick = ()=>{
    this.props.setID("");
  }

  render() {
    var module = <Fragment></Fragment>;

    if (this.state.status ==="succeed"){
      console.log("where ",this.state.status);
      module = (
        <Fragment>

        <div className="alert alert-dismissible alert-primary">
          <button type="button" className="close" data-dismiss="alert" onClick = {this.onClick}>&times;</button>
            <div>
              <img src={this.state.url_picture} />
              <h5>Name: {this.state.name}</h5>
              <h5>Affiliation: {this.state.affiliation}</h5>
              <h5>Email: {this.state.email}</h5>
              <h5>CitedBy: {this.state.citedby}</h5>
              <h5>Interests: </h5>
              <h5>{this.state.interests}</h5>
            </div>
        </div>


      </Fragment>
      )
    }


    return (
      <Fragment>{module}</Fragment>
    );
  }
}

export default AuthorDetail;
