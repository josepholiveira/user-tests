import "react-native";
import React from "react";

import AxiosMock from "axios-mock-adapter";
import api from "~/services/api";
const apiMock = new AxiosMock(api);

import App from "../src/index.js";
import { render, fireEvent, act } from "@testing-library/react-native";

const wait = (amount = 0) => {
  return new Promise((resolve) => setTimeout(resolve, amount));
};

const actWait = async (amount = 0) => {
  await act(async () => {
    await wait(amount);
  });
};

apiMock.onGet("repositories").reply(200, [
  {
    id: "d6e43105-a559-45b7-8fd7-53416b415741",
    title: "Desafio React Native",
    url: "https://github.com/josepholiveira",
    techs: ["React Native", "Node.js"],
    likes: 0,
  },
]);

describe("Likes", () => {
  it("should add a like to the like counter of the repository", async () => {
    const { getByText, getByTestId } = render(<App />);

    apiMock
      .onPost("repositories/d6e43105-a559-45b7-8fd7-53416b415741/like")
      .reply(200, {
        id: "d6e43105-a559-45b7-8fd7-53416b415741",
        title: "Desafio React Native",
        url: "https://github.com/josepholiveira",
        techs: ["React Native", "Node.js"],
        likes: 1,
      });

    await actWait();

    fireEvent.press(getByTestId("like-button"));

    apiMock
      .onPost("repositories/d6e43105-a559-45b7-8fd7-53416b415741/like")
      .reply(200, {
        id: "d6e43105-a559-45b7-8fd7-53416b415741",
        title: "Desafio React Native",
        url: "https://github.com/josepholiveira",
        techs: ["React Native", "Node.js"],
        likes: 2,
      });

    fireEvent.press(getByTestId("like-button"));

    await actWait();

    expect(getByTestId("repository-likes")).toHaveTextContent("2 curtidas");
  });
});