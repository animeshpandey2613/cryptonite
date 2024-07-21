import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loadingHome:"true",
  loadingDetailed:"true",
  loadingAllCoins:"true",
  tableHomeData:[],
  tableDetailedData:[],
  chartHomeData:[],
  chartDetailedData:[],
  mode:"dark",
};

export const coinSlice = createSlice({
  name: "coin",
  initialState,
  reducers: {
    setMode:(state, action)=>{
      state.mode = action.payload;
    },
    setTableHomeData:(state, action)=>{
      state.tableHomeData = action.payload;
    },
    setTableDetailedData:(state, action)=>{
      state.tableDetailedData = action.payload;
      
    },
    setChartHomeData:(state, action)=>{
      state.chartHomeData = action.payload;
      
    },
    setChartDetailedData:(state, action)=>{
      state.chartDetailedData = action.payload;
      
    }
  },
});

export const {setMode } = coinSlice.actions;
export default coinSlice.reducer;
