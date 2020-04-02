import { createStore } from "@reduxjs/toolkit";
import RootReducer from "./rootReducer";
import { saveState, loadState } from "../libs/LocalStorage";
import throttle from "lodash.throttle";

const persistantState = loadState();
const store = createStore(RootReducer, persistantState);

store.subscribe(
  throttle(() => {
    console.log("try to save state");
    saveState(store.getState());
  }, 1000)
);

export default store;
