import axios from "axios";
import 'regenerator-runtime/runtime';

// // GET LEADS


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

export const insertArticle = async(req,res) => {
  await axios.post("api/articles/",
  {
    title :req.title,
    author_id:req.author_id,
    authors :req.authors,
    citations :req.citations,
    journal_id:req.journal_id,
    year :req.year,
    issue:req.issue,
    publisher_id:req.publisher_id,
    eprint :req.eprint,
    url:req.url,
  })
  .then(result=> {
    res.data = [result.data];
    res.msg = "article insert successfully";
  })
  .catch(err=>{
    console.log("result",err);
    res.data = [];
    res.msg = "server error";
  });

}

export const updateArticleByID = async (req,res) => {
  console.log("req",req);
  await axios
    .put("api/articles/"+req.id, {
      title :req.title,
      author_id:req.author_id,
      authors :req.authors,
      citations :req.citations,
      journal_id:req.journal_id,
      year :req.year,
      issue:req.issue,
      publisher_id:req.publisher_id,
      eprint :req.eprint,
      url:req.url,
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

export const deleteArticleByID = async (req,res) => {
  await axios
    .delete("api/articles/"+req.id)
    .then((result) => {
        res.data = [];
        res.msg = "delete succeed";

    })
    .catch((err) => {

      res.data = [];
      res.msg = "server error";
    });
};


