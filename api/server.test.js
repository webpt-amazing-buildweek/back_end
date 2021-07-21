// Write your tests here
const server = require("./server");
const db = require("../data/dbConfig");
const supertest = require("supertest");

// beforeEach(async () => {
//   await db.migrate.rollback();
//   await db.migrate.latest();
// });

// afterAll(async () => {
//   await db.destroy();
// });

test("sanity", () => {
  expect(true).toBe(true);
});

// describe("POSTing for /api/auth/register", () => {
//   //check to see if payload contains required fields
//   it("check to ensure both username and password are available on  registration", async () => {
//     //first pass no password
//     const res = await supertest(server)
//       .post("/api/auth/register")
//       .send({ username: "Captain Marvel" });
//     expect(res.statusCode).toBe(404);
//     expect(res.type).toBe("application/json");
//     expect(res.body.message).toBe("username and password required");
//     //second pass no username
//     const res2 = await supertest(server)
//       .post("/api/auth/register")
//       .send({ password: "somarvelous12" });
//     expect(res2.statusCode).toBe(404);
//     expect(res2.type).toBe("application/json");
//     expect(res2.body.message).toBe("username and password required");
//     //third pass with username and password
//     const res3 = await supertest(server)
//       .post("/api/auth/register")
//       .send({ 
//         username: "Captain Marvel",
//         password: "somarvelous12",
//         email: 'tony@email.com' 
//       });
//     expect(res3.statusCode).toBe(201);
//   });

//   describe("POSTing for /api/auth/login", () => {
//     //registers and logs in a user
//     it("successfully logs in user", async () => {
//       await supertest(server).post("/api/auth/register").send({
//         username: "Capt Marvel",
//         password: "marvelous19",
//       });
//       const res = await supertest(server).post("/api/auth/login").send({
//         username: "Capt Marvel",
//         password: "marvelous19",
//       });
//       expect(res.statusCode).toBe(200);
//       expect(res.type).toBe("application/json");
//       expect(res.body.message).toBe("welcome, Capt Marvel");
//     });
//     //invalidates with bad password
//     it("responds with invalid credentials if password incorrect", async () => {
//       await supertest(server).post("/api/auth/register").send({
//         username: "Capt Marvel",
//         password: "marvelous19",
//       });
//       const res = await supertest(server).post("/api/auth/login").send({
//         username: "Capt Marvel",
//         password: "badpass",
//       });
//       expect(res.statusCode).toBe(401);
//       expect(res.type).toBe("application/json");
//       expect(res.body.message).toBe("invalid credentials");
//     });
//   });
  
// });
// describe('/api/auth/register', () => {
//   it('registers a user', async () => {
//     const res = await supertest(server)
//           .post("/api/auth/register")
//           .send({ 
//             username: "Captain Marvel",
//             password: "somarvelous12",
//             email: 'tony@email.com' 
//           });
//         expect(res.statusCode).toBe(201);
//   })
// })