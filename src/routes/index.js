const express = require("express");
const routerMovies = require("./movies.router");
const routerGenres = require("./genres.router");
const routerActors = require("./actors.router");
const routerDirectors = require("./directors.router");

const router = express.Router();

// colocar las rutas aquí
router.use("/movies", routerMovies);
router.use("/genres", routerGenres);
router.use("/actors", routerActors);
router.use("/directors", routerDirectors);

module.exports = router;
