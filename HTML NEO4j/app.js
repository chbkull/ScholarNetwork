var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var neo4j = require('neo4j-driver');
var app = express();

//view Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

var driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', 'scholarnetwork'));
var session = driver.session();

app.get('/', function(req, res){
    res.render('index');
});

app.post('/scholar/add', function(req, res) {
    var name = req.body.name;
    var id = req.body.id;
    var url_picture = req.body.url_picture;
    var page = req.body.page;
    var interests = req.body.interests;
    var attributes = req.body.attributes;
    var email = req.body.email;
    var citedby = req.body.citedby;
    var affiliation = req.body.affiliation;

    session
        .run('MATCH (f:Authors) WITH count(f) AS COUNT CREATE(n:Authors {name: $_name, email: $_email, id: COUNT + 36, interests: $_interests, attributes: $_attributes, citedby: $_citedby, url_picture: $_url_picture, page: $_page, affiliation: $_affiliation}) WITH n AS n1 MATCH (p:Authors) WHERE p.email = n1.email AND p.name <> n1.name CREATE (p)-[:AFFILIATED]->(n1) CREATE (n1)-[:AFFILIATED]->(p)', {_name:name, _id:id, _email:email, _interests:interests, _attributes:attributes, _citedby:citedby, _url_picture:url_picture, _page:page, _affiliation:affiliation})
        .then(function(result){
            session.close();
        })
        .catch(function(err) {
            console.log(err);
        });
    res.redirect('/');
    
});

app.delete('/delete/:id', function(req, res) {
    var id = req.body.id;

    session
        .run('MATCH (n:Authors) WHERE n.id = $_id DETACH DELETE n', {_id:id} )
        .then(function(result) {
            session.close();
        })
        .catch(function(err) {
            console.log(err);
        })
    res.redirect('/');
    
}); 





app.listen(3000);

console.log('Server Started on Port 3000');

module.exports = app;