import {act, mount, shallow} from "enzyme";
import Message from "./Message";
import React from "react";

describe("Message component tests", () => {
   let wrapper;
   const msg = "Hello";
   const totalNum = 3;
   const index = 2;
   //  const msgPos = "-40px";

   it("Should display the message from props", () => {
      wrapper = shallow(<Message
         msg={msg}
         totalNum={totalNum}
         index={index}
      />);

      const message = wrapper.find("p");

      expect(message.text()).toEqual(msg);
   });

   it("Should have the 'disappear' css class applied after 5 seconds", () => {
      jest.useFakeTimers();

      wrapper = mount(<Message
         msg={msg}
         totalNum={totalNum}
         index={index}
      />);

      let message = wrapper.find("p");

      expect(message.hasClass("disappear")).toBe(false);

      jest.runAllTimers();
      wrapper.update();
      message = wrapper.find("p");

      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 5000);

      expect(message.hasClass("disappear")).toBe(true);
   });

   /*
    it("Should have the correct inline positioning style based on props", () => {
      jest.useFakeTimers();
      // await act(async () => {
      //    wrapper = await mount(<Message msg={msg} totalNum={totalNum} index={index} />);
      // });

      const message = wrapper.find("p");

      expect(message.props().style).toEqual({transform: "translateY(50px)"});
      jest.advanceTimersByTime(10);
      wrapper.update();

      expect(message.props().style).toEqual({transform: "translateY(0px)"});
      // change props to trigger useEffect
      // expect(message.props().style).toEqual({transform: `translateY(${msgPos})`});
   }); */
});