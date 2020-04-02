const express = require("express");

const app = express();

app.use(express.json());

const users = [];

app.get("/users", (request, response) => {
  const [{ name, github }] = users;

  response.json({ name, github });
});

app.post("/users", (request, response) => {
  const { name, github, password } = request.body;

  const user = { name, github, password };

  users.push(user);

  response.json({
    github: user.github,
    name: user.name
  });
});

app.put("/users/:github", (request, response) => {
  const { github } = request.params;
  const { name, password } = request.body;

  const userIndex = users.findIndex(user => user.github === github);

  if (userIndex < 0) {
    return response.status(400).json({ error: "User does not exist" });
  }

  const user = {
    github,
    name,
    password
  };

  users[userIndex] = user;

  return response.json({ github: user.github, name: user.name });
});

app.delete("/users/:github", (request, response) => {
  const { github } = request.params;

  const userIndex = users.findIndex(user => user.github === github);

  if (userIndex < 0) {
    return response.status(400).json({ error: "User does not exist" });
  }

  users.splice(userIndex, 1);

  return response.status(204).send();
});

app.post("/session", (request, response) => {
  const { github, password } = request.body;

  const user = users.find(user => user.github === github);

  if (!user) {
    return response.status(400).json({ error: "User does not exist" });
  }

  if (user.password !== password) {
    return response.status(401).json({ error: "Password does not match" });
  }

  return response.json({
    name: user.name
  });
});

module.exports = app;
