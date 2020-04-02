const request = require("supertest");
const app = require("../src/app");

describe("User Session", () => {
  it("should be able to create a new session", async () => {
    await request(app)
      .post("/users")
      .send({
        name: "Diego Fernandes",
        github: "diego3g",
        password: "123456"
      });

    const response = await request(app)
      .post("/session")
      .send({
        github: "diego3g",
        password: "123456"
      });

    expect(response.body).toEqual({
      name: "Diego Fernandes"
    });
  });
});
