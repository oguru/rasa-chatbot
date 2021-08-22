import Messages from "./Messages";
import React from "react";
import {render} from "@testing-library/react";

describe("Messages tests", () => {
   it("should render", () => {
      expect(render(<Messages />)).toBeTruthy();
   });
});
