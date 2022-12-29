import { createSlice } from "@reduxjs/toolkit";

const resourcesSlice = createSlice({
  name: "resources",
  initialState: {
    resources: [],
  },
  reducers: {
    setResources(state, action) {
      return {
        ...state,
        resources: action.payload,
      };
    },
  },
});

export const resourcesActions = resourcesSlice.actions;
export default resourcesSlice;
