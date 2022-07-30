import * as firestore from "@firebase/firestore";
import * as redux from "react-redux";
import InputBox from "./InputBox";
import React from "react";
import {db} from "../../services/firebase";
import {mount} from "enzyme";
import store from "../../store/store";

describe("Input Box tests", () => {
   let deleteDocSpy,
      docSpy,
      firestoreMock,
      input,
      key,
      setDocSpy,
      useSelectorSpy,
      wrapper;

   const message = "Hello";
   const user = "Dave";

   beforeEach(() => {

      firestoreMock = {
         setDoc: jest.fn(),
         deleteDoc: jest.fn(),
         collection: jest.fn(),
         doc: jest.fn()
      };

      jest.mock("../../services/firebase");

      useSelectorSpy = jest.spyOn(redux, "useSelector");
      useSelectorSpy.mockReturnValue(user);

      jest.useFakeTimers("modern");
      jest.setSystemTime(new Date(2020, 3, 1));

      key = `${new Date().getTime().toString()}_${user}`;

      setDocSpy = jest.spyOn(firestore, "setDoc").mockReturnValue(firestoreMock.setDoc);
      docSpy = jest.spyOn(firestore, "doc").mockImplementation(() => firestoreMock.doc);
      deleteDocSpy = jest.spyOn(firestore, "deleteDoc").mockImplementation(firestoreMock.deleteDoc);

      wrapper = mount(<redux.Provider store={store}>
         <InputBox />
      </redux.Provider>);

      input = wrapper.find("input");
   });

   afterEach(() => {
      jest.clearAllMocks();
      jest.runOnlyPendingTimers();
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

      expect(docSpy).toHaveBeenCalledTimes(0);
      expect(setDocSpy).toHaveBeenCalledTimes(0);
   });

   it("should add a message to firestore with the correct data when it has been submitted", () => {
      input.simulate("change", {target: {value: message}});
      input.simulate("keydown", {key: "Enter"});

      expect(docSpy).toHaveBeenCalledWith(db, "messages", key);
      expect(setDocSpy).toHaveBeenCalledWith(firestoreMock.doc, {message});
   });

   it("should remove the message from firestore after 7 seconds", () => {
      input.simulate("change", {target: {value: message}});
      input.simulate("keydown", {key: "Enter"});

      jest.runTimersToTime(6999);

      expect(docSpy).toHaveBeenCalledTimes(1);
      expect(docSpy).toHaveBeenCalledWith(db, "messages", key);
      expect(deleteDocSpy).toHaveBeenCalledTimes(0);

      jest.runTimersToTime(7000);

      expect(docSpy).toHaveBeenCalledTimes(2);
      expect(docSpy).toHaveBeenLastCalledWith(db, "messages", key);
      expect(deleteDocSpy).toHaveBeenCalledWith(firestoreMock.doc);
   });
});