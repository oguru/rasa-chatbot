import {mount, shallow} from "enzyme";
import Message from "./Message";
import React from "react";
import {act} from "react-dom/test-utils";

describe("Message component tests", () => {
   let wrapper;
   const msg = "Hello";
   let totalNum = 1;
   let index = 0;

   it("Should display the message from props", () => {
      wrapper = shallow(<Message
         msg={msg}
         totalNum={totalNum}
         index={index}
      />);

      const message = wrapper.find("p");

      expect(message.text()).toEqual(msg);
   });

   it("Should have the 'disappear' css class applied after 5 seconds", async () => {
      jest.useFakeTimers();

      wrapper = mount(<Message
         msg={msg}
         totalNum={totalNum}
         index={index}
      />);

      let message = wrapper.find("p");

      expect(message.hasClass("disappear")).toBe(false);

      await act(async () => {
         await jest.runAllTimers();
      });
      wrapper.update();
      message = wrapper.find("p");

      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 5000);

      expect(message.hasClass("disappear")).toBe(true);
   });

   it("Should start with translateY 50px inline style and change to 0px", () => {
      jest.useFakeTimers();
      wrapper = mount(<Message
         msg={msg}
         totalNum={totalNum}
         index={index}
      />);

      const message = wrapper.find("p");

      expect(message.props().style).toEqual({transform: "translateY(50px)"});

      act(() => {
         jest.advanceTimersByTime(2);
      });
      wrapper.update();

      expect(wrapper.find("p").props().style).toEqual({transform: "translateY(0px)"});
   });

   it("Should change position when another message is added", () => {

      jest.useFakeTimers();
      wrapper = mount(<Message
         msg={msg}
         totalNum={totalNum}
         index={index}
      />);

      const message = wrapper.find("p");

      expect(message.props().style).toEqual({transform: "translateY(50px)"});

      act(() => {
         jest.advanceTimersByTime(2);
      });

      totalNum = 2;
      index = 1;

      wrapper.setProps({
         totalNum,
         index
      });
      wrapper.update();

      const newMsgPos = -40 * (totalNum - index - 1);

      expect(wrapper.find("p").props().style).toEqual({transform: `translateY(${newMsgPos}px)`});
   });

   it("Should have translateY -100vh inline style after 5s", () => {

      jest.useFakeTimers();
      wrapper = mount(<Message
         msg={msg}
         totalNum={totalNum}
         index={index}
      />);

      const message = wrapper.find("p");

      expect(message.props().style).toEqual({transform: "translateY(50px)"});

      act(() => {
         jest.advanceTimersByTime(5000);
      });

      wrapper.update();

      const newMsgPos = "-100vh";

      expect(wrapper.find("p").props().style).toEqual({transform: `translateY(${newMsgPos})`});
   });
});