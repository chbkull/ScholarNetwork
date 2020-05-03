import axios from "axios";
import 'regenerator-runtime/runtime';

// // GET LEADS
export const getAuthorByID = async(req,res) => {
  await axios
    .get("api/authors/" + req.id)
    .then((result) => {
      res.data = [result.data];
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

