import axios from "axios";
import 'regenerator-runtime/runtime';

// // GET LEADS
export const getAuthorByID = async(req,res) => {
  await axios
    .get("api/authors/" + req.id)
    .then((result) => {
      res.data = result.data;
      res.msg = "search succeed";
    })
    .catch((err) => {
      res.data = [];
      res.msg = "server error";
    });
};

export const getAuthorByName = async(req,res) => {
  await axios
    .get("api/authors/searchname/" + req.content)
    .then((result) => {
      res.data = result.data;
      res.msg = "search succeed";
    })
    .catch((err) => {
      res.data = [];
      res.msg = "server error";
    });
};

export const getAuthorByAffiliation = async(req,res) => {
  await axios
    .get("api/authors/searchaffiliation/" + req.content)
    .then((result) => {
      res.data = result.data;
      res.msg = "search succeed";
    })
    .catch((err) => {
      res.data = [];
      res.msg = "server error";
    });
};

// path('api/authors/', views.AuthorSQLList),
// path('api/authors/<int:id>', views.AuthorSQLDetail),

// insert author
export const insertAuthor = async(req,res) => {
  await axios.post("api/authors/",
  {
    name : req.name,
    affiliation : req.affiliation,
    citedby : req.citedby,
    citedby_5 : req.citedby_5,
    h_index : req.h_index,
    h_index_5 : req.h_index_5,
    i10_index : req.i10_index,
    i10_index_5 : req.i10_index_5,
    citedby_history : req.citedby_history,
    page : 0,
    email : req.email,
    interests : req.interests,
    url_picture : req.url_picture,
  })
  .then(result=> {
    console.log("post",req);
    res.data = [result.data];
    res.msg = "insert succeed";
  })
  .catch(err=>{
    console.log("post",req);
    console.log("result",err);
    res.data = [];
    res.msg = "server error";
  });

}

export const updateAuthorByID = async (req,res) => {
  console.log("req",req);
  await axios
    .put("api/authors/"+req.id, {
      name : req.name,
      affiliation : req.affiliation,
      citedby : req.citedby,
      citedby_5 : req.citedby_5,
      h_index : req.h_index,
      h_index_5 : req.h_index_5,
      i10_index : req.i10_index,
      i10_index_5 : req.i10_index_5,
      citedby_history : req.citedby_history,
      page : 0,
      email : req.email,
      interests : req.interests,
      url_picture : req.url_picture,
    })
    .then((result) => {
      res.data = req;
      res.msg = "update succeed";
    })
    .catch((err) => {
      res.data = [];
      res.msg = "server error";
    });
};

export const deleteAuthorByID = async (req,res) => {
  await axios
    .delete("api/authors/"+req.id)
    .then((result) => {
        res.data = [];
        res.msg = "delete succeed";

    })
    .catch((err) => {

      res.data = [];
      res.msg = "server error";
    });
};



