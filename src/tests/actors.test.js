const request = require("supertest");
const app = require("../app");

const URL_ACTORS = "/api/v1/actors";

const actor = {
  first_name: "Tom",
  last_name: "Hollam",
  nationality: "United Kingdom",
  image:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Tom_Holland_Bali_2019_1_%28cropped%29_%28cropped%29.jpg/330px-Tom_Holland_Bali_2019_1_%28cropped%29_%28cropped%29.jpg",
  birthday: "1996-06-01",
};

let actorId;

test("POST -> 'URL_ACTORS', should return status code 201 and res.body.first_name === actor.first_name", async () => {
  const res = await request(app).post(URL_ACTORS).send(actor);
  actorId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.first_name).toBe(actor.first_name);
});

test("GET -> 'URL_ACTORS', should return status code 200 and res.body.toHaveLength === 1", async () => {
  const res = await request(app).get(URL_ACTORS);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
});

test("GET -> 'URL_ACTORS/:id', should return status code 200 and res.body.first_name === actor.first_name", async () => {
  const res = await request(app).get(`${URL_ACTORS}/${actorId}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.first_name).toBe(actor.first_name);
});

test("PUT -> 'URL_ACTORS/:id', should return status code 200 and res.body.first_name === actorUpdated.first_name", async () => {
  const actorUpdated = {
    first_name: "Andrew",
    last_name: "Garfield",
    nationality: "EE.UU",
    image:
      "https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcS2FQeBwujjeXbxoBSNL_0fo3EII5dTDITfqppb01rV4nXFGGlROJhMA5iZY6ziM1_w",
    birthday: "1983-08-20",
  };
  const res = await request(app)
    .put(`${URL_ACTORS}/${actorId}`)
    .send(actorUpdated);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.first_name).toBe(actorUpdated.first_name);
});

test("DELETE -> 'URL_ACTORS/:id', should return status code 204", async () => {
  const res = await request(app).delete(`${URL_ACTORS}/${actorId}`);

  expect(res.status).toBe(204);
});
