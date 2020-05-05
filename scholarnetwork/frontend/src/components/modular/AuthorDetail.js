import React, { Component,Fragment } from 'react';
import {getAuthorByID} from '../action/author';
import 'regenerator-runtime/runtime';
import { VictoryBar,VictoryChart,VictoryAxis, VictoryTheme } from 'victory';
export class AuthorDetail extends Component {

  state = {
    id: this.props.author,
    name:"",
    affiliation:"",
    citedby:"",
    citedby_5:"",
    h_index:"",
    h_index_5:"",
    i10_index:"",
    i10_index_5:"",
    citedby_history:"",
    page:"",
    email :"",
    interests :"",
    url_picture :"",
    status:"",
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
      citedby_5:res.data[0].citedby_5,
      h_index:res.data[0].h_index,
      h_index_5:res.data[0].h_index_5,
      i10_index:res.data[0].i10_index,
      i10_index_5:res.data[0].i10_index_5,
      // citedby_history:res.data[0].citedby_history,
      citedby_history:JSON.parse('{"1999":10, "2000":30, "2001":100}'),
      page:res.data[0].page,
      email: res.data[0].email,
      interests :res.data[0].interests,
      url_picture :res.data[0].url_picture,
      status: "succeed"
    });


  }

  onClick = ()=>{
    this.props.setID("");
  }




  render() {


    var module = <Fragment></Fragment>;

    if (this.state.status ==="succeed"){


      var axis_x = Object.keys(this.state.citedby_history);
      var axis_y = [];
      var arr = [];
      for (var i = 0; i < axis_x.length; i++) {
        axis_y.push(this.state.citedby_history[axis_x[i]]);
        arr.push({year:axis_x[i],citations:axis_y[i]});
      }

      module = (
        <Fragment>
        <div className="alert alert-dismissible alert-primary">
          <button type="button" className="close" data-dismiss="alert" onClick = {this.onClick}>&times;</button>
            <div>
              <VictoryChart
                // adding the material theme provided with Victory
                theme={VictoryTheme.grayscale}
                domainPadding={20}
              >
                <VictoryAxis
                  tickValues={axis_y}
                  tickFormat={axis_x}
                />
                <VictoryAxis
                  dependentAxis
                  tickFormat={(x) => (`${x}`)}
                />
                <VictoryBar
                  data= {arr}
                  x="year"
                  y="citations"
                  labels={axis_y}
                  />

              </VictoryChart>
              <Fragment>
              <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Statisctic</th>
                  <th scope="col">All</th>
                  <th scope="col">Since 2015</th>
                </tr>
              </thead>
              <tbody>
                <tr className="table-light">
                  <th scope="row">Citation</th>
                  <td>{this.state.citedby}</td>
                  <td>{this.state.citedby_5}</td>
                </tr>
                <tr className="table-light">
                  <th scope="row">h-index</th>
                  <td>{this.state.h_index}</td>
                  <td>{this.state.h_index_5}</td>
                </tr>
                <tr className="table-light">
                  <th scope="row">i10-index</th>
                  <td>{this.state.i10_index}</td>
                  <td>{this.state.i10_index_5}</td>
                </tr>
              </tbody>
            </table>

            </Fragment>
              <img src={this.state.url_picture} />
              <h5>Name: {this.state.name}</h5>
              <h5>Affiliation: {this.state.affiliation}</h5>
              <h5>Email: {this.state.email}</h5>
              <h5>CitedBy: {this.state.citedby}</h5>
              <h5>Interests: {this.state.interests}</h5>
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



