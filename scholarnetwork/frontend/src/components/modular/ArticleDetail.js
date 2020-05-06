import React, { Component,Fragment } from 'react';
import {getArticleByID,insertArticle, deleteArticleByID, updateArticleByID} from '../action/article';
import { getPublisherByID} from '../action/publisher';
import {getAuthorByID} from '../action/author';
import {getJournalByID} from '../action/journal';
import 'regenerator-runtime/runtime';
import Form from './Form';
import Alert from './Alert';

export default class ArticleDetail extends Component {
  state = {
    id:this.props.article,
    title :"",
    author_id: 0,
    citations :0,
    journal_id:null,
    publisher_id:null,
    year :0,
    authors :"",
    issue:"",
    eprint :"",
    url:"",
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
      await getArticleByID(req, res);
      await this.setState({
        id:this.props.article,
        title :res.data[0].title,
        author_id:res.data[0].author_id,
        authors :res.data[0].authors,
        citations :res.data[0].citations,
        journal_id:res.data[0].journal_id,
        year :res.data[0].year,
        issue:res.data[0].issue,
        publisher_id:res.data[0].publisher_id,
        eprint :res.data[0].eprint,
        url:res.data[0].url,
        reset : res.data[0]
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
        message: 'Article not exist',
        status:'Failed',
      });
    }
    else {
        await deleteArticleByID(req,res);
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
    if(this.state.journal_id===0) this.setState({journal_id:null});
    if(this.publisher_id===0)this.setState({publisher_id:null});
    if (this.state.author_id===""||this.state.citations===""|| this.state.year===""){
      this.setState({
        status:'Failed',
        message: 'id and numerical attributes must be integer',
      });
    }
    else if(this.state.title ===""||this.state.authors ===""||this.state.author_id===0){
      this.setState({
        status:'Failed',
        message: 'Title, authors and first author is required'
      });
    }
    else {
      var response = [];
      for (var i = 0; i < 3 ; i++){
        response.push({ data:[], msg:""});
      }

      var num = 1;
      await getAuthorByID({id:this.state.author_id}, response[0]);

      if (this.state.publisher_id){
        num= num+1;
        await getPublisherByID({id:this.state.publisher_id},response[1]);
      }
      if (this.state.journal_id){
        num= num+1;
        await getJournalByID({id:this.state.journal_id},response[2]);
      }
      if (response[0].data.length + response[1].data.length + response[2].data.length !== num){
        this.setState({
          status:'Failed',
          message: 'foreign keys not exist'
        });
      }
      else{
        await updateArticleByID(req, res);
        if (res.msg === "update succeed"){
          this.setState({
            reset:res.data,
            status:'Succeeded',
            message: 'Successfully updated article',
            operation:"update",
          });
        }

      }

    }

  };

  onInsert = async()=>{
    var res = { data:[], msg:""};
    var req = this.state;
    console.log("insert",req);
    if(this.state.journal_id===0) this.setState({journal_id:null});
    if(this.publisher_id===0)this.setState({publisher_id:null});
    if (this.state.author_id===""||this.state.citations===""|| this.state.year===""){
      this.setState({
        status:'Failed',
        message: 'id and numerical attributes must be integer',
      });
    }
    else if(this.state.title ===""||this.state.authors ===""||this.state.author_id===0){
      this.setState({
        status:'Failed',
        message: 'Title, authors and first author is required'
      });
    }
    else{
      var response = [];
      for (var i = 0; i < 3 ; i++){
        response.push({ data:[], msg:""});
      }

      var num = 1;
      await getAuthorByID({id:this.state.author_id}, response[0]);

      if (this.state.publisher_id){
        num= num+1;
        await getPublisherByID({id:this.state.publisher_id},response[1]);
      }
      if (this.state.journal_id){
        num= num+1;
        await getJournalByID({id:this.state.journal_id},response[2]);
      }
      if (response[0].data.length + response[1].data.length + response[2].data.length !== num){
        this.setState({
          status:'Failed',
          message: 'foreign keys not exist'
        });
      }
      else {
        await insertArticle(req, res);
        this.setState({
          reset:res.data,
          status:'Succeeded',
          message: 'Insert succeed',
          operation:"insert",
        });
      }
    }
    console.log(this.state);
    await this.clear();
  }

  clear = async () =>{
    await this.setState({
      title :"",
      authors :"",
      citations :0,
      author_id:0,
      journal_id:null,
      publisher_id:null,
      year :0,
      issue:"",
      eprint :"",
      url:"",
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

  onChange = async (e) => {
    await this.props.prop_setState(e.target.name,e.target.value);
    console.log("set props");
  };

  render() {
      var data = {
        title :this.state.title,
        author_id:this.state.author_id,
        authors :this.state.authors,
        citations :this.state.citations,
        journal_id:this.state.journal_id,
        year :this.state.year,
        issue:this.state.issue,
        publisher_id:this.state.publisher_id,
        eprint :this.state.eprint,
        url:this.state.url
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
