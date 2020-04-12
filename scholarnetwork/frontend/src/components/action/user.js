import axios from "axios";

// GET LEADS
export const getUserByEmail = (e) => {
  axios
    .get("api/users/searchemail/<slug:searchby>", {
      params: {
        email: e,
      },
    })
    .then((res) => {
      return { data: res, msg: "fail" };
    })
    .catch((err) => {
      return err;
    });
};

// path('api/users/<int:pk>', views.UserDetail.as_view()),
export const getUserByID = (req) => {
  axios
    .get("api/users/", {
      params: {
        id: req,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const insertUser = (req) => {
  axios
    .get("api/users/")

    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const updateUserByID = (req) => {
  axios
    .put("api/users/", {
      id: req,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const deleteUserByID = (req) => {
  axios
    .delete("api/users/", {
      id: req,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
