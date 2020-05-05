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

// // insert user acccount
// export const insertAuthor = async(req,res) => {
//   await axios.post("api/users/",
//   {
//     email: req.email,
//     password: req.password
//   })
//   .then(result=> {
//     res.data = [result.data];
//     res.msg = "sign up successfully";
//   })
//   .catch(err=>{
//     console.log("result",err);
//     res.data = [];
//     res.msg = "server error";
//   });

// }

// export const updateAuthorByID = async (req,res) => {
//   console.log("req",req);
//   await axios
//     .put("api/users/"+req.id, {
//       email: req.email,
//       password: req.password,
//       affiliation: req.affiliation,
//       interests: req.interests,
//       history:req.history,
//       id : req.id,
//     })
//     .then((result) => {
//       res.data = req;
//       res.msg = "update succeed";
//     })
//     .catch((err) => {
//       res.data = [];
//       res.msg = "server error";
//     });
// };

// export const deleteAuthorByID = async (req,res) => {
//   await axios
//     .delete("api/users/"+req.id)
//     .then((result) => {
//         res.data = [];
//         res.msg = "delete succeed";

//     })
//     .catch((err) => {

//       res.data = [];
//       res.msg = "server error";
//     });
// };



