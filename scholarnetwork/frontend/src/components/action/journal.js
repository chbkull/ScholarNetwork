import axios from "axios";
import 'regenerator-runtime/runtime';

export const getJournalByID = async(req,res) => {
  await axios
    .get("api/journals/" + req.id)
    .then((result) => {

      res.data = result.data;
      res.msg = "search succeed";
    })
    .catch((err) => {
      res.data = [];
      res.msg = "server error";
    });
};

export const getJournalByName = async(req,res) => {
  await axios
    .get("api/journals/searchname/" + req.content)
    .then((result) => {

      res.data = result.data;
      res.msg = "search succeed";
    })
    .catch((err) => {
      res.data = [];
      res.msg = "server error";
    });
};
export const insertJournal = async(req,res) => {
  await axios.post("api/journals/",
  {
    name :req.name,
  })
  .then(result=> {
    res.data = [result.data];
    res.msg = "Journal insert successfully";
  })
  .catch(err=>{
    console.log("result",err);
    res.data = [];
    res.msg = "server error";
  });

}

export const updateJournalByID = async (req,res) => {
  console.log("req",req);
  await axios
    .put("api/journals/"+req.id, {
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

export const deleteJournalByID = async (req,res) => {
  await axios
    .delete("api/journals/"+req.id)
    .then((result) => {
        res.data = [];
        res.msg = "delete succeed";

    })
    .catch((err) => {

      res.data = [];
      res.msg = "server error";
    });
};
