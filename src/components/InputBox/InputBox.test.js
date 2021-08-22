import {mount, render, shallow} from "enzyme";
import InputBox from "./InputBox";
import React from "react";

describe("InputBox tests", () => {
   it("should render", () => {
      expect(render(<InputBox />)).toBeTruthy();
   });
});

describe("Input Box tests", () => {
  let component;

  beforeEach(() => {
    component = shallow(<InputBox />);
  });

  it("should match the snapshot", () => {
  expect(component)
     .toMatchSnapshot();
  });
}