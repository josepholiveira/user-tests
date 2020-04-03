const express = require("express");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());

const projects = [];

app.get("/projects", (request, response) => {
  const { title } = request.query;

  const results = title
    ? projects.filter(project => project.title.includes(title))
    : projects;

  response.json(results);
});

app.post("/projects", (request, response) => {
  const { owner, title, description } = request.body;

  const project = {
    id: uuid(),
    owner,
    title,
    description,
    likes: 0
  };

  projects.push(project);

  response.json(project);
});

app.put("/projects/:id", (request, response) => {
  const { id } = request.params;
  const { owner, title, description } = request.body;

  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: "Project not found" });
  }

  const project = projects[projectIndex];

  project.owner = owner;
  project.title = title;
  project.description = description;

  return response.json(project);
});

app.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0) {
    return res.status(400).json({ error: "Project not found" });
  }

  projects.splice(projectIndex, 1);

  res.status(204).send();
});

app.post("/projects/:id/like", (request, response) => {
  const { id } = request.params;

  const project = projects.find(p => p.id === id);

  if (!project) {
    return response.status(400).json({ error: "Project not found" });
  }

  project.likes += 1;

  return response.json(project);
});

module.exports = app;
