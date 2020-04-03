const request = require("supertest");
const app = require("../src/app");

describe("Projects", () => {
  it("should be able to create a new project", async () => {
    const response = await request(app)
      .post("/projects")
      .send({
        title: "Front-end em React",
        description: "Um software para listagem de projetos em React",
        owner: "Diego Fernandes"
      });

    expect(response.body).toMatchObject({
      title: "Front-end em React",
      description: "Um software para listagem de projetos em React",
      owner: "Diego Fernandes",
      likes: 0
    });
  });

  it("should be able to list the projects", async () => {
    const project = await request(app)
      .post("/projects")
      .send({
        title: "Front-end em React",
        description: "Um software para listagem de projetos em React",
        owner: "Diego Fernandes"
      });

    const response = await request(app).get("/projects");

    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          id: project.body.id,
          title: "Front-end em React",
          description: "Um software para listagem de projetos em React",
          owner: "Diego Fernandes",
          likes: 0
        }
      ])
    );
  });

  it("should be able to update project", async () => {
    const project = await request(app)
      .post("/projects")
      .send({
        title: "Back-end em Node.Js",
        description: "Um backend criado utilizando o express.",
        owner: "Diego Fernandes"
      });

    const response = await request(app)
      .put(`/projects/${project.body.id}`)
      .send({
        title: "Foodfy",
        description:
          "Um projeto incrível para uma empresa de receitas, chamada Foodfy",
        owner: "Mayk Brito"
      });

    expect(response.body).toMatchObject({
      title: "Foodfy",
      description:
        "Um projeto incrível para uma empresa de receitas, chamada Foodfy",
      owner: "Mayk Brito"
    });
  });

  it("should not be able to update a project that does not exist", async () => {
    await request(app)
      .put(`/projects/123`)
      .expect(400);
  });

  it("should not be able to update project likes manually", async () => {
    const project = await request(app)
      .post("/projects")
      .send({
        title: "Back-end em Node.Js",
        description: "Um backend criado utilizando o express.",
        owner: "Diego Fernandes",
        likes: 0
      });

    const response = await request(app)
      .put(`/projects/${project.body.id}`)
      .send({
        title: "Foodfy",
        description:
          "Um projeto incrível para uma empresa de receitas, chamada Foodfy",
        owner: "Mayk Brito"
      });

    expect(response.body).toMatchObject({
      likes: 0
    });
  });

  it("should be able to delete the project", async () => {
    const response = await request(app)
      .post("/projects")
      .send({
        title: "Front-end em React",
        description: "Um software para listagem de projetos em React",
        owner: "Diego Fernandes"
      });

    await request(app)
      .delete(`/projects/${response.body.id}`)
      .expect(204);
  });

  it("should not be able to delete a project that does not exist", async () => {
    await request(app)
      .delete(`/projects/123`)
      .expect(400);
  });
});
