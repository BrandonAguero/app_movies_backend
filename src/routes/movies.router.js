const {
  getAll,
  create,
  getOne,
  remove,
  update,
  setGenres,
  setActors,
  setDirectors,
} = require("../controllers/movies.controller");
const express = require("express");

const routerMovies = express.Router();

routerMovies.route("/").get(getAll).post(create);

routerMovies.route("/:id").get(getOne).delete(remove).put(update);

routerMovies.route("/:id/generes").post(setGenres);

routerMovies.route("/:id/actors").post(setActors);

routerMovies.route("/:id/directors").post(setDirectors);

module.exports = routerMovies;
