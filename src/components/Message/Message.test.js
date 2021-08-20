import React from "react";
import { render } from "@testing-library/react";
import message from "./message";

describe("message tests", () => {
  it("should render", () => {
    expect(render(<message />)).toBeTruthy();
  });
});
