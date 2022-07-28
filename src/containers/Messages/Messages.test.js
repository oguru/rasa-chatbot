import * as firestore from "@firebase/firestore";
import * as redux from "react-redux";
import Messages from "./Messages";
import React from "react";
import {db} from "../../services/firebase";
import {mount} from "enzyme";
import store from "../../store/store";

describe("Input Box tests", () => {
   let wrapper,
      useDispatchSpy,
      mockDispatchFn,
      useSelectorSpy,
      deleteDocSpy,
      docSpy,
      firestoreMock,
      mockSnapshotMsg,
      mockOldSnapshotMsg;

   const message = "Hello";
   const user = "Dave";
   const oldTime = 1658324018384;
   const currentTime = 1658324282166;

   beforeEach(() => {
      useDispatchSpy = jest.spyOn(redux, "useDispatch");
      mockDispatchFn = jest.fn();
      useDispatchSpy.mockReturnValue(mockDispatchFn);

      firestoreMock = {
         setDoc: jest.fn(),
         deleteDoc: jest.fn(),
         collection: jest.fn(),
         doc: jest.fn()
      };

      jest.mock("../../services/firebase");

      useSelectorSpy = jest.spyOn(redux, "useSelector");
      useSelectorSpy.mockReturnValueOnce([]);
      useSelectorSpy.mockReturnValueOnce(user);

      jest.useFakeTimers("modern");
      jest.setSystemTime(new Date(currentTime));

      jest.spyOn(firestore, "setDoc").mockReturnValue(firestoreMock.setDoc);
      docSpy = jest.spyOn(firestore, "doc").mockImplementation(() => firestoreMock.doc);

      deleteDocSpy = jest.spyOn(firestore, "deleteDoc").mockImplementation(firestoreMock.deleteDoc);
   });

   afterEach(() => {
      jest.clearAllMocks();
      jest.runOnlyPendingTimers();
   });

   describe("New and Valid Message in Firestore", () => {
      beforeEach(() => {
         mockSnapshotMsg = {docs: [
            {id: currentTime - 10,
               data: jest.fn(() => {
                  return {name: user,
                     message};
               })}
         ]};

         Object.assign(firestoreMock, {onSnapshot: (snapshotCallback) => snapshotCallback(mockSnapshotMsg)});

         jest.spyOn(firestore, "onSnapshot").mockImplementation((_, snapshotCallback) => firestoreMock.onSnapshot(snapshotCallback));

         wrapper = mount(<redux.Provider store={store}>
            <Messages />
         </redux.Provider>);
      });

      it("should dispatch an action to set messages to the store when they are received from the firebase listener", () => {
         expect(mockDispatchFn.mock.calls[0][0].payload[0].message).toEqual(message);

         expect(mockDispatchFn.mock.calls[0][0].type).toEqual("messages/set");
      });

      it("Does not apply a transform when a single message is received", () => {
         const msg = wrapper.find(".messagesCont");

         expect(msg.props().style).toBeFalsy();
      });
   });

   describe("Old and Invalid Message in Firestore", () => {
      beforeEach(() => {
         mockOldSnapshotMsg = {docs: [
            {id: oldTime,
               data: jest.fn(() => {
                  return {name: user,
                     message};
               })}
         ]};

         Object.assign(firestoreMock, {onSnapshot: (snapshotCallback) => snapshotCallback(mockOldSnapshotMsg)});

         jest.spyOn(firestore, "onSnapshot").mockImplementation((collectionRef, snapshotCallback) => firestoreMock.onSnapshot(snapshotCallback));

         wrapper = mount(<redux.Provider store={store}>
            <Messages />
         </redux.Provider>);
      });

      it("should not save messages to the store older than 5 seconds when they are received from the firebase listener", () => {
         expect(mockDispatchFn.mock.calls[0][0].payload).toEqual([]);
      });

      it("should delete messages older than 5 seconds from firebase on load", () => {
         expect(deleteDocSpy).toHaveBeenCalled();
         expect(docSpy).toHaveBeenCalledWith(db, "messages", oldTime);
      });
   });
});