const request = require("supertest");
const app = require("../app");

const URL_GENRES = "/api/v1/genres";

const genre = {
  name: "Action",
};

let genreId;

test("POST -> 'URL_GENRES', should return status code 201 and res.body.name === genre.name", async () => {
  const res = await request(app).post(URL_GENRES).send(genre);
  genreId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(genre.name);
});

test("GET -> 'URL_GENRES', should return status code 200 and res.body.toHaveLength === 1", async () => {
  const res = await request(app).get(URL_GENRES);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
});

test("GET -> 'URL_GENRES/:id', should return status code 200 and res.body.name === genre.name", async () => {
  const res = await request(app).get(`${URL_GENRES}/${genreId}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(genre.name);
});

test("PUT -> 'URL_GENRES/:id', should return status code 200 and res.body.name === genreUpdated.name", async () => {
  const genreUpdated = {
    name: "Fantasy",
  };

  const res = await request(app)
    .put(`${URL_GENRES}/${genreId}`)
    .send(genreUpdated);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(genreUpdated.name);
});

test("DELETE -> 'URL_GENRES/:id', should return status code 204", async () => {
  const res = await request(app).delete(`${URL_GENRES}/${genreId}`);

  expect(res.status).toBe(204);
});
