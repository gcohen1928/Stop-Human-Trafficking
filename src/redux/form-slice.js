import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    started: false,
    complete : false,
    failed: false, 
  },
  reducers: {
    setData(state, action) {
      state.started = action.payload.started;
      state.complete = action.payload.complete;
      state.failed = action.payload.failed;
    },
    resetData(state, action){
      state.started = false;
      state.complete = false;
      state.failed = false;
    }
  },
});

export const formActions = formSlice.actions;
export default formSlice;
