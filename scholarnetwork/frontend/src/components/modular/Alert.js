import React, { Component } from 'react'

export class Alert extends Component {
  render() {
    return (
      <div className="alert alert-dismissible alert-warning">
        <button type="button" className="close" data-dismiss="alert" onClick = {this.props.onClick}>
          &times;
        </button>
        <h4 className="alert-heading">Operation {this.props.status}</h4>
        <p className="mb-0">Reason : {this.props.message}</p>
      </div>
    )
  }
}

export default Alert;
