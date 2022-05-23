// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { Todo } from "../src/Todos/List";

const deleteFn = () => {};
const completeFn = () => {};

const todo = {
  done: false,
  text: "hello world",
};

describe("seeing if todo creates a proper text yeah mate", () => {
  it("render test", () => {
    render(
      <Todo
        todo={todo}
        onClickComplete={completeFn}
        onClickDelete={deleteFn}
      ></Todo>
    );
    expect(screen.getByText("hello world")).toBeInTheDocument();
  });
});
