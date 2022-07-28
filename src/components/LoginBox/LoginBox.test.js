import * as redux from "react-redux";
import LoginBox from "./LoginBox";
import React from "react";
import {mount} from "enzyme";

describe("LoginBox component tests", () => {
   let button,
      input,
      mockDispatchFn,
      useDispatchSpy,
      wrapper;

   const message = "test message";

   beforeEach(() => {
      useDispatchSpy = jest.spyOn(redux, "useDispatch");
      mockDispatchFn = jest.fn();
      useDispatchSpy.mockReturnValue(mockDispatchFn);

      wrapper = mount(<LoginBox/>);

      button = wrapper.find("button");
      input = wrapper.find("input");
   });

   afterEach(() => {
      jest.clearAllMocks();
   });

   it("should submit only when the input field is populated", () => {

      expect(mockDispatchFn).toHaveBeenCalledTimes(0);

      input.simulate("change", {target: {value: message}});
      input.simulate("keydown", {key: "Enter"});

      expect(mockDispatchFn).toHaveBeenCalledTimes(1);
   });

   it("should submit using the enter key or submit button", () => {

      expect(mockDispatchFn).toHaveBeenCalledTimes(0);

      input.simulate("change", {target: {value: message}});
      input.simulate("keydown", {key: "Enter"});

      expect(mockDispatchFn).toHaveBeenCalledTimes(1);

      button.simulate("click");

      expect(mockDispatchFn).toHaveBeenCalledTimes(2);
   });

   it("should submit using the correct redux action and payload", () => {

      expect(mockDispatchFn).toHaveBeenCalledTimes(0);

      input.simulate("change", {target: {value: message}});
      input.simulate("keydown", {key: "Enter"});

      expect(mockDispatchFn.mock.calls[0][0].payload).toEqual(message);
      expect(mockDispatchFn.mock.calls[0][0].type).toEqual("localUser/setLocalUser");
   });
});
