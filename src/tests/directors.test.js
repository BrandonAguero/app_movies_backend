const request = require("supertest");
const app = require("../app");

const URL_DIRECTORS = "/api/v1/directors";

const director = {
  first_name: "Jon",
  last_name: "Watts",
  nationality: "EE.UU",
  image:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Jon_Watts_by_Gage_Skidmore.jpg/390px-Jon_Watts_by_Gage_Skidmore.jpg",
  birthday: "1981-06-28",
};

let directorId;

test("POST -> 'URL_DIRECTORS', should return status code 201 and res.body.first_name === director.first_name", async () => {
  const res = await request(app).post(URL_DIRECTORS).send(director);
  directorId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.first_name).toBe(director.first_name);
});

test("GET -> 'URL_DIRECTORS', should return status code 200 and res.body.toHaveLength === 1", async () => {
  const res = await request(app).get(URL_DIRECTORS);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
});

test("GET -> 'URL_DIRECTORS/:id', should return status code 200 and res.body.first_name === director.first_name", async () => {
  const res = await request(app).get(`${URL_DIRECTORS}/${directorId}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.first_name).toBe(director.first_name);
});

test("PUT -> 'URL_DIRECTORS/:id', should return status code 200 and res.body.first_name === directorUpdated.first_name", async () => {
  const directorUpdated = {
    first_name: "Kevin",
    last_name: "Feige",
    nationality: "EE.UU",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Kevin_Feige_%2848462887397%29_%28cropped%29.jpg/330px-Kevin_Feige_%2848462887397%29_%28cropped%29.jpg",
    birthday: "1973-06-02",
  };

  const res = await request(app)
    .put(`${URL_DIRECTORS}/${directorId}`)
    .send(directorUpdated);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.first_name).toBe(directorUpdated.first_name);
});

test("DELETE -> 'URL_DIRECTORS/:id', should return status code 204", async () => {
  const res = await request(app).delete(`${URL_DIRECTORS}/${directorId}`);

  expect(res.status).toBe(204);
});
