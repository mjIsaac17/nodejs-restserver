const { response, request } = require("express");

const userGet = (req = request, res = response) => {
  const { q, name = "No name" } = req.query; //get query params
  //res = response to have the autocomplete methods
  res.json({
    msg: "get API - controller",
    q,
    name,
  });
};

const userPut = (req, res = response) => {
  const id = req.params.id;
  res.json({
    msg: "put API - controller",
    id,
  });
};

const userPost = (req, res = response) => {
  //const body = req.body;
  const { name, age } = req.body;

  res.json({
    msg: "post API - controller",
    name,
    age,
    //body,
  });
};

const userDelete = (req, res = response) => {
  res.json({
    msg: "delete API - controller",
  });
};
module.exports = {
  userGet,
  userPost,
  userPut,
  userDelete,
};
