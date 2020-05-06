import React, { Component, Fragment } from 'react'
import 'regenerator-runtime/runtime';


export class Form extends Component {

  // prop_setState = async(target, value)=>{
  //   await this.setState({[target]:value});
  //   console.log(this.state);
  // }

  // <Form prop_setState = {this.prop_setState} data = {data} />

  onChange = async (e) => {
    await this.props.prop_setState(e.target.name,e.target.value);
    console.log("set props");
  };

  render() {

      var data = this.props.data;
      var labels = Object.keys(this.props.data);
      var entrys = [];
      for (var i = 0; i < labels.length; i++){
        entrys.push({ label:labels[i], value:data[labels[i]] });
      }
      var module = entrys.map((entry) => {
        return (
          <div className="form-group">
            <label>{entry.label}</label>
            <input
              className="form-control"
              // type="email"
              type="text"
              name={entry.label}
              onChange={this.onChange}
              value={entry.value}
            />
          </div>
        );
      });




    return (
      <Fragment>
        <form id="registerForm">
          {module}
        </form>
      </Fragment>
    )
  }
}

export default Form;
