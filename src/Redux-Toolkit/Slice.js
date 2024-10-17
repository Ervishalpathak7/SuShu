import { createSlice } from "@reduxjs/toolkit";
import { login as loginThunk, logout as logoutThunk, register as registerThunk , authStatus as authThunk } from "./Thunks"; // Import thunks

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "Auth",
  initialState,

  extraReducers: (builder) => {
    builder

    // handle checkAuth actions
    .addCase(authThunk.pending, (state) => {
      state.loading = true;
      state.error = null; // Clear errors on new request
    })
    .addCase(authThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase(authThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

      // Handle login actions
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null; 
       
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
        
      })
      // Handle registration actions
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear errors on new request
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle logout actions
      .addCase(logoutThunk.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear errors on new request
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.loading = false;
        state.user = null; // Reset user state to null on logout
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set the error from the rejected action
      });
  },
});

export default authSlice.reducer;
