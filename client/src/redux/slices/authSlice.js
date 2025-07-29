import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "../thunks/authThunk";

const authSlice = createSlice({
  name: "auth",
  initialState: { isAuthenticated: false, status: null, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
