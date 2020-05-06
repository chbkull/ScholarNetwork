import React, { Component, Fragment } from 'react'
import {articlesInJournal,articlesFromPublisher,journalAvgHindex,publisherAvgHindex,journalCitedByStat,
  publisherJournalPublished,authorJournalPublishedIn,publisherCitedByStat} from '../action/complex';
import Form from '../modular/Form';

export default class Complex extends Component {
  state = {
    selector: "", //interests, affiliation, journals
    content:"",
    placeholder:"",
    results : [],
    labels : [],
    keys : [],
    status : "",
    table:<Fragment></Fragment>,

  };

  onCheck = async (e) => {
    var tmp = "";
    switch(e.target.value) {
      case "articlesInJournal":
        tmp = "please input author journal";
        break;
      case "articlesFromPublisher":
        tmp = "please input publisher";
        break;
      default:
        tmp = "input is not needed";
    }
    await this.setState({ selector: e.target.value, placeholder:tmp});

  };

  // form on changes
  onChange = async (e) => {
    await this.setState({ content: e.target.value});
  };

  onSubmit = async (e) => {
    e.preventDefault();

    var req = this.state;
    var res = { data:[], msg:"" };
    var lbs = [];
    var kys = [];
    switch(this.state.selector) {
      case "articlesInJournal":
        await articlesInJournal(req, res);
        kys = ["int_1","str_1","int_2","str_2","str_3" ];
        lbs = ["journals.id","journals.name", "articles.id", "articles.title", "articles.authors"];
        break;
      case "articlesFromPublisher":
        await articlesFromPublisher(req, res);
        kys = ["int_1","str_1","int_2","str_2","str_3"]
        lbs = ["publishers.id","publishers.name", "articles.id", "articles.title", "articles.authors"];
        break;
      case "journalAvgHindex":
        await journalAvgHindex(res);
        kys = ["int_1","str_1","dec_1","int_2"];
        lbs = ["journals.id","journals.name","average_h_index","number_of_authors"];
        break;
      case "publisherAvgHindex":
        await publisherAvgHindex(res);
        kys = ["int_1","str_1","dec_1","int_2"];
        lbs = ["publishers.id","publishers.name","average_h_index","number_of_authors"];
        break;
      case "publisherJournalPublished":
        await publisherJournalPublished(res);
        kys = ["int_1","str_1","int_2"];
        lbs = ["publishers.id","publishers.name","number_of_journals"];
        break;
      case "authorJournalPublishedIn":
        await authorJournalPublishedIn(res);
        kys = ["int_1","str_1","int_2"];
        lbs = ["authors.id","authors.name","number_of_journals"];
        break;
      case "journalCitedByStat":
        await journalCitedByStat(res);
        kys = ["int_1","str_1","dec_1","int_2","int_3"];
        lbs = ["journals.id","journals.name","average_citedby"," total_citedby","number_of_articles"];
        break;
      default:
        await publisherCitedByStat(res);
        kys = ["int_1","str_1","dec_1","int_2","int_3"];
        lbs = ["publisher.id","publisher.name","average_citedby"," total_citedby","number_of_articles"];
        break;
    };



    var bdy = <Fragment></Fragment>;
    var tbl = <Fragment></Fragment>;

    bdy = res.data.map((entry) => {
      var rows = kys.map((key)=>{
        console.log("value",entry[key]);
        if (key!=="int_1") return <td>{entry[key]}</td>;
        });
        return (
            <tr className="table-light">
              <th scope="row">{entry["int_1"]}</th>
              {rows}
            </tr>
        );
      });

    var cols = lbs.map((label)=>{
        return <th scope ="col">{label}</th>;
      });
      tbl = (<table className="table table-hover">
    <thead>
      <tr>
        {cols}
      </tr>
    </thead>
    <tbody>{bdy}</tbody>
  </table>);

    this.setState({ table:tbl,content: "",  results:res.data, keys:kys, labels:lbs, status:"succeed"});

  };



  render() {
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Complex Queries</h2>
        <fieldset className="form-group">
          <legend>Functions </legend>
          <div className="form-check">
            <label className="form-check-label">
              <input
                type="radio"
                className="form-check-input"
                name="optionsRadios"
                id="optionsRadios1"
                value="articlesInJournal"
                onChange={this.onCheck}
              />
               Published_in
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input
                type="radio"
                className="form-check-input"
                name="optionsRadios"
                id="optionsRadios2"
                value="articlesFromPublisher"
                onChange={this.onCheck}
              />
              Published_by
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input
                type="radio"
                className="form-check-input"
                name="optionsRadios"
                id="optionsRadios2"
                value="journalAvgHindex"
                onChange={this.onCheck}
              />
              Computes journals' average h-index
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input
                type="radio"
                className="form-check-input"
                name="optionsRadios"
                id="optionsRadios2"
                value="publisherAvgHindex"
                onChange={this.onCheck}
              />
              Computes all publishers' average h-index
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input
                type="radio"
                className="form-check-input"
                name="optionsRadios"
                id="optionsRadios2"
                value="publisherJournalPublished"
                onChange={this.onCheck}
              />
              Computes the number of journals a publisher has published
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input
                type="radio"
                className="form-check-input"
                name="optionsRadios"
                id="optionsRadios2"
                value="authorJournalPublishedIn"
                onChange={this.onCheck}
              />
              Computes the number of journals an author has contributed to
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input
                type="radio"
                className="form-check-input"
                name="optionsRadios"
                id="optionsRadios2"
                value="journalCitedByStat"
                onChange={this.onCheck}
              />
              Computes citedby statistics for a journal (avg, total, num articles)
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input
                type="radio"
                className="form-check-input"
                name="optionsRadios"
                id="optionsRadios2"
                value="publisherCitedByStat"
                onChange={this.onCheck}
              />
              Computes citedby statistics for a publisher (avg, total, num articles)
            </label>
          </div>
        </fieldset>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>content</label>
            <input
              className="form-control"
              type="content"
              name="content"
              onChange={this.onChange}
              value={this.state.content}
              placeholder = {this.state.placeholder}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </div>
        </form>
        {this.state.table}
      </div>
    )

}




}
