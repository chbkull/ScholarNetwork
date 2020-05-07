
import React, { Component, Fragment } from 'react'
import 'regenerator-runtime/runtime';
import {config,styling, complexCypher} from "../action/neo4j";
export default class Network extends Component {
  state = {
    selector: "", //interests, affiliation, journals
    content:"",
    viz:"",
    placeholder:"",

  };

  componentDidMount=async ()=>{

    var tmp = new NeoVis.default(config);
    await this.setState({viz:tmp});
    await this.state.viz.render();

  }

  onCheck = async (e) => {
    var tmp = "";

    switch(e.target.value) {
      case "affiliation":
        tmp = "please input author name";
        break;
      case "recommendation":
        tmp = "please input interests";
        break;
      case "interests":
        tmp = "please input interests";
        break;
      default:
        tmp = "please input author name";
    }
    await this.setState({ selector: e.target.value, placeholder:tmp});

  };

  // form on changes
  onChange = async (e) => {
    await this.setState({ content: e.target.value});
  };

  onSubmit = async (e) => {
    e.preventDefault();
    var content = this.state.content;
    var cypher = await complexCypher(this.state.selector, content);
    this.state.viz.renderWithCypher(cypher);
    this.setState({ content: ""});

  };

  render() {
    return (
      <div className="card card-body mt-4 mb-4">
        <h2> Network Detector</h2>
        <fieldset className="form-group">
          <legend>Functions</legend>
          <div className="form-check">
            <label className="form-check-label">
              <input
                type="radio"
                className="form-check-input"
                name="optionsRadios"
                id="optionsRafadios1"
                value="affiliation"
                onChange={this.onCheck}
              />
              Find his colleagues
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input
                type="radio"
                className="form-check-input"
                name="optionsRadios"
                id="optionsRadios3"
                value="recommendation"
                onChange={this.onCheck}
              />
              Find authors, articles and journals you may be interested in
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input
                type="radio"
                className="form-check-input"
                name="optionsRadios"
                id="optionsRadios4"
                value="interests"
                onChange={this.onCheck}
              />
             Find authors and articles based on interests
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input
                type="radio"
                className="form-check-input"
                name="optionsRadios"
                id="optionsRadios4"
                value="works"
                onChange={this.onCheck}
              />
              Find his work in the past
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
        <div id ="viz" style = {styling}></div>
      </div>
    );
  }

}
