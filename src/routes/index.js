const express = require("express");
const routerMovies = require("./movies.router.js");
const routerGenres = require("./genres.router.js");
const routerActors = require("./actors.router.js");
const routerDirectors = require("./directors.router.js");

const router = express.Router();

// colocar las rutas aquí
router.use("/movies", routerMovies);
router.use("/genres", routerGenres);
router.use("/actors", routerActors);
router.use("/directors", routerDirectors);

module.exports = router;
