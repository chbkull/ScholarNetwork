import axios from "axios";
import 'regenerator-runtime/runtime';

export const getPublisherByID = async(req,res) => {
  await axios
    .get("api/publishers/" + req.id)
    .then((result) => {

      res.data = result.data;
      res.msg = "search succeed";
    })
    .catch((err) => {
      res.data = [];
      res.msg = "server error";
    });
};
export const getPublisherByName = async(req,res) => {
  await axios
    .get("api/publishers/searchname" + req.content)
    .then((result) => {

      res.data = result.data;
      res.msg = "search succeed";
    })
    .catch((err) => {
      res.data = [];
      res.msg = "server error";
    });
};
export const insertPublisher = async(req,res) => {
  await axios.post("api/publishers/",
  {
    name :req.name,
  })
  .then(result=> {
    res.data = [result.data];
    res.msg = "Publisher insert successfully";
  })
  .catch(err=>{
    console.log("result",err);
    res.data = [];
    res.msg = "server error";
  });

}

export const updatePublisherByID = async (req,res) => {
  console.log("req",req);
  await axios
    .put("api/publishers/"+req.id, {
      name :req.name
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

export const deletePublisherByID = async (req,res) => {
  await axios
    .delete("api/publishers/"+req.id)
    .then((result) => {
        res.data = [];
        res.msg = "delete succeed";

    })
    .catch((err) => {

      res.data = [];
      res.msg = "server error";
    });
};
