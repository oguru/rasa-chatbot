import {render, mount} from "enzyme";
import App from "./App";
import {Provider} from "react-redux";
import React from "react";
import store from "./store/store";

describe("App tests", () => {
   it("should render", () => {
      expect(render(<Provider store={store}>
         <App />
      </Provider>)).toBeTruthy();
   });
});
