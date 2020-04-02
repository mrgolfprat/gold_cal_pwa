import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  MainContainer: {
    background: "#282c34",
    "font-family": "Kanit",
    imgBackground: undefined
  },
  headerOne: {
    "font-size": 1.5,
    color: "white"
  },
  headerTwo: {
    "font-size": 1.5,
    color: "white"
  },
  headerThree: {
    "font-size": 2.5,
    color: "white"
  },
  headerFour: {
    "font-size": 1.5,
    color: "white"
  },
  dateTimeCountLabel: {
    "font-size": 1,
    color: "teal"
  },
  dateTimeCountValue: {
    "font-size": 1,
    color: "white"
  },
  buySaleLabel: {
    "font-size": 1,
    color: "teal"
  },
  buySaleValue: {
    "font-size": 1,
    color: "white"
  },
  copyright: {
    "font-size": 1,
    color: "blueviolet"
  }
};

const settingSlice = createSlice({
  name: "settingStyle",
  initialState,
  reducers: {
    updateSettingStyle: (state, action) => ({
      ...state,
      [action.payload.name]: {
        ...state[action.payload.name],
        [action.payload.property]: action.payload.value
      }
    }),
    saveBg: (state, action) => ({
      ...state,
      MainContainer: {
        ...state.MainContainer,
        imgBackground: action.payload
      }
    })
  }
});

export const { updateSettingStyle, saveBg } = settingSlice.actions;

export default settingSlice.reducer;
