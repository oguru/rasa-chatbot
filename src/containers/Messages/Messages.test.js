import React from "react";
import { render } from "@testing-library/react";
import Messages from "./Messages";

describe("Messages tests", () => {
  it("should render", () => {
    expect(render(<Messages />)).toBeTruthy();
  });
});
