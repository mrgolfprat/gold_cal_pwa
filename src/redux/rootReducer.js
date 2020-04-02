import { combineReducers } from "@reduxjs/toolkit";
import SettingStyleReducer from "./SettingStyleReducer";
import SettingValueReducer from "./SettingValueReducer";

export default combineReducers({
  settingStyle: SettingStyleReducer,
  settingValue: SettingValueReducer
});
