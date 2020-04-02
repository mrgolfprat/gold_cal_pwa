import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  headerOne: {
    value: "ราคาทองวันนี้"
  },
  headerTwo: {
    value: "ห้างทอง"
  },
  headerThree: {
    value: "แสงทองดี"
  },
  date: {
    key: "วันที่",
    value: "20/03/2563"
  },
  time: {
    key: "เวลา",
    value: "12.00 น."
  },
  count: {
    key: "ครั้งที่",
    value: "1"
  },
  buy: {
    key: "รับซื้อ",
    value: "10000"
  },
  sale: {
    key: "ขายออก",
    value: "12000"
  },
  copyright: {
    value: "Copyright"
  },
  dataGroup: {
    dataSelect: "ทองคำแท่ง",
    data: ["ทองคำแท่ง"]
  }
};

const settingSlice = createSlice({
  name: "settingValue",
  initialState,
  reducers: {
    updateSettingValue: (state, action) => ({
      ...state,
      [action.payload.name]: {
        ...state[action.payload.name],
        [action.payload.property]: action.payload.value
      }
    }),
    insertDataGroup: (state, action) => ({
      ...state,
      dataGroup: {
        ...state.dataGroup,
        data: [...state.dataGroup.data, action.payload]
      }
    }),
    removeDataGroup: (state, action) => ({
      ...state,
      dataGroup: {
        ...state.dataGroup,
        data: state.dataGroup.data.filter(el => el != action.payload)
      }
    }),
    selectData: (state, action) => ({
      ...state,
      dataGroup: {
        ...state.dataGroup,
        dataSelect: action.payload
      }
    })
  }
});

export const {
  updateSettingValue,
  selectData,
  insertDataGroup,
  removeDataGroup
} = settingSlice.actions;

export default settingSlice.reducer;
