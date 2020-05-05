import React, { Component, Fragment } from 'react'
import 'regenerator-runtime/runtime';

export default class Network extends Component {
  state = {
    selector: "", //interests, affiliation, journals
    content:"",
    viz:"",
    placeholder:"",

  };

  componentDidMount=async ()=>{
      var config = {
        container_id: "viz",
        server_url: "bolt://127.0.0.1/:7687",
        server_user: "neo4j",
        server_password: "scholarnetwork",
        labels: {
            "Authors": {
                caption: "name",
                size: "citedby",
                community: "email"
            },
            "articles":{
              caption: "pub_title",
              size: "citations",
            }
        },
        relationships: {

        },
        initial_cypher: "MATCH (m:Authors) RETURN m LIMIT 20"
    }

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
      case "interest":
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
    var cypher = "";
    var content = this.state.content.toUpperCase();
    switch(this.state.selector) {
      case "affiliation":
        cypher = "MATCH p=(m:Authors)-[r:AFFILIATED]->(n:Authors) WHERE trim(toUpper(n.name)) = trim(\'"+content+"\') RETURN p LIMIT 25"
        break;
      case "interest":
        cypher = "MATCH(n:Authors) UNWIND n.interests AS INTERS WITH n AS auth, INTERS AS INTYS WHERE trim(toUpper(INTYS)) = trim(\'"+content+"\') MATCH p = (auth)-[:WROTE]->(:articles) RETURN p LIMIT 100";
        break;
      default:
        cypher = "MATCH(n:Authors) UNWIND n.interests AS INTERS WITH n AS auth, INTERS AS INTYS WHERE toUpper(INTYS) = \'"+content+"\' MATCH p = (auth)-[:WROTE]->(:articles) RETURN p LIMIT 100";
    };

    this.state.viz.renderWithCypher(cypher);

  };

  render() {

    const styling={
      width: '600px',
      height: '600px',
      border: '1px solid lightgray',
      font: '22pt arial',
    }

    return (
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
                id="optionsRafadios1"
                value="affiliation"
                onChange={this.onCheck}
              />
              affiliation
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input
                type="radio"
                className="form-check-input"
                name="optionsRadios"
                id="optionsRadios2"
                value="interests"
                onChange={this.onCheck}
              />
              interests
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

