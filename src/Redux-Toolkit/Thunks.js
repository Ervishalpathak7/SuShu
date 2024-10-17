import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const login = createAsyncThunk(
  "Auth/login",
  async (Data, { rejectWithValue }) => {
    try {
      const response = await Axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, Data , {
        withCredentials: true, 
      });
      return response.data.user;

    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
);

export const register = createAsyncThunk(
  "Auth/register",
  async (Data, { rejectWithValue }) => {
    try {
      const response = await Axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`, Data , {
        withCredentials: true, // Include cookies in the request
      });
      
      return response.data.user; // Assuming `user` is returned from backend
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
);

export const authStatus = createAsyncThunk(
  "Auth/authStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/status`, {
        withCredentials: true, 
      });
      return response.data.user; // Assuming the backend returns user data
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Authentication failed. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
);

export const logout = createAsyncThunk(
  "Auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/logout`);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Logout failed. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
);
