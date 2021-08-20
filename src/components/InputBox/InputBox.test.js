import React from "react";
import { render } from "@testing-library/react";
import InputBox from "./InputBox";

describe("InputBox tests", () => {
  it("should render", () => {
    expect(render(<InputBox />)).toBeTruthy();
  });
});
