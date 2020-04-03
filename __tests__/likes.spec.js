const request = require("supertest");
const app = require("../src/app");

describe("Likes", () => {
  it("should be able to give a like to the project", async () => {
    const project = await request(app)
      .post("/projects")
      .send({
        title: "Mobile em React Native",
        description: "Um aplicativo para listagem de projetos em React Native",
        owner: "Diego Fernandes"
      });

    const response = await request(app).post(
      `/projects/${project.body.id}/like`
    );

    expect(response.body).toMatchObject({
      title: "Mobile em React Native",
      description: "Um aplicativo para listagem de projetos em React Native",
      owner: "Diego Fernandes",
      likes: 1
    });
  });

  it("should not be able to like a project that does not exist", async () => {
    await request(app)
      .post(`/projects/123/like`)
      .expect(400);
  });
});
