import axios from "axios";
import 'regenerator-runtime/runtime';

// // GET LEADS

export const getArticleByID = async(req,res) => {
  await axios
    .get("api/articles/" + req.id)
    .then((result) => {
      res.data = [result.data];
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



// insert user acccount
// export const insertArticle = async(req,res) => {
//   await axios.post("api/authors/",
//   {


//     email: req.email,
//     password: req.password
//   })
//   .then(result=> {
//     res.data = [result.data];
//     res.msg = "sign up successfully";
//   })
//   .catch(err=>{
//     res.data = [];
//     res.msg = "server error";
//   });

// }

// export const getUserByID = async (req,res) => {
//   await axios
//     .get("api/users/"+ req.id)
//     .then((result) => {
//       res.data = result.data;
//       res.msg = "search succeed";
//     })
//     .catch((err) => {
//       res.data = [];
//       res.msg = "server error";
//     });
// };

// export const updateUserByID = async (req,res) => {
//   await axios
//     .put("api/users/"+req.id, {
//       id : req.id,
//       email: req.email,
//       password: req.password,
//       affiliation: req.affiliation,
//       interests: req.interests,
//       history:req.history,
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

// export const deleteUserByID = async (req,res) => {
//   await axios
//     .delete("api/users/"+req.id)
//     .then((result) => {
//       console.log(result);
//       if (res.data.length === 0){
//         res.data = result.data;
//         res.msg = "user not exist";
//       }else{
//         res.data = [];
//         res.msg = "delete succeed";
//       }

//     })
//     .catch((err) => {
//       res.data = [];
//       res.msg = "server error";
//     });
// };

