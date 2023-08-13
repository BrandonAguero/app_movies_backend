require("../models");
const request = require("supertest");
const app = require("../app");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
const Genre = require("../models/Genre.js");

const URL_MOVIES = "/api/v1/movies";

const movie = {
  name: "Spider-Man: No way Home",
  image:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Spider_Man_No_Way_Home_Logo.svg/1920px-Spider_Man_No_Way_Home_Logo.svg.png",
  synopsis:
    "For the first time, Spider-Man's identity is exposed, blurring his life with heightened peril. Seeking Doctor Strange's aid escalates danger, unveiling the essence of being Spider-Man.",
  releaseYear: "2022-12-18",
};
let movieId;

test("POST -> 'URL_MOVIES', should return status code 201 and res.body.name === movie.name", async () => {
  const res = await request(app).post(URL_MOVIES).send(movie);
  movieId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(movie.name);
});

test("GET -> 'URL_MOVIES', should return status code 200 and res.body.toHaveLength === 1", async () => {
  const res = await request(app).get(URL_MOVIES);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
  expect(res.body[0].genres).toBeDefined();
  expect(res.body[0].genres).toHaveLength(0);
  expect(res.body[0].actors).toBeDefined();
  expect(res.body[0].actors).toHaveLength(0);
  expect(res.body[0].directors).toBeDefined();
  expect(res.body[0].directors).toHaveLength(0);
});

test("GET -> 'URL_MOVIES/:id', should return status code 200 and res.body.name === movie.name", async () => {
  const res = await request(app).get(`${URL_MOVIES}/${movieId}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(movie.name);
});

test("PUT -> 'URL_MOVIES/:id', should return status code 200 and res.body.name === movieUpdated.name", async () => {
  const movieUpdated = {
    name: "Spider-Man",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Spider-Man-Logo.svg/1920px-Spider-Man-Logo.svg.png",
    synopsis:
      "After a genetically modified spider bite, a shy high schooler gains spider-like abilities, embracing a mission to fight evil.",
    releaseYear: "2002-05-16",
  };
  const res = await request(app)
    .put(`${URL_MOVIES}/${movieId}`)
    .send(movieUpdated);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(movieUpdated.name);
});

test("POST -> 'URL_MOVIES/:id/actors', should return status code 200 and res.body.toHaveLength === 1", async () => {
  const actor = {
    first_name: "Tom",
    last_name: "Hollam",
    nationality: "United Kingdom",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Tom_Holland_Bali_2019_1_%28cropped%29_%28cropped%29.jpg/330px-Tom_Holland_Bali_2019_1_%28cropped%29_%28cropped%29.jpg",
    birthday: "1996-06-01",
  };

  const createActor = await Actor.create(actor);

  const res = await request(app)
    .post(`${URL_MOVIES}/${movieId}/actors`)
    .send([createActor.id]);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
  expect(res.body[0].id).toBe(createActor.id);

  await createActor.destroy();
});

test("POST -> 'URL_MOVIES/:id/directors', should return status code 200 and res.body.toHaveLength === 1", async () => {
  const director = {
    first_name: "Jon",
    last_name: "Watts",
    nationality: "EE.UU",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Jon_Watts_by_Gage_Skidmore.jpg/390px-Jon_Watts_by_Gage_Skidmore.jpg",
    birthday: "1981-06-28",
  };
  const createDirector = await Director.create(director);

  const res = await request(app)
    .post(`${URL_MOVIES}/${movieId}/directors`)
    .send([createDirector.id]);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
  expect(res.body[0].id).toBe(createDirector.id);

  await createDirector.destroy();
});

test("POST -> 'URL_MOVIES/:id/generes', should return status code 200 and res.body.toHaveLength === 1", async () => {
  const genre = {
    name: "Action",
  };

  const createGenre = await Genre.create(genre);

  const res = await request(app)
    .post(`${URL_MOVIES}/${movieId}/generes`)
    .send([createGenre.id]);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
  expect(res.body[0].id).toBe(createGenre.id);

  await createGenre.destroy();
});

test("DELETE -> 'URL_MOVIES/:id', should return status code 204", async () => {
  const res = await request(app).delete(`${URL_MOVIES}/${movieId}`);

  expect(res.status).toBe(204);
});
