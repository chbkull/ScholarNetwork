import React, { Component,Fragment } from 'react';
import {getArticleByID} from '../action/article';

import 'regenerator-runtime/runtime';

export default class ArticleDetail extends Component {
  state = {
    name: "",
    affiliation: "",
    pub_title: "",
    pub_year:"",
    citations:"",
    pub_author:"",
    eprint:"",
    id: this.props.article,
  };

  componentDidMount = async ()=>{
    var req = this.state;
    var res = { data:[], msg:"" };


    await getArticleByID(req, res);
    console.log("return ", res.data);

    await this.setState({
      name:res.data[0].name,
      affiliation:res.data[0].affiliation,
      pub_title:res.data[0].pub_title,
      pub_year:res.data[0].pub_year,
      citations:res.data[0].citations,
      pub_author: res.data[0].pub_author,
      eprint :res.data[0].eprint,
      status: "succeed"
    });
  }

  onClick = ()=>{

    this.props.setID("");
  }



  render() {

    var module = <Fragment></Fragment>;
    if (this.state.status ==="succeed"){
      module = (

        <div className="alert alert-dismissible alert-primary">
          <button type="button" className="close" data-dismiss="alert" onClick = {this.onClick}>&times;</button>
            <div>
              <h5>Title: {this.state.pub_title}</h5>
              <h5>Authors: {this.state.pub_author}</h5>
              <h5>Published Year: {this.state.pub_year}</h5>
              <h5>Citations: {this.state.citations}</h5>
              <h5>Eprint: {this.state.eprint}</h5>
            </div>
        </div>

          );

    }


    return (
      <Fragment>{module}</Fragment>
    );


  }
}
