import * as redux from "react-redux";
import InputBox from "./InputBox";
import React from "react";
import {mount} from "enzyme";
import store from "../../store/store";

describe("Input Box tests", () => {
   let wrapper;
   let useDispatchSpy;
   let mockDispatchFn;
   let input;

   const message = "Hello";
   const storeAdd = "messages/add";
   const storeRemove = "messages/remove";

   beforeEach(() => {
      useDispatchSpy = jest.spyOn(redux, "useDispatch");
      mockDispatchFn = jest.fn();
      useDispatchSpy.mockReturnValue(mockDispatchFn);

      wrapper = mount(<redux.Provider store={store}>
         <InputBox />
      </redux.Provider>);

      input = wrapper.find("input");
   });

   it("should clear the input when pressing 'Enter' or clicking 'Send' with the input field populated", () => {
      const button = wrapper.find("button");

      input.simulate("change", {target: {value: message}});
      expect(input.instance().value).toEqual(message);

      input.simulate("keydown", {key: "Enter"});
      expect(input.instance().value).toBeFalsy();

      input.simulate("change", {target: {value: message}});
      expect(input.instance().value).toEqual(message);

      button.simulate("click");
      expect(input.instance().value).toBeFalsy();
   });

   it("should not send a message when the input field is empty", () => {
      const button = wrapper.find("button");

      button.simulate("click");
      input.simulate("keydown", {key: "Enter"});

      expect(mockDispatchFn).toHaveBeenCalledTimes(0);
   });

   it("should correctly show the number of characters a user has remaining as they type a message", () => {
      const charCount = wrapper.find("span");

      expect(charCount.text()).toEqual("90");

      input.simulate("change", {target: {value: message}});

      expect(charCount.text()).toEqual("85");
   });

   it("should dispatch an action to add a message to the store when it has been submitted", () => {
      input.simulate("change", {target: {value: message}});
      input.simulate("keydown", {key: "Enter"});

      expect(mockDispatchFn.mock.calls[0][0].payload.msg).toEqual(message);

      expect(mockDispatchFn.mock.calls[0][0].type).toEqual(storeAdd);
   });

   it("should dispatch an action to remove the message from the store after 7 seconds", () => {
      jest.useFakeTimers();

      input.simulate("change", {target: {value: message}});
      input.simulate("keydown", {key: "Enter"});

      jest.runAllTimers();

      expect(mockDispatchFn.mock.calls[1][0].type).toEqual(storeRemove);

      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 7000);
   });
});