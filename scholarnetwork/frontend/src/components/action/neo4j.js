
import 'regenerator-runtime/runtime';



export const styling={
  width: '600px',
  height: '600px',
  border: '1px solid lightgray',
  font: '22pt arial',
};

export const config = {
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
        },
        'journals':{
          caption:"journal_name",
        }
    },
    relationships: {

    },
    initial_cypher: "MATCH (m:Authors) RETURN m LIMIT 20"
}


export const complexCypher = async( func,content) =>{
   var cypher = "";
  switch(func) {
    case "affiliation":
      cypher = "MATCH p=(m:Authors)-[r:AFFILIATED]->(n:Authors) WHERE trim(toUpper(n.name)) = trim(toUpper(\'"+content+"\')) RETURN p LIMIT 25"
      break;
    case "recommendation":
        cypher = "MATCH(n:Authors) UNWIND n.interests AS INTERS WITH n AS auth, INTERS AS INTYS WHERE trim(toUpper(INTYS)) = trim(toUpper(\'"+content+"\')) MATCH p = (auth)-[:WROTE]->(:articles)-[:PUBLISHED_IN]->(j:journals) RETURN p LIMIT 100";
        break;
    case "interests":
      cypher = "MATCH(n:Authors) UNWIND n.interests AS INTERS WITH n AS auth, INTERS AS INTYS WHERE trim(toUpper(INTYS)) = trim(toUpper(\'"+content+"\')) MATCH p = (auth)-[:WROTE]->(:articles) RETURN p LIMIT 100";
      break;
    default:
      cypher = "MATCH p = (m:Authors)-[:WROTE]->(n:articles)-[:PUBLISHED_IN]->(:journals) WHERE trim(toUpper(m.name)) = trim(toUpper(\'"+content+"\')) RETURN p"
  };

  return cypher;
};


export const authorCypher = async(func,req) =>{
  var cypher = "";

  switch(func) {
    case "search":
      cypher ="MATCH (p: Authors)  WHERE p.id = "+ req.id +" RETURN p"
      break;
    case "insert":
      cypher = "MATCH (f:Authors) WITH count(f) AS COUNT CREATE(n:Authors {name: \'"+req.name+"\', email: \'"+req.email+"\', id: "+ req.id +", interests: \'"+req.interests+"\', citedby: "+ req.citedby +", url_pictures: \'"+req.url_picture+"\', page: "+ req.page +", affiliation: \'"+req.affiliation+"\'}) WITH n AS n1 MATCH (p:Authors) WHERE p.email = n1.email AND p.name <> n1.name CREATE (p)-[:AFFILIATED]->(n1) CREATE (n1)-[:AFFILIATED]->(p) RETURN n1"
      break;
    case "delete":
      cypher = "MATCH (p: Authors)  WHERE p.id = "+ req.id +"  DETACH DELETE p"
      break;
    default:
      cypher = "MATCH (p: Authors) WHERE p.id = "+req.id+" SET p = {id: " + req.id + ", name: \'"+req.name+"\', url_pictures: \'"+req.url_picture+"\', interests: \'"+req.interests+"\', email: \'"+req.email+"\', page: "+ req.page +", citedby: "+ req.citedby +"} RETURN p"
  };
  return cypher;
};
export const journalCypher = async(func,req) =>{
  var cypher = "";
  switch(func) {
    case "search":
      cypher =  "MATCH (n: journals) WHERE n.journal_id = "+req.id+" RETURN n";
      break;
    case "insert":
      console.log(req, func);
      cypher = "CREATE(n:journals {journal_id:"+ req.id +", journal_name: \'"+req.name+"\'}) RETURN n";
      break;
    case "delete":
      cypher = "MATCH (n: journals) WHERE n.journal_id = "+req.id+" DETACH DELETE n";
      break;
    default:
      cypher = "MATCH (p: journals) WHERE p.journal_id = " + req.id + " SET p = {journal_id: " + req.id + ",journal_name: \'" + req.name + "\' } RETURN p ";
      break;
  };

  return cypher;
};

export const articleCypher = async( func,req) =>{
  var cypher = "";
  switch(func) {
    case "search":
      cypher =  "MATCH (p:articles) WHERE p.article_id = "+ req.id +" RETURN p";
      break;
    case "insert":
      cypher = "CREATE(n:articles {journal_id: "+ req.journal_id +", article_id: "+ req.id +", citations: "+ req.citations +",  pub_year: "+ req.year +", pub_author: \'"+req.authors+"\', pub_title:\'"+req.title+"\',  author_id: "+ req.author_id +"}) WITH n AS n1 MATCH (m: Authors) WHERE m.id = n1.author_id CREATE (m) -[:WROTE]->(n1) RETURN n1"
      break;
    case "delete":
      cypher = "MATCH (p:articles) WHERE p.article_id = "+ req.id +" DETACH DELETE p";
      break;
    default:

      cypher = "MATCH (p: articles) WHERE p.article_id = "+ req.id +" SET p = {journal_id:"+ req.journal_id +" , article_id:"+ req.id+", citations: "+ req.citations +",pub_year: "+ req.year +", pub_author: \'"+req.authors+"\', pub_title: \'"+req.title+"\',  author_id: "+ req.author_id +"} RETURN p";
      break;
  };

  return cypher;
};








