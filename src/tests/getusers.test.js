const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../App");

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});
/* Test for getting  user by id. */
describe("GET users/:id", () => {
  test("Get user by Id", (done) => {
    request(app)
      .get("/users/673dd6c489e9547e55dfc4d0")
      .expect(200)
      .expect((res) => {
        expect(res.body.name).toBe("John Doe");
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});

/* Test for creating a new user. */
describe("POST /signup", () => {
  test("Create a new user", (done) => {
    request(app)
      .post("/signup")
      .send({
        name: "John Doe",
        email: "johndoe@gmail.com",
        password: "password",
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.name).toBe("John Doe");
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});
