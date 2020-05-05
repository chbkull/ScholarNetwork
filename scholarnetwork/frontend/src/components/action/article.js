import axios from "axios";
import 'regenerator-runtime/runtime';

// // GET LEADS

export const getArticleByID = async(req,res) => {
  await axios
    .get("api/articles/" + req.id)
    .then((result) => {

      res.data = result.data;
      res.msg = "search succeed";
    })
    .catch((err) => {
      res.data = [];
      res.msg = "server error";
    });
};

export const getArticleByAuthor = async(req,res) => {
  await axios
    .get("api/articles/searchauthor/" + req.content)
    .then((result) => {
      res.data = result.data;
      res.msg = "search succeed";
    })
    .catch((err) => {
      res.data = [];
      res.msg = "server error";
    });
};

export const getArticleByTitle = async(req,res) => {
  await axios
    .get("api/articles/searchtitle/" + req.content)
    .then((result) => {
      console.log(result);
      res.data = result.data;
      res.msg = "search succeed";
    })
    .catch((err) => {
      res.data = [];
      res.msg = "server error";
    });
};

