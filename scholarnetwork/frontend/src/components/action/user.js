import axios from "axios";
import 'regenerator-runtime/runtime';

// import { async } from "regenerator-runtime";

export const getUserByID = async (req,res) => {
  await axios
    .get("api/users/"+ req.id)
    .then((result) => {
      console.log("getbyid", result);
      res.data = result.data;
      res.msg = "search succeed";
    })
    .catch((err) => {
      console.log("getbyid", err);
      res.data = [];
      res.msg = "server error";
    });
};

// // GET LEADS
export const getUserByEmail = async(req,res) => {

  await axios.get("api/users/searchemail/"+req.email)
    .then((result) => {
      console.log("get",result);
      res.data = result.data;
      res.msg = "search succeed";
    })
    .catch((err) => {
      console.log("get",err);
      res.data = [];
      res.msg = "server error";
    });
};

// insert user acccount
export const insertUser = async(req,res) => {
  await axios.post("api/users/",
  {
    email: req.email,
    password: req.password
  })
  .then(result=> {
    console.log("result",result);
    res.data = [result.data];
    res.msg = "sign up successfully";
  })
  .catch(err=>{
    console.log("result",err);
    res.data = [];
    res.msg = "server error";
  });

}

export const updateUserByID = async (req,res) => {
  console.log("req",req);
  await axios
    .put("api/users/"+req.id, {
      email: req.email,
      password: req.password,
      affiliation: req.affiliation,
      interests: req.interests,
      history:req.history,
      id : req.id,
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

export const deleteUserByID = async (req,res) => {
  await axios
    .delete("api/users/"+req.id)
    .then((result) => {
        res.data = [];
        res.msg = "delete succeed";

    })
    .catch((err) => {

      res.data = [];
      res.msg = "server error";
    });
};

