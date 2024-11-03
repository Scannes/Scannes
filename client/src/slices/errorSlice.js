import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isError: false,
  isActive: false,
  message: "",
};

const errorSlice = createSlice({
  initialState,
  name: "error",
  reducers: {
    setError(state, action) {
      state.isError = action.payload.isError;
      state.isActive = action.payload.isActive;
      state.message = action.payload.message;
    },
  },
});

export const { setError } = errorSlice.actions;

export default errorSlice.reducer;
