const request = require("supertest");
const app = require("../src/app");

describe("Users", () => {
  it("should be able to create a new user", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        name: "Diego Fernandes",
        github: "diego3g",
        password: "123456"
      });

    expect(response.body).toEqual({
      name: "Diego Fernandes",
      github: "diego3g"
    });
  });

  it("should be able to list the users", async () => {
    const response = await request(app).get("/users");

    expect(response.body).toEqual({
      name: "Diego Fernandes",
      github: "diego3g"
    });
  });

  it("should be able to update user name and user password", async () => {
    const response = await request(app)
      .put("/users/diego3g")
      .send({
        name: "Diego",
        password: "12345678"
      });

    expect(response.body).toEqual({
      github: "diego3g",
      name: "Diego"
    });
  });

  it("should be able to delete the user", async () => {
    await request(app)
      .delete("/users/diego3g")
      .expect(204);
  });
});
