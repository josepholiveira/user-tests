import "react-native";
import React from "react";

import AxiosMock from "axios-mock-adapter";
import api from "~/services/api";
const apiMock = new AxiosMock(api);

import App from "~/index.js";
import { render, fireEvent, act } from "@testing-library/react-native";

const wait = (amount = 0) => {
  return new Promise((resolve) => setTimeout(resolve, amount));
};

const actWait = async (amount = 0) => {
  await act(async () => {
    await wait(amount);
  });
};

const id = "d6e43105-a559-45b7-8fd7-53416b415741";

apiMock.onGet("repositories").reply(200, [
  {
    id,
    title: "Desafio React Native",
    url: "https://github.com/josepholiveira",
    techs: ["React Native", "Node.js"],
    likes: 0,
  },
]);

describe("Likes", () => {
  it("should add a like to the like counter of the repository", async () => {
    const { getByTestId } = render(<App />);

    apiMock.onPost(`repositories/${id}/like`).reply(200, {
      id,
      title: "Desafio React Native",
      url: "https://github.com/josepholiveira",
      techs: ["React Native", "Node.js"],
      likes: 1,
    });

    await actWait();

    fireEvent.press(getByTestId(`like-button-${id}`));

    expect(getByTestId(`repository-likes-${id}`)).toHaveTextContent(
      "1 curtidas"
    );

    apiMock.onPost(`repositories/${id}/like`).reply(200, {
      id,
      title: "Desafio React Native",
      url: "https://github.com/josepholiveira",
      techs: ["React Native", "Node.js"],
      likes: 2,
    });

    await actWait();

    fireEvent.press(getByTestId(`like-button-${id}`));

    expect(getByTestId(`repository-likes-${id}`)).toHaveTextContent(
      "2 curtidas"
    );
  });
});
