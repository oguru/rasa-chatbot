import {mount, shallow} from "enzyme";
import Message from "./Message";
import React from "react";
import {act} from "react-dom/test-utils";

describe("Message component tests", () => {
   let wrapper;
   const message = "Hello";
   const index = 0;

   it("Should display the message from props", () => {
      wrapper = shallow(<Message
         message={message}
         index={index}
      />);

      const msg = wrapper.find("p");

      expect(msg.text()).toEqual(message);
   });

   beforeEach(() => {
      jest.useFakeTimers();

      wrapper = mount(<Message
         message={message}
         index={index}
      />);
   });

   it("Should have the 'disappear' css class applied after 5 seconds", async () => {

      let msg = wrapper.find("p");

      expect(msg.hasClass("disappear")).toBe(false);

      await act(async () => {
         await jest.runAllTimers();
      });
      wrapper.update();
      msg = wrapper.find("p");

      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 5000);
      expect(msg.hasClass("disappear")).toBe(true);
   });

   it("Should start with translateY 35px inline style and change to 0px", () => {

      const msg = wrapper.find("p");

      expect(msg.props().style).toEqual({transform: "translateY(35px)"});

      act(() => {
         jest.advanceTimersByTime(2);
      });
      wrapper.update();

      expect(wrapper.find("p").props().style).toEqual({transform: "translateY(0px)"});
   });

   it("Should have translateY -100vh inline style after 5s", () => {

      const msg = wrapper.find("p");

      expect(msg.props().style).toEqual({transform: "translateY(35px)"});

      act(() => {
         jest.advanceTimersByTime(5000);
      });

      wrapper.update();

      const newMsgPos = "-100vh";

      expect(wrapper.find("p").props().style).toEqual({transform: `translateY(${newMsgPos})`});
   });
});