import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slice"; // Renamed for clarity

const store = configureStore({
    reducer: {
        auth: authReducer, // Updated the key to 'auth' for better understanding
    },
});

export default store;
