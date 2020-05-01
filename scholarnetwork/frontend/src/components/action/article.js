import axios from "axios";
// path('api/articles/searchtitle/<slug:searchby>', views.ArticleSearchTitle.as_view()),
// path('api/articles/searchauthor/<slug:searchby>', views.ArticleSearchAuthor.as_view()),
export const getArticleByTitle = (t) => {
  axios
    .get("api/articles/searchtitle/", {
      pub_title: t,
    })
    .then((res) => {
      return { data: res, msg: "success" };
    })
    .catch((err) => {
      return { data: {}, msg: "failed" };
    });
};

export const getArticleByAuthor = (a) => {
  axios
    .get("api/articles/searchauthor/", {
      author: a,
    })
    .then((res) => {
      return { data: res, msg: "success" };
    })
    .catch((err) => {
      return { data: {}, msg: "failed" };
    });
};
