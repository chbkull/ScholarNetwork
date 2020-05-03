import axios from "axios";
import 'regenerator-runtime/runtime';
import { async } from "regenerator-runtime/runtime";
import Profile from "../receiver/Profile";
// import { async } from "regenerator-runtime";

// // GET LEADS
export const getUserByEmail = async(req,res) => {
  await axios
    .get("api/users/searchemail/" + req.email)
    .then((result) => {
      res.data = result.data;
      res.msg = "search succeed";
    })
    .catch((err) => {
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
    res.data = [result.data];
    res.msg = "sign up successfully";
  })
  .catch(err=>{
    res.data = [];
    res.msg = "server error";
  });

}

export const getUserByID = async (req,res) => {
  await axios
    .get("api/users/"+ req.id)
    .then((result) => {
      res.data = result.data;
      res.msg = "search succeed";
    })
    .catch((err) => {
      res.data = [];
      res.msg = "server error";
    });
};

export const updateUserByID = async (req,res) => {
  await axios
    .put("api/users/"+req.id, {
      id : req.id,
      email: req.email,
      password: req.password,
      affiliation: req.affiliation,
      interests: req.interests,
      history:req.history,
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
      console.log(result);
      if (res.data.length === 0){
        res.data = result.data;
        res.msg = "user not exist";
      }else{
        res.data = [];
        res.msg = "delete succeed";
      }

    })
    .catch((err) => {
      res.data = [];
      res.msg = "server error";
    });
};

