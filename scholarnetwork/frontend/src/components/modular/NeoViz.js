// import React, { Component, Fragment} from 'react'
// import 'regenerator-runtime/runtime';

// export default class NeoViz extends Component {
//   state = {
//     viz:"",
//     cypher :this.props.cypher,
//   };

//   componentDidMount= async ()=>{
//       var config = {
//         container_id: "viz",
//         server_url: "bolt://127.0.0.1/:7687",
//         server_user: "neo4j",
//         server_password: "scholarnetwork",
//         labels: {
//             "Authors": {
//                 caption: "name",
//                 size: "citedby",
//                 community: "email"
//             },
//             "articles":{
//               caption: "pub_title",
//               size: "citations",
//             },
//             'journals':{
//               caption:"journal_name",
//             },
//             'publisher':{
//               caption:"publisher_name",
//             }
//         },
//         relationships: {

//         },
//         initial_cypher: "MATCH (m:Authors) RETURN m LIMIT 20"
//     }

//     var tmp = new NeoVis.default(config);
//     await this.setState({viz:tmp});
//     await this.state.viz.render();
//   }


//   reload = async () => {
//     if (this.state.cypher !==""){
//       await this.state.viz.renderWithCypher(this.state.cypher);
//       await this.setState({cypher:""});
//       await this.props.setCypher("");
//     }
//   };

//   render() {
//     const styling={
//       width: '600px',
//       height: '600px',
//       border: '1px solid lightgray',
//       font: '22pt arial',
//     }

//     if (this.props.cypher!==""){
//       this.reload();

//     }


//     return (
//         <Fragment>
//           <div id ="viz" style = {styling}></div>
//         </Fragment>
//     );
//   }

// }

